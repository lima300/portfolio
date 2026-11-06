"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { Messages } from "@/messages/en";

import type { Locale } from "./config";

type I18nValue = {
  locale: Locale;
  messages: Messages;
};

const I18nContext = createContext<I18nValue | null>(null);

/**
 * Server Components read messages directly from the dictionary. This exists
 * only so the few interactive leaves (theme toggle, command palette, toasts)
 * can read the same catalogue without each one taking props from the top.
 *
 * The catalogue travels in the RSC payload as data, so it adds nothing to the
 * JavaScript bundle.
 */
export function I18nProvider({
  locale,
  messages,
  children,
}: I18nValue & { children: ReactNode }) {
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n must be used inside <I18nProvider>");
  }
  return value;
}

export function useMessages(): Messages {
  return useI18n().messages;
}

export function useLocale(): Locale {
  return useI18n().locale;
}
