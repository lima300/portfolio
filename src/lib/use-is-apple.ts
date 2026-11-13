"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function getSnapshot() {
  return /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
}

/**
 * Whether to show ⌘ or Ctrl. Null on the server and during hydration, where
 * the platform is unknowable, so a caller can render nothing rather than
 * render the wrong key and correct it.
 */
export function useIsApple(): boolean | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
