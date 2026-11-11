import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { withYears } from "@/lib/years";

describe("withYears", () => {
  it("fills every placeholder", () => {
    expect(withYears("{years}+ years, {years} total", 7)).toBe(
      "7+ years, 7 total",
    );
  });

  it("leaves copy without a placeholder alone", () => {
    expect(withYears("Three years running", 7)).toBe("Three years running");
  });
});

/**
 * Years of experience are computed, never written down. A spelled-out span
 * in the copy is how "Six years" sat beside a hero saying "7+" — this fails
 * the next time one is typed in by hand.
 *
 * Only the career span is guarded: "three years running" (the mentoring) is
 * a fixed historical fact and is allowed.
 */
describe("copy", () => {
  const files = [
    "src/messages/en.ts",
    "src/messages/pt-br.ts",
    "src/data/content.ts",
    "src/data/about.ts",
    "src/data/skills.ts",
  ];
  const spelled =
    /\b(five|six|seven|eight|nine|ten|cinco|seis|sete|oito|nove|dez|[5-9]|1\d)\+? (years|anos)\b/i;

  for (const file of files) {
    it(`${file} spells out no career length`, () => {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      expect(source).not.toMatch(spelled);
    });
  }
});
