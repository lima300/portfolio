"use client";

import { Command } from "cmdk";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Copy,
  FileText,
  FlaskConical,
  Home,
  Keyboard,
  Languages,
  Monitor,
  Moon,
  Search,
  Sun,
  User,
  Laptop,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useState,
  type ComponentType,
  type ReactNode,
  type SVGProps,
} from "react";

import { Kbd } from "@/components/ui/kbd";
import { socials } from "@/data/socials";
import { locales } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";
import { rememberLocale, swapLocale } from "@/i18n/switch";
import { routes } from "@/lib/routes";
import { shortcuts, type ShortcutId } from "@/lib/shortcuts";
import {
  isThemeChoice,
  switchTheme,
  type ThemeChoice,
} from "@/lib/theme-switch";
import { useCopyEmail } from "@/lib/use-copy-email";
import { useModal } from "@/lib/use-modal";
import { useReducedMotion } from "@/lib/use-reduced-motion";

import type { CaseStudyLink } from "./types";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
  onShowShortcuts: () => void;
  caseStudies: readonly CaseStudyLink[];
};

/** The second key of a `g` sequence, shown beside the item it reaches. */
function hintFor(id: ShortcutId) {
  return shortcuts.find((shortcut) => shortcut.id === id)?.keys;
}

/**
 * ⌘K. Everything a visitor might want, one search away: every page, every
 * case study, the email, the theme, the other language, and the profiles.
 *
 * cmdk supplies the combobox/listbox semantics, the fuzzy filter and the
 * arrow-key handling; the native `<dialog>` around it supplies the modal
 * behaviour. Loaded on first use (see `commands-provider.tsx`).
 */
