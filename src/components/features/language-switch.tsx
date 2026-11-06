"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LOCALE_COOKIE,
  localeLabels,
  localeNames,
  locales,
  type Locale,
} from "@/i18n/config";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/cn";

/** Replaces the locale segment, keeping the rest of the path intact. */
function swapLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  // segments[0] is always "" because the path starts with "/".
  segments[1] = locale;
  return segments.join("/");
}

function remember(locale: Locale) {
  try {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    // Cookies disabled: the switch still works, it just won't be remembered.
  }
}

/**
 * Real links rather than a listbox: each locale is a distinct, crawlable URL,
 * so the switch works without JavaScript and search engines see both versions.
 */
export function LanguageSwitch({ className }: { className?: string }) {
  const { locale: active, messages } = useI18n();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={messages.a11y.languageSwitch}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-control border border-border p-0.5",
        className,
      )}
    >
      {locales.map((locale) => {
        const isActive = locale === active;
        return (
          <Link
            key={locale}
            href={swapLocale(pathname, locale)}
            hrefLang={locale}
            aria-current={isActive ? "true" : undefined}
            onClick={() => remember(locale)}
            className={cn(
              "rounded-[0.5rem] px-2 py-1 text-label font-medium transition-colors duration-200",
              isActive
                ? "bg-accent-soft text-accent"
                : "text-fg-subtle hover:text-fg",
            )}
          >
            <span className="sr-only">{localeNames[locale]}</span>
            <span aria-hidden>{localeLabels[locale]}</span>
          </Link>
        );
      })}
    </div>
  );
}
