import { bcp47, type Locale } from "@/i18n/config";
import { parseYearMonth, type YearMonth } from "@/data/types";

/**
 * "Mar 2023" / "mar. de 2023".
 *
 * Takes an explicit `YearMonth` rather than reading the clock, so it is
 * deterministic and safe to call during prerendering — Cache Components
 * rejects a bare `new Date()`, and this never needs one.
 *
 * UTC throughout: a month label must not shift because the build machine
 * sits in a different zone than the reader.
 */
export function formatMonth(value: YearMonth, locale: Locale): string {
  return new Intl.DateTimeFormat(bcp47[locale], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseYearMonth(value));
}

/** "Mar 2023 — Present" when `end` is omitted. */
export function formatRange(
  start: YearMonth,
  end: YearMonth | undefined,
  locale: Locale,
  presentLabel: string,
): string {
  const from = formatMonth(start, locale);
  const to = end ? formatMonth(end, locale) : presentLabel;
  return `${from} — ${to}`;
}

/** "1 yr 10 mos", for the timeline's secondary line. */
export function formatDuration(
  start: YearMonth,
  end: YearMonth | undefined,
  locale: Locale,
  now: Date,
): string {
  const from = parseYearMonth(start);
  const to = end ? parseYearMonth(end) : now;

  const months =
    (to.getUTCFullYear() - from.getUTCFullYear()) * 12 +
    (to.getUTCMonth() - from.getUTCMonth()) +
    1;

  const years = Math.floor(months / 12);
  const remainder = months % 12;

  // Intl handles the pluralisation and each locale's own abbreviations.
  const unit = (value: number, which: "year" | "month") =>
    new Intl.NumberFormat(bcp47[locale], {
      style: "unit",
      unit: which,
      unitDisplay: "short",
    }).format(value);

  const parts: string[] = [];
  if (years > 0) parts.push(unit(years, "year"));
  if (remainder > 0) parts.push(unit(remainder, "month"));

  return parts.join(" ");
}
