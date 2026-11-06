"use client";

import { useEffect, useRef } from "react";

import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type CountUpProps = {
  to: number;
  /** Milliseconds for the whole run. */
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** BCP 47 tag, so 100000 reads as "100,000" or "100.000". */
  locale?: string;
  className?: string;
};

/** Fast at first, settling at the end — the shape that reads as "arriving". */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

export function CountUp({
  to,
  duration = 1200,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale = "en",
  className,
}: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const reducedMotion = useReducedMotion();
  const node = useRef<HTMLSpanElement>(null);

  const format = (value: number) =>
    `${prefix}${value.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;

  useEffect(() => {
    if (reducedMotion || !inView) return;

    const element = node.current;
    if (!element) return;

    /*
     * Written straight to the DOM rather than through state: a counter at
     * 60fps would otherwise re-render React 70-odd times for one number.
     */
    let frame = 0;
    const started = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      element.textContent = format(easeOutExpo(progress) * to);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    element.textContent = format(0);
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
    // `format` is derived from the formatting props, which are in the list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reducedMotion, to, duration, decimals, prefix, suffix, locale]);

  return (
    <span ref={ref} className={className}>
      {/*
        The final value is what renders on the server and before the animation
        starts, so the number is correct for search engines, for a reader with
        JavaScript off, and for anyone who prefers reduced motion.
      */}
      <span ref={node}>{format(to)}</span>
    </span>
  );
}
