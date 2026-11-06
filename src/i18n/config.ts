/**
 * Locale registry. This is the single place that knows which languages exist;
 * routing, metadata, the sitemap and the language switch all read from here.
 */

export const locales = ["en", "pt-br"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Maps our route segment to a BCP 47 tag for `<html lang>`, `Intl` and hreflang. */
export const bcp47: Record<Locale, string> = {
  en: "en",
  "pt-br": "pt-BR",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  "pt-br": "Português",
};

/** Short form for the language switch. */
export const localeLabels: Record<Locale, string> = {
  en: "EN",
  "pt-br": "PT",
};

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (locales as readonly string[]).includes(value)
  );
}

/**
 * Picks the best supported locale for an `Accept-Language` header.
 * Deliberately small: with two languages a quality-value sort is enough,
 * and it keeps the proxy dependency-free.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((entry) => entry.tag.length > 0 && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (tag === "*") return defaultLocale;
    if (tag === "pt-br" || tag === "pt" || tag.startsWith("pt-"))
      return "pt-br";
    if (tag === "en" || tag.startsWith("en-")) return "en";
  }

  return defaultLocale;
}

/** Remembers an explicit language choice so the proxy honours it next visit. */
export const LOCALE_COOKIE = "preferred-locale";
