import { describe, expect, it } from "vitest";

import { createSequenceMatcher, shortcuts } from "@/lib/shortcuts";
import en from "@/messages/en";
import ptBr from "@/messages/pt-br";

describe("createSequenceMatcher", () => {
  it("reads single keys on their own", () => {
    const match = createSequenceMatcher();
    expect(match("t", 0)).toBe("theme");
    expect(match("?", 10)).toBe("help");
  });

  it("completes a two-key sequence inside the timeout", () => {
    const match = createSequenceMatcher(1000);
    expect(match("g", 0)).toBeNull();
    expect(match("w", 500)).toBe("work");
  });

  it("forgets the first key once the timeout passes", () => {
    const match = createSequenceMatcher(1000);
    expect(match("g", 0)).toBeNull();
    expect(match("w", 1500)).toBeNull();
  });

  it("reads a broken sequence's second key on its own", () => {
    const match = createSequenceMatcher(1000);
    match("g", 0);
    expect(match("t", 100)).toBe("theme");
  });

  it("ignores keys that start nothing", () => {
    const match = createSequenceMatcher();
    expect(match("x", 0)).toBeNull();
    expect(match("w", 10)).toBeNull();
  });

  it("leaves the ⌘K chord to the listener", () => {
    const match = createSequenceMatcher();
    expect(match("k", 0)).toBeNull();
  });
});

describe("shortcuts", () => {
  it("has unique key sequences", () => {
    const sequences = shortcuts.map((shortcut) => shortcut.keys.join(" "));
    expect(new Set(sequences).size).toBe(sequences.length);
  });

  it("describes every shortcut in the sheet", () => {
    for (const shortcut of shortcuts) {
      expect(en.shortcuts.items[shortcut.id], shortcut.id).toBeTruthy();
      expect(ptBr.shortcuts.items[shortcut.id], shortcut.id).toBeTruthy();
    }
  });
});
