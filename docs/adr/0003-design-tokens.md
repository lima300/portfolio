# 0003 — CSS custom properties as the single source of style truth

- **Status:** Accepted
- **Date:** 2026-11-06

## Context

The site follows the OS colour scheme by default, with a manual override that
has to beat the OS in both directions. Every text/background pair needs to
clear WCAG 2.2 AA in both themes.

## Decision

Define the full light palette on bare `:root`. Redefine _only_ the values that
change under `@media (prefers-color-scheme: dark)`, guarded by
`:root:not([data-theme="light"])`, and again under `:root[data-theme="dark"]`.
Expose them to Tailwind through `@theme inline`.

## Why

- **Three real theme states.** "System" is not a guess made once at first
  paint — it tracks the OS live, because it is a media query. The explicit
  `[data-theme]` blocks let a manual choice win in both directions.
- **No colour has only one definition inside a media block.** Every token is
  declared on bare `:root` first, so nothing is undefined in any state.
- **One hop for components.** Components reference semantic utilities
  (`bg-bg-elevated`, `text-fg-muted`, `border-border`) and never raw hex, so
  re-theming is a token edit rather than a find-and-replace.

## Consequences

- Tokens are semantic, not literal (`--fg-muted`, not `--grey-500`). Adding a
  colour means deciding what it _means_ first, which is the intended friction.
- `@theme inline` is required rather than `@theme`, so Tailwind emits
  `var()` references instead of resolving the values at build time. Without
  `inline`, theme switching would not work.
