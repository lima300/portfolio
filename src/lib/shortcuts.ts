/**
 * Every keyboard shortcut, defined once: the listener reads these to act,
 * and the `?` sheet reads them to explain. A shortcut that is documented but
 * does nothing — or works but is never mentioned — is not possible.
 */

export type ShortcutId =
  "palette" | "home" | "work" | "about" | "resume" | "lab" | "theme" | "help";

export type Shortcut = {
  id: ShortcutId;
  /**
   * Keys pressed one after another. `mod` is ⌘ on Apple platforms and Ctrl
   * elsewhere, and is the only chord: it is held with the key after it.
   */
  keys: readonly string[];
};

export const shortcuts: readonly Shortcut[] = [
  { id: "palette", keys: ["mod", "k"] },
  { id: "home", keys: ["g", "h"] },
  { id: "work", keys: ["g", "w"] },
  { id: "about", keys: ["g", "a"] },
  { id: "resume", keys: ["g", "r"] },
  { id: "lab", keys: ["g", "l"] },
  { id: "theme", keys: ["t"] },
  { id: "help", keys: ["?"] },
] as const;

/** How long a `g` waits for its second key. */
export const SEQUENCE_TIMEOUT = 1000;

/**
 * Matches the single keys and two-key sequences (`g w`) above, one keypress
 * at a time. The ⌘K chord is handled by the listener directly, since it
 * comes with a modifier the sequences deliberately ignore.
 *
 * Returns a function that takes the pressed key and a timestamp, and answers
 * with the shortcut it completes, if any.
 */
export function createSequenceMatcher(
  timeout = SEQUENCE_TIMEOUT,
  table: readonly Shortcut[] = shortcuts,
) {
  const sequences = table.filter((shortcut) => shortcut.keys[0] !== "mod");
  let pending: { key: string; at: number } | null = null;

  return (key: string, now: number): ShortcutId | null => {
    if (pending && now - pending.at <= timeout) {
      const first = pending.key;
      pending = null;
      const match = sequences.find(
        (shortcut) =>
          shortcut.keys.length === 2 &&
          shortcut.keys[0] === first &&
          shortcut.keys[1] === key,
      );
      if (match) return match.id;
      // Not a sequence after all: fall through and read the key on its own.
    }
    pending = null;

    const single = sequences.find(
      (shortcut) => shortcut.keys.length === 1 && shortcut.keys[0] === key,
    );
    if (single) return single.id;

    if (sequences.some((shortcut) => shortcut.keys[0] === key)) {
      pending = { key, at: now };
    }
    return null;
  };
}

/**
 * True when a keypress belongs to whatever has focus — a text field, an
 * editable region — rather than to the page.
 */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  );
}
