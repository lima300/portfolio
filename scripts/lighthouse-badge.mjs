#!/usr/bin/env node
/**
 * Turns a Lighthouse CI run into a shields.io endpoint badge.
 *
 * Reads the manifest `lhci autorun` writes (see `lighthouserc.json`), takes
 * each URL's representative (median) run, and reports the *lowest* score per
 * category across all URLs — the badge claims what every audited page meets,
 * not what the best one does.
 *
 * Writes `.lighthouseci/badge.json`. CI publishes it to the `badges` branch on
 * pushes to main, and the README reads it from there.
 *
 * Usage: `pnpm lighthouse && pnpm lighthouse:badge`
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const manifestPath = join(root, ".lighthouseci/reports/manifest.json");
const outPath = join(root, ".lighthouseci/badge.json");

const CATEGORIES = [
  ["performance", "perf"],
  ["accessibility", "a11y"],
  ["best-practices", "bp"],
  ["seo", "seo"],
];

let manifest;
try {
  manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
} catch {
  console.error(`No Lighthouse manifest at ${manifestPath}. Run lhci first.`);
  process.exit(1);
}

const runs = manifest.filter((run) => run.isRepresentativeRun);
const lowest = Object.fromEntries(
  CATEGORIES.map(([id]) => [
    id,
    Math.round(Math.min(...runs.map((run) => run.summary[id])) * 100),
  ]),
);

const performance = lowest.performance;
const color =
  performance >= 90 ? "brightgreen" : performance >= 50 ? "orange" : "red";

const badge = {
  schemaVersion: 1,
  label: "lighthouse (mobile)",
  message: CATEGORIES.map(([id, short]) => `${short} ${lowest[id]}`).join(
    " · ",
  ),
  color,
};

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, `${JSON.stringify(badge, null, 2)}\n`);
console.log(`${badge.label}: ${badge.message} (${runs.length} pages)`);
