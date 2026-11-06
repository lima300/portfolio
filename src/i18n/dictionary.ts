import { locale as localeParam } from "next/root-params";
import { notFound } from "next/navigation";

import en, { type Messages } from "@/messages/en";
import ptBr from "@/messages/pt-br";

import { isLocale, type Locale } from "./config";

/**
 * Catalogues are imported statically rather than with `import()`. Both are a
 * couple of kilobytes, they never change at runtime, and keeping them static
 * lets every page prerender without an async waterfall.
 */
const dictionaries: Record<Locale, Messages> = {
  en,
  "pt-br": ptBr,
};

/**
 * Resolves the active locale from the root `[locale]` segment.
 *
 * `next/root-params` means no layout or component has to prop-drill the
 * locale: any Server Component below the root layout can just ask.
 */
export async function getLocale(): Promise<Locale> {
  const value = await localeParam();
  if (!isLocale(value)) notFound();
  return value;
}

/** The message catalogue for the active locale. */
export async function getMessages(): Promise<Messages> {
  return dictionaries[await getLocale()];
}

/** Both at once, for the handful of places that need the tag as well. */
export async function getI18n(): Promise<{
  locale: Locale;
  messages: Messages;
}> {
  const locale = await getLocale();
  return { locale, messages: dictionaries[locale] };
}

export function getMessagesFor(locale: Locale): Messages {
  return dictionaries[locale];
}
