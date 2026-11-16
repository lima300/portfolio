#!/usr/bin/env node
/**
 * Surfaces a Lighthouse CI run as GitHub annotations.
 *
 * Job logs need a signed-in viewer, but annotations show on the run's summary
 * page and on the pull request, readable at a glance. So every failed
 * assertion becomes an `::error`, and each URL's median scores become a
 * `::notice` — a passing run says what it measured, not just that it passed.
 *
 * Outside GitHub Actions the same lines print as plain text.
 *
 * Usage: `pnpm lighthouse; node scripts/lighthouse-annotate.mjs`
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));

const path = (url) => new URL(url).pathname;
const pct = (score) => Math.round(score * 100);

let manifest = [];
try {
  manifest = read(".lighthouseci/reports/manifest.json");
} catch {
  console.log(
    "::error title=Lighthouse::No report was written. lhci failed before auditing; see the job log.",
  );
  process.exit(0);
}

for (const run of manifest.filter((entry) => entry.isRepresentativeRun)) {
  const s = run.summary;
  console.log(
    `::notice title=Lighthouse ${path(run.url)}::` +
      `perf ${pct(s.performance)} · a11y ${pct(s.accessibility)} · ` +
      `bp ${pct(s["best-practices"])} · seo ${pct(s.seo)}`,
  );
}

let assertions = [];
try {
  assertions = read(".lighthouseci/assertion-results.json");
} catch {
  // No assertions file: lhci stopped before asserting. The manifest notice
  // above, or its absence, already says how far it got.
}

for (const failure of assertions.filter((result) => !result.passed)) {
  // Scores are 0–1 in the file; print them as the 0–100 everyone reads.
  const scale = failure.name === "minScore" ? pct : (value) => value;
  const what = failure.auditProperty
    ? `${failure.auditId}.${failure.auditProperty}`
    : failure.auditId;
  console.log(
    `::error title=Lighthouse ${path(failure.url)}::` +
      `${what}: expected ${failure.operator} ${scale(failure.expected)}, got ${scale(failure.actual)}`,
  );
}
