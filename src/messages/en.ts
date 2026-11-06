/**
 * English is the source of truth for the message shape. Every other catalogue
 * is typed as `Messages`, so a missing or misspelled key is a build error
 * rather than a blank string in production.
 */
const en = {
  meta: {
    title: "Otávio Lima — Senior Frontend Engineer",
    titleTemplate: "%s — Otávio Lima",
    description:
      "Senior Frontend Engineer. I build fast, scalable web platforms: micro-frontends, design systems, and the developer experience around them.",
  },
  a11y: {
    skipToContent: "Skip to content",
    themeToggle: "Change colour theme",
    languageSwitch: "Change language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  theme: {
    system: "System",
    light: "Light",
    dark: "Dark",
  },
  nav: {
    work: "Work",
    about: "About",
    content: "Content",
    resume: "Résumé",
  },
  hero: {
    availability: "Open to Senior/Staff Frontend roles",
    headline: "Frontend that scales. Interfaces that feel effortless.",
    subline:
      "Senior Frontend Engineer, 6+ years. Micro-frontends, design systems and the developer experience around them. Remote from Brazil (GMT-3), overlapping US hours.",
    viewWork: "View work",
    downloadResume: "Download résumé",
    copyEmail: "Copy email",
  },
  footer: {
    builtWith: "Built with Next.js, TypeScript and Tailwind CSS.",
    sourceOnGithub: "Source on GitHub",
  },
} as const;

/**
 * Widens every string literal to `string` while keeping the key structure
 * exact. Translations must provide the same keys, but obviously not the same
 * values — without this, `as const` would demand the English wording.
 */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Messages = Widen<typeof en>;

export default en;
