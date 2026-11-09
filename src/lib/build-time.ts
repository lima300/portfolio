import { cacheLife } from "next/cache";

import type { Locale } from "@/i18n/config";

import { yearsOfExperience } from "@/data/experience";

import { formatBrazilTime, timeOfDay, type TimeOfDay } from "./brazil-time";

/**
 * The current year, for the footer.
 *
 * Cache Components rejects `new Date()` during prerendering because the value
 * can drift between renders. `"use cache"` pins it into the prerendered output
 * instead, and `cacheLife("days")` lets it roll over without a redeploy.
 */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getUTCFullYear();
}

/**
 * A clock snapshot for the server-rendered markup.
 *
 * Lives here rather than beside the formatting helpers because those are
 * imported by a Client Component, and a `"use cache"` function cannot appear
 * in a module that crosses the client boundary.
 *
 * It only needs to be approximately right: it gives the widget a correctly
 * formatted, correctly sized starting value so there is no layout shift, and
 * the client replaces it with the real time on hydration.
 */
export async function getBrazilTimeSnapshot(locale: Locale): Promise<{
  time: string;
  period: TimeOfDay;
}> {
  "use cache";
  cacheLife("hours");

  const now = new Date();
  return { time: formatBrazilTime(now, locale), period: timeOfDay(now) };
}

/**
 * Years of professional experience, derived from the first role rather than
 * written down — so "6+ years" cannot quietly go stale, and nobody has to
 * remember to bump it on an anniversary.
 */
export async function getYearsOfExperience(): Promise<number> {
  "use cache";
  cacheLife("days");
  return yearsOfExperience(new Date());
}
