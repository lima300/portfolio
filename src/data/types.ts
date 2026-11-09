import type { Locale } from "@/i18n/config";

/**
 * A value that exists once per language.
 *
 * Keyed by the route locale rather than a separate naming scheme, so a page
 * can write `role[locale]` with no lookup table in between — and adding a
 * third language becomes a type error in every file that needs new copy,
 * which is exactly where you want to be told.
 */
export type Localized<T = string> = Record<Locale, T>;

/** Reads the active language out of a localized value. */
export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

/**
 * `YYYY-MM`. Day precision is noise on a CV, and the month is what gets
 * formatted and compared.
 */
export type YearMonth = `${number}-${string}`;

export function parseYearMonth(value: YearMonth): Date {
  const [year, month] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1));
}
