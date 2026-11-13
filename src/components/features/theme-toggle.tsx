"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, type MouseEvent } from "react";

import { IconButton } from "@/components/ui/icon-button";
import { useMessages } from "@/i18n/provider";
import {
  centreOf,
  isThemeChoice,
  nextTheme,
  switchTheme,
  type ThemeChoice,
} from "@/lib/theme-switch";
import { useMounted } from "@/lib/use-mounted";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const ICONS = { system: Monitor, light: Sun, dark: Moon } as const;

/**
 * Cycles System -> Light -> Dark, wiping the new theme in from the button
 * with a circular clip-path.
 *
 * The icon depends on `localStorage`, which the server cannot know, so it
 * stays invisible until mounted. The button keeps its size throughout, so
 * nothing shifts.
 *
 * `data-theme-toggle` lets the `t` shortcut start its reveal from here too.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const messages = useMessages();
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();

  const current: ThemeChoice =
    mounted && isThemeChoice(theme) ? theme : "system";

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      switchTheme({
        choice: nextTheme(current),
        setTheme,
        reducedMotion,
        origin: centreOf(event.currentTarget),
      });
    },
    [current, reducedMotion, setTheme],
  );

  const Icon = ICONS[current];

  return (
    <IconButton
      data-theme-toggle
      aria-label={`${messages.a11y.themeToggle} — ${messages.theme[current]}`}
      // The accessible name already carries the current theme, so no tooltip:
      // one here would pull Radix into the bundle of every page.
      title={messages.theme[current]}
      onClick={onClick}
      className={className}
    >
      <Icon aria-hidden className={mounted ? undefined : "opacity-0"} />
    </IconButton>
  );
}
