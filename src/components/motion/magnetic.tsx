"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type MagneticProps = {
  children: ReactNode;
  /** Maximum pull, in pixels. */
  strength?: number;
  className?: string;
};

/**
 * Pulls its child gently towards the cursor, then lets it spring back.
 *
 * The listeners are attached imperatively and write straight to the DOM. Two
 * reasons: a pointer-move handler routed through React state would re-render
 * on every mouse movement, and the wrapper stays a plain non-interactive
 * element — the control is the child, which keeps its own role, focus ring and
 * keyboard behaviour.
 *
 * Mouse only. On touch there is no hover to respond to, and the effect would
 * just add latency to a tap.
 */
export function Magnetic({ children, strength = 8, className }: MagneticProps) {
  const reducedMotion = useReducedMotion();
  const wrapper = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const element = wrapper.current;
    if (!element) return;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const bounds = element.getBoundingClientRect();
      const offsetX = event.clientX - (bounds.left + bounds.width / 2);
      const offsetY = event.clientY - (bounds.top + bounds.height / 2);

      // Normalised against the element's own size, so a wide button does not
      // pull further than a small one.
      element.style.setProperty(
        "--magnetic-x",
        `${(offsetX / (bounds.width / 2)) * strength}px`,
      );
      element.style.setProperty(
        "--magnetic-y",
        `${(offsetY / (bounds.height / 2)) * strength}px`,
      );
      element.dataset.magnetic = "active";
    };

    const reset = () => {
      element.style.removeProperty("--magnetic-x");
      element.style.removeProperty("--magnetic-y");
      element.dataset.magnetic = "idle";
    };

    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerleave", reset);
    // A keyboard user never triggers the pull, so the focus ring must not be
    // offset by a transform left over from the mouse.
    element.addEventListener("focusout", reset);

    return () => {
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", reset);
      element.removeEventListener("focusout", reset);
      reset();
    };
  }, [reducedMotion, strength]);

  return (
    <span
      ref={wrapper}
      data-magnetic="idle"
      className={cn("inline-block", className)}
    >
      {children}
    </span>
  );
}
