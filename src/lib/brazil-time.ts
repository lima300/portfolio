import { bcp47, type Locale } from "@/i18n/config";
import { site } from "./site";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

/**
 * The clock in São Paulo, formatted for a locale.
 *
 * The time zone is pinned to `site.timeZone` rather than taken from the
 * viewer, which is the detail that makes this work: given the same instant,
 * the server and the browser produce byte-identical output. So the widget
 * needs no `suppressHydrationWarning` and no inline script — only a later
 * instant, which arrives after hydration.
 */
export function formatBrazilTime(at: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(bcp47[locale], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: site.timeZone,
  }).format(at);
}

/** The hour in São Paulo, 0–23, regardless of where the code is running. */
export function brazilHour(at: Date): number {
  const hour = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    hour12: false,
    timeZone: site.timeZone,
  }).format(at);
  return Number(hour) % 24;
}

export function timeOfDay(at: Date): TimeOfDay {
  const hour = brazilHour(at);
  if (hour < 6) return "night";
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  if (hour < 23) return "evening";
  return "night";
}
