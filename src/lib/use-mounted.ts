"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};
const onClient = () => true;
const onServer = () => false;

/**
 * `false` during server rendering and hydration, `true` afterwards.
 *
 * For UI that depends on something the server cannot know — `localStorage`,
 * the user's time zone, `matchMedia`. `useSyncExternalStore` gives React a
 * separate server snapshot, so this costs no effect and no extra render pass
 * (unlike the `useState` + `useEffect` idiom, which schedules a cascading
 * render).
 */
export function useMounted(): boolean {
  return useSyncExternalStore(noop, onClient, onServer);
}
