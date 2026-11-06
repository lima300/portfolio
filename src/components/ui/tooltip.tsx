"use client";

import * as RadixTooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type TooltipProps = {
  /** The trigger. Must be a single focusable element. */
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
};

/**
 * This is the one primitive worth a dependency.
 *
 * A tooltip has to appear on hover *and* focus, dismiss on Escape and on
 * pointer-down, stay out of the way on touch, flip when it would run off
 * screen, and describe its trigger via `aria-describedby`. Radix does all of
 * that; a hand-rolled version gets the easy half right and fails an audit on
 * the rest.
 *
 * Self-contained on purpose. Radix wants its `Provider` near the root, but
 * mounting it in the root layout pulls ~20 kB of Radix into *every* route,
 * including the many that have no tooltip at all. Keeping the provider inside
 * the component means the cost lands only where a tooltip is actually used.
 * The trade is that the open-delay is per-tooltip rather than shared between
 * adjacent ones.
 *
 * A tooltip is never the only label for a control — `IconButton` requires
 * `aria-label` for that. This is supplementary.
 */
export function Tooltip({ children, content, side = "bottom" }: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={300} skipDelayDuration={200}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={8}
            className={cn(
              "z-100 rounded-[0.5rem] border glass px-2.5 py-1.5",
              "text-label font-medium text-fg shadow-raised",
              "select-none",
            )}
            // Radix sets data-state; the entrance lives in globals.css.
            data-tooltip=""
          >
            {content}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
