"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/cn";
import { formatBrazilTime, timeOfDay, type TimeOfDay } from "@/lib/brazil-time";

type LocalTimeProps = {
  /** Server-rendered snapshot, so the markup is correct before hydration. */
  initial: { time: string; period: TimeOfDay };
  className?: string;
};

/** A minute is the smallest unit displayed, so check twice a minute. */
const TICK_MS = 30_000;

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, TICK_MS);
  // Coming back to a backgrounded tab should not show a stale clock.
  document.addEventListener("visibilitychange", onChange);
  return () => {
    clearInterval(timer);
    document.removeEventListener("visibilitychange", onChange);
  };
}

/**
 * "It's 14:32 in Brazil, probably deep in a refactor."
 *
 * A live clock is the awkward case for server rendering: the value depends on
 * *when* you look, which the prerendered HTML cannot know. `useSyncExternalStore`
 * handles it cleanly — `getServerSnapshot` returns the build-time snapshot, so
 * the server HTML and the first client render agree, and the subscription then
 * supplies the real time. No hydration warning, no `useEffect` + `setState`
 * cascade, and no layout shift, because the string is the same width either way.
 */
export function LocalTime({ initial, className }: LocalTimeProps) {
  const { locale, messages } = useI18n();

  // One snapshot string carries both values, so a re-render only happens when
  // something actually displayed has changed.
  const getSnapshot = useCallback(() => {
    const now = new Date();
    return `${formatBrazilTime(now, locale)}|${timeOfDay(now)}`;
  }, [locale]);

  const getServerSnapshot = useCallback(
    () => `${initial.time}|${initial.period}`,
    [initial.time, initial.period],
  );

  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const [time, period] = useMemo(() => {
    const [value, which] = snapshot.split("|");
    return [value, which as TimeOfDay] as const;
  }, [snapshot]);

  return (
    <p className={cn("text-small text-fg-muted", className)}>
      <span>{messages.localTime.label.replace("{time}", time)}</span>
      <span className="text-fg-subtle">, {messages.localTime[period]}</span>
    </p>
  );
}
