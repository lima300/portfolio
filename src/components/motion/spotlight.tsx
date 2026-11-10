"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Tracks the cursor across its child and exposes the position as two custom
 * properties, which `globals.css` turns into a soft radial glow.
 *
 * Listeners are attached imperatively and write straight to the element's
 * style: a pointer-move handler routed through React state would re-render on
 * every mouse movement. Nothing is attached at all on touch devices, where
 * there is no cursor to follow.
 */
export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = element.current;
    if (!node) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const onPointerMove = (event: PointerEvent) => {
      const bounds = node.getBoundingClientRect();
      node.style.setProperty(
        "--spotlight-x",
        `${event.clientX - bounds.left}px`,
      );
      node.style.setProperty(
        "--spotlight-y",
        `${event.clientY - bounds.top}px`,
      );
    };

    node.addEventListener("pointermove", onPointerMove);
    return () => node.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <div
      ref={element}
      data-spotlight=""
      className={cn("relative isolate", className)}
    >
      {children}
    </div>
  );
}