export default function CommandPalette({
  open,
  onClose,
  onShowShortcuts,
  caseStudies,
}: CommandPaletteProps) {
  const { locale, messages } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const reducedMotion = useReducedMotion();
  const copyEmail = useCopyEmail();
  // Every opening starts from an empty search, with the field focused.
  const [search, setSearch] = useState("");
  const handleClose = useCallback(() => {
    setSearch("");
    onClose();
  }, [onClose]);
  const dialog = useModal(open, handleClose);

  const t = messages.commands;

  /**
   * Closes first, then acts — synchronously, so a theme change's View
   * Transition snapshots the page without the palette on it.
   */
  const act = useCallback(
    (action: () => void) => () => {
      dialog.current?.close();
      action();
    },
    [dialog],
  );

  const go = (href: string) => act(() => router.push(href));

  const setThemeTo = (choice: ThemeChoice) =>
    act(() => switchTheme({ choice, setTheme, reducedMotion }));

  const otherLocale = locales.find((candidate) => candidate !== locale)!;
  const currentTheme = isThemeChoice(theme) ? theme : "system";

  const pages: {
    id: string;
    label: string;
    href: string;
    icon: LucideIcon;
    shortcut?: ShortcutId;
    keywords?: string[];
  }[] = [
    {
      id: "home",
      label: t.items.home,
      href: routes.home(locale),
      icon: Home,
      shortcut: "home",
    },
    {
      id: "work",
      label: t.items.work,
      href: routes.work(locale),
      icon: Briefcase,
      shortcut: "work",
      keywords: ["projects", "projetos"],
    },
    {
      id: "about",
      label: t.items.about,
      href: routes.about(locale),
      icon: User,
      shortcut: "about",
    },
    {
      id: "resume",
      label: t.items.resume,
      href: routes.resume(locale),
      icon: FileText,
      shortcut: "resume",
      keywords: ["cv", "resume", "curriculum"],
    },
    {
      id: "lab",
      label: t.items.lab,
      href: routes.lab(locale),
      icon: FlaskConical,
      shortcut: "lab",
      keywords: ["side projects"],
    },
    {
      id: "uses",
      label: t.items.uses,
      href: routes.uses(locale),
      icon: Laptop,
      keywords: ["uses", "gear", "desk"],
    },
    {
      id: "colophon",
      label: t.items.colophon,
      href: routes.colophon(locale),
      icon: BookOpen,
      keywords: ["colophon", "stack"],
    },
  ];

  const themes: { choice: ThemeChoice; label: string; icon: LucideIcon }[] = [
    { choice: "light", label: t.items.themeLight, icon: Sun },
    { choice: "dark", label: t.items.themeDark, icon: Moon },
    { choice: "system", label: t.items.themeSystem, icon: Monitor },
  ];

  return (
    <dialog
      ref={dialog}
      data-commands
      aria-label={t.label}
      className="m-0 mx-auto mt-[12vh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-card border border-border bg-bg-elevated p-0 text-fg shadow-floating backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      <Command label={t.label} loop className="flex flex-col">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search aria-hidden className="size-4 shrink-0 text-fg-subtle" />
          <Command.Input
            data-autofocus
            value={search}
            onValueChange={setSearch}
            placeholder={t.placeholder}
            className="h-14 w-full bg-transparent text-body text-fg outline-none placeholder:text-fg-subtle"
          />
          <Kbd>esc</Kbd>
        </div>

        <Command.List className="max-h-[min(60vh,26rem)] overflow-y-auto overscroll-contain p-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-label [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-fg-subtle [&_[cmdk-group-heading]]:uppercase">
          <Command.Empty className="px-3 py-8 text-center text-small text-fg-muted">
            {t.empty}
          </Command.Empty>

          <Command.Group heading={t.groups.navigate}>
            {pages.map((page) => (
              <Item
                key={page.id}
                value={page.label}
                keywords={page.keywords}
                icon={page.icon}
                onSelect={go(page.href)}
                hint={page.shortcut ? hintFor(page.shortcut) : undefined}
              >
                {page.label}
              </Item>
            ))}
          </Command.Group>

          <Command.Group heading={t.groups.caseStudies}>
            {caseStudies.map((study) => (
              <Item
                key={study.slug}
                value={study.title}
                keywords={["case study", "case"]}
                icon={ArrowRight}
                onSelect={go(routes.caseStudy(locale, study.slug))}
              >
                {study.title}
              </Item>
            ))}
          </Command.Group>

          <Command.Group heading={t.groups.actions}>
            <Item
              value={t.items.copyEmail}
              keywords={["email", "e-mail", "contact", "contato"]}
              icon={Copy}
              onSelect={act(() => void copyEmail())}
            >
              {t.items.copyEmail}
            </Item>
            {themes
              .filter(({ choice }) => choice !== currentTheme)
              .map(({ choice, label, icon }) => (
                <Item
                  key={choice}
                  value={label}
                  keywords={["theme", "tema", messages.theme[choice]]}
                  icon={icon}
                  onSelect={setThemeTo(choice)}
                >
                  {label}
                </Item>
              ))}
            <Item
              value={t.items.switchLanguage}
              keywords={["language", "idioma", otherLocale]}
              icon={Languages}
              onSelect={act(() => {
                rememberLocale(otherLocale);
                router.push(swapLocale(pathname, otherLocale));
              })}
            >
              <span lang={otherLocale === "pt-br" ? "pt-BR" : "en"}>
                {t.items.switchLanguage}
              </span>
            </Item>
            <Item
              value={t.items.shortcuts}
              keywords={["keyboard", "teclado", "?"]}
              icon={Keyboard}
              onSelect={act(onShowShortcuts)}
              hint={hintFor("help")}
            >
              {t.items.shortcuts}
            </Item>
          </Command.Group>

          <Command.Group heading={t.groups.elsewhere}>
            {socials.map((social) => (
              <Item
                key={social.id}
                value={social.name}
                keywords={[social.handle]}
                icon={social.icon}
                onSelect={act(() =>
                  window.open(social.href, "_blank", "noopener,noreferrer"),
                )}
              >
                {social.name}
              </Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </dialog>
  );
}

function Item({
  value,
  keywords,
  icon: Icon,
  onSelect,
  hint,
  children,
}: {
  value: string;
  keywords?: string[];
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  onSelect: () => void;
  hint?: readonly string[];
  children: ReactNode;
}) {
  return (
    <Command.Item
      value={value}
      keywords={keywords}
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-control px-3 py-2.5 text-small text-fg-muted transition-colors duration-100 select-none data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent"
    >
      <Icon aria-hidden className="size-4 shrink-0" />
      <span className="flex-1 truncate">{children}</span>
      {hint ? (
        <span aria-hidden className="flex items-center gap-1">
          {hint.map((key) => (
            <Kbd key={key}>{key}</Kbd>
          ))}
        </span>
      ) : null}
    </Command.Item>
  );
}
