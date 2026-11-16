# 0006 — A measured 175 kB first-load JS budget, enforced in CI

- **Status:** Accepted
- **Date:** 2026-11-16
- **Revises:** the 120 kB figure in [0001](0001-stack.md) and
  [0004](0004-native-motion.md)

## Context

0001 set a 120 kB first-load JavaScript budget before anything was built. By
the end of Phase 4 the home page shipped about 164 kB gzipped. Nothing
checked the number, so it had been over budget for most of the build without
anyone being told.

Measured on the production build (gzipped, per `scripts/check-bundle.mjs`):

| What                                                   | kB      |
| ------------------------------------------------------ | ------- |
| Framework floor — React 19, react-dom, Next 16 runtime | ~133    |
| Shared app code — header, theme, ⌘K provider, toasts   | ~23     |
| Home page only — hero, recruiter mode, count-ups       | ~8      |
| **Home, total**                                        | **164** |

The floor is what an empty `/_not-found` route costs. 120 kB was below it: no
amount of work in this codebase could meet the budget, so the budget was
measuring nothing.

Two things the earlier, larger figure (~207 kB) had wrong:

- It counted the `noModule` polyfill chunk (~39 kB). Browsers that run
  modules never download it.
- It was read off the HTML's script tags rather than the chunk list Next
  writes per route.

## Decision

- The budget is **175 kB gzipped per route**, first load, measured from
  `.next/diagnostics/route-bundle-stats.json`.
- `pnpm check:bundle` enforces it and runs in CI after the production build.
  An over-budget route fails the pipeline.
- Development surfaces (`/dev/*`) are exempt.

## Why 175

It is the measured cost plus roughly one feature's worth of headroom (~11
kB). Enough that a small, deliberate addition passes; not enough that a
dependency like `motion` (~35 kB) or eager-loading the command palette
(~15 kB) slips in unnoticed. A budget is only useful where it bites.

## What still pays for itself

The rules from 0001 and 0004 stand. They are why app code is ~31 kB rather
than ~100:

- Server Components by default; client code only at interactive leaves.
- Heavy, on-demand features load on demand: the command palette (cmdk,
  ~15 kB) downloads when it is first opened, not with the page.
- CSS for motion, not a library.

## Candidates if the budget gets tight

Not yet worth the trade:

- `tailwind-merge` (~9 kB) reaches the client through `cn()` in shared UI.
  A client-only `cx` without conflict resolution would remove it, at the cost
  of auditing every `className` override.
- `next/image`'s client code (a few kB) ships with the home page for the
  Instagram thumbnails in the content section. It also resizes them and
  serves modern formats, which saves more bytes than it costs.
