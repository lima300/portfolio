# 0001 — Next.js App Router, TypeScript strict, Tailwind v4

- **Status:** Accepted
- **Date:** 2026-11-06

## Context

This site has two jobs: convert a recruiter in under 60 seconds, and be
evidence of senior frontend work. That means the artefact itself has to hit
Lighthouse ≥ 95 on mobile, stay under a first-load JS budget (120 kB here; revised to a measured
175 kB in [0006](0006-js-budget.md)), and ship
in two languages with per-locale metadata.

## Decision

Next.js 16 (App Router, React Server Components) with Cache Components
enabled, TypeScript in `strict` mode, and Tailwind CSS v4 driven by
`@theme` tokens.

## Why

- **Server Components by default.** Content-heavy pages ship as HTML. The
  interactive leaves — theme toggle, command palette, copy-to-clipboard — are
  the only things that cost JavaScript, which is what keeps the budget
  reachable rather than aspirational.
- **Cache Components.** Every route prerenders to a static shell. It also
  fails the build on non-deterministic values during prerender, which caught a
  bare `new Date()` in the footer on day one. That strictness is the point.
- **Tailwind v4 `@theme`.** Design tokens live in CSS custom properties and are
  exposed to Tailwind from the same declaration, so there is no second source
  of truth in a JS config to drift.

Package manager: **pnpm**, pinned by `packageManager` so local and CI installs
resolve identically. Its strict `node_modules` means an undeclared dependency
fails to import rather than working by accident through hoisting — the same
class of guarantee as `strict` mode, applied to the dependency graph.

## Consequences

- Next 16 and Tailwind v4 are both recent. Pinned exactly; upgrades are
  deliberate, reviewed changes.
- pnpm's strict linking occasionally needs a hoist exception. `.npmrc` records
  the two that are required (ESLint and Prettier plugins) and why.
- Cache Components forbids the `runtime` segment config and needs the Node.js
  runtime. Acceptable: the whole site is static.
