"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, type MouseEvent } from "react";

import { IconButton } from "@/components/ui/icon-button";
import { useMessages } from "@/i18n/provider";
import { useMounted } from "@/lib/use-mounted";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const ORDER = ["system", "light", "dark"] as const;
type ThemeChoice = (typeof ORDER)[number];

const ICONS = { system: Monitor, light: Sun, dark: Moon } as const;

/** What `data-theme` should become — "system" resolves against the OS. */
function resolve(choice: ThemeChoice): "light" | "dark" {
  if (choice !== "system") return choice;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Cycles System -> Light -> Dark, wiping the new theme in from the button
 * with a circular clip-path.
 *
 * The icon depends on `localStorage`, which the server cannot know, so it
 * stays invisible until mounted. The button keeps its size throughout, so
 * nothing shifts.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const messages = useMessages();
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();

  const current: ThemeChoice =
    mounted && ORDER.includes(theme as ThemeChoice)
      ? (theme as ThemeChoice)
      : "system";

  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const root = document.documentElement;

      const canAnimate =
        !reducedMotion && typeof document.startViewTransition === "function";

      if (!canAnimate) {
        setTheme(next);
        return;
      }

      // Centre the reveal on the button, and size it to reach the furthest
      // corner so the wipe always covers the whole viewport.
      const bounds = event.currentTarget.getBoundingClientRect();
      const originX = bounds.left + bounds.width / 2;
      const originY = bounds.top + bounds.height / 2;
      const radius = Math.hypot(
        Math.max(originX, window.innerWidth - originX),
        Math.max(originY, window.innerHeight - originY),
      );

      root.style.setProperty("--theme-origin-x", `${originX}px`);
      root.style.setProperty("--theme-origin-y", `${originY}px`);
      root.style.setProperty("--theme-reveal-radius", `${radius}px`);
      root.dataset.themeSwitching = "";

      const transition = document.startViewTransition(() => {
        /*
         * next-themes' setTheme only sets React state; it applies `data-theme`
         * in a passive effect, which lands after the transition has already
         * snapshotted the page. Writing the attribute here puts the new theme
         * into the "new" snapshot, and setTheme still runs for persistence and
         * for the rest of the tree.
         */
        root.setAttribute("data-theme", resolve(next));
        setTheme(next);
      });

      transition.finished.finally(() => {
        delete root.dataset.themeSwitching;
      });
    },
    [next, reducedMotion, setTheme],
  );

  const Icon = ICONS[current];

  return (
    <IconButton
      aria-label={`${messages.a11y.themeToggle} — ${messages.theme[current]}`}
      // The accessible name already carries the current theme, so no tooltip:
      // one here would pull Radix into the bundle of every page.
      title={messages.theme[current]}
      onClick={onClick}
      className={className}
    >
      <Icon aria-hidden className={mounted ? undefined : "opacity-0"} />
    </IconButton>
  );
}
