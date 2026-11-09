"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's drifting green mesh.
 *
 * Everything visual is in `globals.css`: three radial-gradient blobs
 * animating `translate` and `scale` only. This component exists for one
 * reason — to stop the animation once the hero leaves the viewport, which CSS
 * alone cannot express. That is the whole client cost, a few hundred bytes.
 *
 * Decorative, so `aria-hidden`. The gradients carry no information.
 */
export function Aurora() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = container.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.visible = String(entry.isIntersecting);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={container} data-aurora="" data-visible="true" aria-hidden>
      <span />
      <span />
      <span />
    </div>
  );
}
