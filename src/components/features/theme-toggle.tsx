"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useMessages } from "@/i18n/provider";
import { cn } from "@/lib/cn";
import { useMounted } from "@/lib/use-mounted";

const ORDER = ["system", "light", "dark"] as const;
type ThemeChoice = (typeof ORDER)[number];

const ICONS = { system: Monitor, light: Sun, dark: Moon } as const;

/**
 * Cycles System → Light → Dark.
 *
 * The icon depends on `localStorage`, which the server cannot know, so the
 * button renders a stable placeholder until mounted. It stays the same size
 * throughout, so nothing shifts.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const messages = useMessages();
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const current: ThemeChoice =
    mounted && ORDER.includes(theme as ThemeChoice)
      ? (theme as ThemeChoice)
      : "system";

  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
  const Icon = ICONS[current];

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`${messages.a11y.themeToggle} — ${messages.theme[current]}`}
      title={messages.theme[current]}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-control",
        "text-fg-muted transition-colors duration-200",
        "hover:bg-accent-soft hover:text-accent",
        className,
      )}
    >
      <Icon
        aria-hidden
        className={cn("size-[1.125rem]", !mounted && "opacity-0")}
      />
    </button>
  );
}
