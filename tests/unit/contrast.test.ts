import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { AA, contrastRatio } from "@/lib/contrast";

/**
 * Reads the real design tokens out of `globals.css` and checks every
 * text-on-surface pair in both themes.
 *
 * It parses the stylesheet rather than duplicating the palette in a fixture:
 * a fixture would drift, and the point is to fail when someone nudges a token
 * to a value that no longer clears WCAG AA.
 */

const CSS = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

/** Pulls the custom properties out of one top-level selector block. */
function tokensIn(selector: string): Record<string, string> {
  const start = CSS.indexOf(selector);
  if (start === -1) throw new Error(`Selector not found: ${selector}`);

  // Walk braces so a nested @media block is included rather than truncating.
  const open = CSS.indexOf("{", start);
  let depth = 0;
  let end = open;
  for (let i = open; i < CSS.length; i += 1) {
    if (CSS[i] === "{") depth += 1;
    if (CSS[i] === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  const block = CSS.slice(open, end);
  const tokens: Record<string, string> = {};
  for (const [, name, value] of block.matchAll(
    /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi,
  )) {
    tokens[name] = value.trim();
  }
  return tokens;
}

const light = tokensIn(":root {");
const dark = tokensIn(':root[data-theme="dark"]');

type Theme = { name: string; tokens: Record<string, string>; backdrop: string };

const THEMES: Theme[] = [
  { name: "light", tokens: light, backdrop: "#ffffff" },
  { name: "dark", tokens: dark, backdrop: "#000000" },
];

/** Opaque surfaces that text can land on. */
const SURFACES = ["--bg", "--bg-elevated", "--bg-sunken"] as const;

/** Text colours that must clear the small-text threshold anywhere. */
const TEXT = ["--fg", "--fg-muted", "--fg-subtle"] as const;

describe.each(THEMES)("$name theme", ({ tokens, backdrop }) => {
  const ratio = (fg: string, bg: string) =>
    contrastRatio(tokens[fg], tokens[bg], backdrop);

  it("defines every token the theme bridge expects", () => {
    for (const token of [
      ...SURFACES,
      ...TEXT,
      "--border",
      "--border-strong",
      "--accent",
      "--accent-hover",
      "--accent-soft",
      "--accent-fg",
      "--glass",
    ]) {
      expect(tokens[token], token).toBeDefined();
    }
  });

  it.each(TEXT.flatMap((fg) => SURFACES.map((bg) => ({ fg, bg }))))(
    "$fg on $bg clears AA for small text",
    ({ fg, bg }) => {
      expect(ratio(fg, bg)).toBeGreaterThanOrEqual(AA.text);
    },
  );

  it.each(SURFACES.map((bg) => ({ bg })))(
    "--accent on $bg clears AA for small text",
    ({ bg }) => {
      expect(ratio("--accent", bg)).toBeGreaterThanOrEqual(AA.text);
    },
  );

  it("accent text on the accent-soft pill clears AA", () => {
    // --accent-soft is translucent in dark mode, so composite it onto --bg.
    expect(
      contrastRatio(
        tokens["--accent"],
        tokens["--accent-soft"],
        tokens["--bg"],
      ),
    ).toBeGreaterThanOrEqual(AA.text);
  });

  it("text on a solid accent button clears AA", () => {
    expect(ratio("--accent-fg", "--accent")).toBeGreaterThanOrEqual(AA.text);
    expect(
      contrastRatio(tokens["--accent-fg"], tokens["--accent-hover"], backdrop),
    ).toBeGreaterThanOrEqual(AA.text);
  });

  it("text on the frosted nav clears AA", () => {
    for (const fg of TEXT) {
      expect(
        contrastRatio(tokens[fg], tokens["--glass"], tokens["--bg"]),
        fg,
      ).toBeGreaterThanOrEqual(AA.text);
    }
    expect(
      contrastRatio(tokens["--accent"], tokens["--glass"], tokens["--bg"]),
    ).toBeGreaterThanOrEqual(AA.text);
  });

  it("the focus ring is distinguishable from every surface", () => {
    for (const bg of SURFACES) {
      expect(ratio("--accent", bg), bg).toBeGreaterThanOrEqual(AA.nonText);
    }
  });

  it("the strong border is distinguishable as a control boundary", () => {
    expect(
      contrastRatio(tokens["--border-strong"], tokens["--bg"], backdrop),
    ).toBeGreaterThanOrEqual(1.3);
  });
});

/**
 * Dark mode is declared twice — once for `prefers-color-scheme: dark` and once
 * for an explicit `[data-theme="dark"]` — so a manual choice can beat the OS
 * in both directions. The two blocks must stay identical.
 */
describe("dark theme declarations", () => {
  it("match between the media query and the explicit attribute", () => {
    const viaMediaQuery = tokensIn(':root:not([data-theme="light"])');
    const viaAttribute = tokensIn(':root[data-theme="dark"]');

    expect(viaMediaQuery).toEqual(viaAttribute);
  });
});
