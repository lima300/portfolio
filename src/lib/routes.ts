import type { Locale } from "@/i18n/config";

/**
 * Every internal destination, built from the locale.
 *
 * Centralised so a path only appears as a string once. The nav, the footer,
 * the command palette and the sitemap all read from here, which is what keeps
 * them from disagreeing about where a page lives.
 */
export const routes = {
  home: (locale: Locale) => `/${locale}`,
  work: (locale: Locale) => `/${locale}#work`,
  caseStudy: (locale: Locale, slug: string) => `/${locale}/work/${slug}`,
  about: (locale: Locale) => `/${locale}#about`,
  content: (locale: Locale) => `/${locale}#content`,
  contact: (locale: Locale) => `/${locale}#contact`,
  resume: (locale: Locale) => `/${locale}/resume`,
  lab: (locale: Locale) => `/${locale}/lab`,
  uses: (locale: Locale) => `/${locale}/uses`,
  colophon: (locale: Locale) => `/${locale}/colophon`,
} as const;

export type NavItem = {
  id: "work" | "about" | "content" | "resume";
  href: (locale: Locale) => string;
  /**
   * False until the destination exists. Next prefetches `<Link>`s on sight,
   * so pointing at an unbuilt route logs a 404 in the console — which the
   * dev-console gate in tests/e2e treats as a failure, correctly.
   */
  prefetch: boolean;
};

export const navItems: readonly NavItem[] = [
  { id: "work", href: routes.work, prefetch: true },
  { id: "about", href: routes.about, prefetch: true },
  { id: "content", href: routes.content, prefetch: true },
  // Built in the secondary-pages chunk.
  { id: "resume", href: routes.resume, prefetch: false },
] as const;
