"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** How far into the viewport the element must be, as a CSS margin. */
  rootMargin?: string;
  /** Fraction of the element that must be visible. */
  threshold?: number;
  /** Stop observing after the first intersection. */
  once?: boolean;
};

/**
 * Reports whether an element has entered the viewport.
 *
 * One observer per element is deliberate: reveals fire once and then
 * disconnect, so nothing stays subscribed to scroll for the life of the page.
 *
 * `IntersectionObserver` is assumed rather than feature-detected: it has been
 * available in every browser this app can run in since 2019, and a fallback
 * branch here would be untestable dead code. jsdom is the one environment
 * without it, which `tests/setup.ts` stubs.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  rootMargin = "0px 0px -12% 0px",
  threshold = 0,
  once = true,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, inView };
}
