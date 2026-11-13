/**
 * The theme switch, shared by the toggle button, the `t` shortcut and the
 * command palette, so all three animate the same way.
 */

export const THEME_ORDER = ["system", "light", "dark"] as const;
export type ThemeChoice = (typeof THEME_ORDER)[number];

export function isThemeChoice(value: unknown): value is ThemeChoice {
  return THEME_ORDER.includes(value as ThemeChoice);
}

/** System -> Light -> Dark -> System. */
export function nextTheme(current: ThemeChoice): ThemeChoice {
  return THEME_ORDER[(THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length];
}

/** What `data-theme` should become — "system" resolves against the OS. */
function resolve(choice: ThemeChoice): "light" | "dark" {
  if (choice !== "system") return choice;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

type SwitchOptions = {
  choice: ThemeChoice;
  setTheme: (theme: string) => void;
  reducedMotion: boolean;
  /** Where the circular reveal starts. Defaults to the viewport's centre. */
  origin?: { x: number; y: number };
};

/**
 * Wipes the new theme in with a circular clip-path, centred on `origin`, or
 * switches instantly when motion is reduced or View Transitions are missing.
 */
export function switchTheme({
  choice,
  setTheme,
  reducedMotion,
  origin,
}: SwitchOptions) {
  const root = document.documentElement;
  const canAnimate =
    !reducedMotion && typeof document.startViewTransition === "function";

  if (!canAnimate) {
    setTheme(choice);
    return;
  }

  const originX = origin?.x ?? window.innerWidth / 2;
  const originY = origin?.y ?? window.innerHeight / 2;
  // Sized to reach the furthest corner, so the wipe always covers the page.
  const radius = Math.hypot(
    Math.max(originX, window.innerWidth - originX),
    Math.max(originY, window.innerHeight - originY),
  );

  root.style.setProperty("--theme-origin-x", `${originX}px`);
  root.style.setProperty("--theme-origin-y", `${originY}px`);
  root.style.setProperty("--theme-reveal-radius", `${radius}px`);
  root.dataset.themeSwitching = "";

  const transition = document.startViewTransition(() => {
    /*
     * next-themes' setTheme only sets React state; it applies `data-theme`
     * in a passive effect, which lands after the transition has already
     * snapshotted the page. Writing the attribute here puts the new theme
     * into the "new" snapshot, and setTheme still runs for persistence and
     * for the rest of the tree.
     */
    root.setAttribute("data-theme", resolve(choice));
    setTheme(choice);
  });

  transition.finished.finally(() => {
    delete root.dataset.themeSwitching;
  });
}

/** The centre of an element, for starting the reveal from a button. */
export function centreOf(element: Element | null) {
  if (!element) return undefined;
  const bounds = element.getBoundingClientRect();
  return {
    x: bounds.left + bounds.width / 2,
    y: bounds.top + bounds.height / 2,
  };
}
