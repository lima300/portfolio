#!/usr/bin/env node
/**
 * Fails the build when a route's first-load JavaScript goes over budget.
 *
 * Reads the chunk list Next writes for every route after `next build`, and
 * measures each chunk the way a browser receives it: gzipped. The `noModule`
 * polyfills are not in that list — modern browsers never download them — so
 * they are rightly not counted.
 *
 * The budget and why it is that number: docs/adr/0006-js-budget.md.
 *
 * Usage: `pnpm build && pnpm check:bundle`
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

/** First-load JS per route, gzipped. */
const BUDGET_KB = 175;

/** Development surfaces: shipped, never linked, not held to the budget. */
const IGNORED = [/\/dev\//];

const root = process.cwd();
const statsPath = join(root, ".next/diagnostics/route-bundle-stats.json");

let stats;
try {
  stats = JSON.parse(readFileSync(statsPath, "utf8"));
} catch {
  console.error(`No bundle stats at ${statsPath}. Run \`pnpm build\` first.`);
  process.exit(1);
}

const sizes = new Map();
const gzipped = (chunk) => {
  if (!sizes.has(chunk)) {
    sizes.set(chunk, gzipSync(readFileSync(join(root, chunk))).length);
  }
  return sizes.get(chunk);
};

const kb = (bytes) => (bytes / 1024).toFixed(1);

const rows = stats
  .filter(({ route }) => !IGNORED.some((pattern) => pattern.test(route)))
  .map(({ route, firstLoadChunkPaths }) => ({
    route,
    bytes: firstLoadChunkPaths.reduce((sum, chunk) => sum + gzipped(chunk), 0),
  }))
  .sort((a, b) => b.bytes - a.bytes);

const width = Math.max(...rows.map((row) => row.route.length));
let failed = false;

console.log(`First-load JS, gzipped (budget ${BUDGET_KB} kB)\n`);
for (const { route, bytes } of rows) {
  const over = bytes / 1024 > BUDGET_KB;
  failed ||= over;
  console.log(
    `${over ? "✗" : "✓"} ${route.padEnd(width)}  ${kb(bytes).padStart(6)} kB`,
  );
}

if (failed) {
  console.error(`\nOver budget. See docs/adr/0006-js-budget.md.`);
  process.exit(1);
}
