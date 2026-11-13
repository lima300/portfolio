"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useI18n } from "@/i18n/provider";
import { routes } from "@/lib/routes";
import {
  createSequenceMatcher,
  isTypingTarget,
  type ShortcutId,
} from "@/lib/shortcuts";
import {
  centreOf,
  isThemeChoice,
  nextTheme,
  switchTheme,
} from "@/lib/theme-switch";
import { useReducedMotion } from "@/lib/use-reduced-motion";

import type { CaseStudyLink } from "./types";

/*
 * Both dialogs are split out of the page bundle and fetched the first time
 * they are wanted. The first-load budget has almost nothing left after the
 * framework runtime, and most visitors never press ⌘K — so what every page
 * pays for is this listener, and nothing else.
 */
const loadPalette = () => import("./command-palette");
const loadSheet = () => import("./shortcuts-sheet");
const CommandPalette = lazy(loadPalette);
const ShortcutsSheet = lazy(loadSheet);

type Dialog = "palette" | "shortcuts" | null;

type CommandsApi = {
  openPalette: () => void;
  openShortcuts: () => void;
  /** Starts fetching the palette, for a pointer that is about to click. */
  preload: () => void;
};

const CommandsContext = createContext<CommandsApi | null>(null);

export function useCommands(): CommandsApi {
  const value = useContext(CommandsContext);
  if (!value) {
    throw new Error("useCommands must be used inside <CommandsProvider>");
  }
  return value;
}

/**
 * A modal is open — the palette, the sheet, the mobile menu — and owns the
 * keyboard. Read from the DOM rather than React state: Escape closes a
 * dialog natively, a beat before the state hears about it.
 */
function aDialogIsOpen() {
  return document.querySelector("dialog[open]") !== null;
}

export function CommandsProvider({
  caseStudies,
  children,
}: {
  caseStudies: readonly CaseStudyLink[];
  children: ReactNode;
}) {
  const { locale } = useI18n();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const reducedMotion = useReducedMotion();

  const [open, setOpen] = useState<Dialog>(null);
  // Once fetched, a dialog stays mounted, so reopening it is instant.
  const [mounted, setMounted] = useState({ palette: false, shortcuts: false });

  const show = useCallback((dialog: Exclude<Dialog, null>) => {
    setMounted((current) =>
      current[dialog] ? current : { ...current, [dialog]: true },
    );
    setOpen(dialog);
  }, []);

  const api = useMemo<CommandsApi>(
    () => ({
      openPalette: () => show("palette"),
      openShortcuts: () => show("shortcuts"),
      preload: () => void loadPalette(),
    }),
    [show],
  );

  const run = useCallback(
    (id: ShortcutId) => {
      switch (id) {
        case "palette":
          return show("palette");
        case "help":
          return show("shortcuts");
        case "theme":
          return switchTheme({
            choice: nextTheme(isThemeChoice(theme) ? theme : "system"),
            setTheme,
            reducedMotion,
            origin: centreOf(document.querySelector("[data-theme-toggle]")),
          });
        case "home":
        case "work":
        case "about":
        case "resume":
        case "lab":
          return router.push(routes[id](locale));
      }
    },
    [locale, reducedMotion, router, setTheme, show, theme],
  );

  // Held across renders, so a pending `g` survives a re-render between keys.
  const [match] = useState(() => createSequenceMatcher());

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing) return;

      // ⌘K / Ctrl+K works everywhere, even from a text field, and toggles.
      if (
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        if (open === "palette") setOpen(null);
        else show("palette");
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;
      if (aDialogIsOpen()) return;

      const id = match(event.key, event.timeStamp);
      if (id) {
        event.preventDefault();
        run(id);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    // Lets the e2e suite wait for the listener instead of racing hydration.
    document.documentElement.dataset.shortcuts = "ready";
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [match, open, run, show]);

  /*
   * Each dialog clears only its own state. A native dialog's `close` event
   * arrives a task after Escape, by which time another one may already be
   * opening — a blanket reset would shut that one too.
   */
  const closePalette = useCallback(
    () => setOpen((current) => (current === "palette" ? null : current)),
    [],
  );
  const closeShortcuts = useCallback(
    () => setOpen((current) => (current === "shortcuts" ? null : current)),
    [],
  );

  return (
    <CommandsContext.Provider value={api}>
      {children}
      <Suspense fallback={null}>
        {mounted.palette ? (
          <CommandPalette
            open={open === "palette"}
            onClose={closePalette}
            onShowShortcuts={() => show("shortcuts")}
            caseStudies={caseStudies}
          />
        ) : null}
        {mounted.shortcuts ? (
          <ShortcutsSheet
            open={open === "shortcuts"}
            onClose={closeShortcuts}
          />
        ) : null}
      </Suspense>
    </CommandsContext.Provider>
  );
}
