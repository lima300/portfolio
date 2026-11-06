import type { CSSProperties, ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ParallaxProps = {
  children: ReactNode;
  /** Travel in rem across the element's time in view. Negative inverts it. */
  distance?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Drifts its children as they pass through the viewport.
 *
 * A Server Component: the motion is a CSS scroll-driven animation
 * (`animation-timeline: view()`), so there is no scroll listener, no
 * main-thread work, and nothing shipped to the client. Browsers without
 * support render the element at rest, which is a perfectly good outcome.
 */
export function Parallax({
  children,
  distance = 2,
  as: Component = "div",
  className,
}: ParallaxProps) {
  return (
    <Component
      data-parallax=""
      style={
        {
          "--parallax-from": `${distance}rem`,
          "--parallax-to": `${-distance}rem`,
        } as CSSProperties
      }
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
