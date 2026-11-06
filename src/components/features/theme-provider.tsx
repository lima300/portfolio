"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Theme state lives on `<html data-theme>`, which is what `globals.css`
 * keys off. `enableSystem` keeps "follow the OS" as a real third state
 * rather than a one-time guess, and next-themes' inline script applies the
 * stored choice before first paint, so there is no flash.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themes={["light", "dark"]}
    >
      {children}
    </NextThemeProvider>
  );
}
