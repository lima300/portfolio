"use client";

import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export type ComparisonRow = {
  label: string;
  before: number;
  after: number;
  /** Appended to every value, e.g. "%" or " ms". */
  unit?: string;
  /**
   * Which way is better. Decides the sign colour of the change, nothing
   * else: a cost going down and a conversion rate going up are both wins.
   */
  better?: "lower" | "higher";
};

export type BeforeAfterLabels = {
  before: string;
  after: string;
  slider: string;
};

type Props = {
  rows: readonly ComparisonRow[];
  caption: string;
  labels: BeforeAfterLabels;
  locale: string;
};

const DURATION = 1200;
const easeOut = (t: number) => 1 - (1 - t) ** 3;

/**
 * A before/after comparison you can scrub.
 *
 * Drawn from the published figures alone — there are no screenshots to put
 * either side of a divider, because the work is confidential — so each row
 * is a bar that moves between its before and after values as the slider
 * does, with a faint outline left at the before value for scale.
 *
 * The slider is a native range input: keyboard, touch and screen readers
 * all work without a line of custom handling. The first time the figure
 * scrolls into view it plays once from before to after; any interaction
 * stops that and hands control to the reader. With reduced motion it simply
 * shows the after state.
 *
 * Bars scale with `transform` only, per the motion rules.
 */
export function BeforeAfterSlider({ rows, caption, labels, locale }: Props) {
  const [position, setPosition] = useState(0);
  const touched = useRef(false);
  const frame = useRef<number>(0);
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLElement>({
    rootMargin: "0px 0px -25% 0px",
  });
  const sliderId = useId();

  useEffect(() => {
    if (!inView || touched.current) return;

    if (reduced) {
      // Deferred a frame rather than set in the effect body, which would
      // cascade a second render; the visible result is the same.
      frame.current = requestAnimationFrame(() => setPosition(100));
      return () => cancelAnimationFrame(frame.current);
    }

    const start = performance.now();
    const tick = (now: number) => {
      if (touched.current) return;
      const progress = Math.min((now - start) / DURATION, 1);
      setPosition(Math.round(easeOut(progress) * 100));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [inView, reduced]);

  const take = (value: number) => {
    touched.current = true;
    cancelAnimationFrame(frame.current);
    setPosition(value);
  };

  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const signed = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
    signDisplay: "exceptZero",
  });

  const current = (row: ComparisonRow) =>
    row.before + (row.after - row.before) * (position / 100);
  const format = (row: ComparisonRow, value: number) =>
    `${number.format(value)}${row.unit ?? ""}`;

  const valueText = rows
    .map((row) => `${row.label}: ${format(row, current(row))}`)
    .join(", ");

  return (
    <figure
      ref={ref}
      className="my-8 flex flex-col gap-6 rounded-card border bg-bg-elevated p-6 shadow-soft md:p-8"
    >
      <ul className="flex flex-col gap-6">
        {rows.map((row) => {
          const max = Math.max(row.before, row.after);
          const change = ((row.after - row.before) / row.before) * 100;
          const better = row.better ?? "lower";
          const improved =
            better === "lower"
              ? row.after < row.before
              : row.after > row.before;

          return (
            <li key={row.label} className="flex flex-col gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="text-small font-medium text-fg">
                  {row.label}
                </span>
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-label text-fg-subtle">
                    {format(row, row.before)} → {format(row, row.after)}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-label font-medium",
                      improved ? "text-accent" : "text-fg-muted",
                    )}
                  >
                    {signed.format(change)}%
                  </span>
                </span>
              </div>

              <div
                aria-hidden
                className="relative h-3 overflow-hidden rounded-full bg-bg-sunken"
              >
                <div
                  className="absolute inset-y-0 left-0 w-full origin-left rounded-full border border-fg-subtle/40"
                  style={{ transform: `scaleX(${row.before / max})` }}
                />
                <div
                  className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-accent"
                  style={{ transform: `scaleX(${current(row) / max})` }}
                />
              </div>

              <span
                aria-hidden
                className="self-end text-h3 text-accent tabular-nums"
              >
                {format(row, current(row))}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-2">
        <label htmlFor={sliderId} className="sr-only">
          {labels.slider}
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          aria-valuetext={valueText}
          onChange={(event) => take(Number(event.target.value))}
          onPointerDown={() => {
            touched.current = true;
            cancelAnimationFrame(frame.current);
          }}
          className="w-full cursor-pointer accent-accent"
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => take(0)}
            aria-pressed={position === 0}
            className="font-mono text-label tracking-widest text-fg-muted uppercase transition-colors duration-200 hover:text-accent aria-pressed:text-fg"
          >
            {labels.before}
          </button>
          <button
            type="button"
            onClick={() => take(100)}
            aria-pressed={position === 100}
            className="font-mono text-label tracking-widest text-fg-muted uppercase transition-colors duration-200 hover:text-accent aria-pressed:text-fg"
          >
            {labels.after}
          </button>
        </div>
      </div>

      <figcaption className="text-small text-fg-muted">{caption}</figcaption>
    </figure>
  );
}
