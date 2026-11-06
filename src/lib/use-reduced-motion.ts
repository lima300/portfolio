"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/*
 * Assume reduced motion on the server.
 *
 * The preference is unknowable during SSR, and this is the safe default: a
 * component that renders its resting state and then animates is correct for
 * everyone, whereas one that renders mid-animation and never finishes is
 * broken for the people who asked for less motion.
 */
const getServerSnapshot = () => true;

/**
 * Tracks `prefers-reduced-motion` live, so toggling it in the OS takes effect
 * without a reload.
 *
 * `globals.css` already neutralises CSS animations globally. This hook is for
 * the JavaScript side: skipping an IntersectionObserver animation, jumping a
 * counter straight to its final value, or declining to attach a pointer-move
 * listener at all.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
