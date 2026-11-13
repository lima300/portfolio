import { LOCALE_COOKIE, type Locale } from "./config";

/** Replaces the locale segment, keeping the rest of the path intact. */
export function swapLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  // segments[0] is always "" because the path starts with "/".
  segments[1] = locale;
  return segments.join("/");
}

/** Remembers an explicit choice, so the root redirect honours it next time. */
export function rememberLocale(locale: Locale) {
  try {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    // Cookies disabled: the switch still works, it just won't be remembered.
  }
}
