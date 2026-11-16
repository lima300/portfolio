import type { Metadata } from "next";

import { locales, type Locale } from "@/i18n/config";
import { site } from "@/lib/site";

/** Open Graph wants `language_TERRITORY`, not a BCP 47 tag. */
const ogLocale: Record<Locale, string> = {
  en: "en_US",
  "pt-br": "pt_BR",
};

type PageMetadata = {
  locale: Locale;
  /** The page's path in any locale — usually one of `routes`. */
  path: (locale: Locale) => string;
  /** Without the site name: the layout's template adds it to `<title>`. */
  title?: string;
  description: string;
  /** The preview's title when it is not `title` plus the site name. */
  shareTitle?: string;
  type?: "website" | "article" | "profile";
};

/**
 * The metadata every page repeats: canonical and hreflang alternates, and the
 * Open Graph and X fields a link preview is built from.
 *
 * In one place because Next merges metadata shallowly — a page that sets
 * `openGraph` replaces the layout's whole object — so each page has to send
 * the complete set, and a helper is how it stays complete. The preview image
 * itself comes from the segment's `opengraph-image.tsx`, which Next adds on
 * top of this.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  shareTitle,
  type = "website",
}: PageMetadata): Metadata {
  const fullTitle =
    shareTitle ?? (title ? `${title} — ${site.name}` : undefined);

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: path(locale),
      languages: {
        en: path("en"),
        "pt-BR": path("pt-br"),
        "x-default": path("en"),
      },
    },
    openGraph: {
      type,
      siteName: site.name,
      url: path(locale),
      ...(fullTitle ? { title: fullTitle } : {}),
      description,
      locale: ogLocale[locale],
      alternateLocale: locales
        .filter((other) => other !== locale)
        .map((other) => ogLocale[other]),
    },
    twitter: {
      card: "summary_large_image",
      ...(fullTitle ? { title: fullTitle } : {}),
      description,
    },
  };
}
