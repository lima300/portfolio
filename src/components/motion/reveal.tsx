"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset, in milliseconds. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Fades, rises and sharpens its children the first time they scroll into view.
 *
 * Deliberately thin: the entire animation lives in `globals.css`, keyed off
 * `[data-reveal]`. This component's only job is to flip the attribute once.
 * That means no reduced-motion branch here (CSS handles it), no hydration
 * mismatch -- both the server and the first client render emit "hidden" -- and
 * no animation library in the bundle.
 */
export function Reveal({
  children,
  delay = 0,
  as: Component = "div",
  className,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Component
      ref={ref}
      data-reveal={inView ? "visible" : "hidden"}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

/**
 * Staggers a list of children by `step` milliseconds each.
 *
 * Capped, because a long list with a linear stagger leaves the last item
 * waiting seconds for its turn.
 */
export function RevealGroup({
  children,
  step = 60,
  max = 6,
  as,
  className,
  itemClassName,
}: {
  children: ReactNode[];
  step?: number;
  max?: number;
  as?: ElementType;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <>
      {children.map((child, index) => (
        <Reveal
          key={index}
          as={as}
          delay={Math.min(index, max) * step}
          className={cn(className, itemClassName)}
        >
          {child}
        </Reveal>
      ))}
    </>
  );
}
