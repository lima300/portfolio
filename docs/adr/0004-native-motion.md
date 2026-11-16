# 0004 — A native motion layer instead of an animation library

- **Status:** Accepted
- **Date:** 2026-11-06
- **Supersedes:** the original plan's choice of `motion` (formerly Framer Motion)

## Context

The design calls for section reveals, count-up metrics, a magnetic primary
CTA, parallax drift, a circular theme-switch reveal and hover lift on product
cards. It also sets a first-load budget of 120 kB of JavaScript (since revised to
175 kB by [0006](0006-js-budget.md); the argument here holds either way) — and the
Next.js 16 framework runtime alone already accounts for ~117 kB of that.

## Decision

Build the motion primitives on platform features, and keep no animation
library in the bundle.

| Primitive    | Mechanism                                             | Client JS                   |
| ------------ | ----------------------------------------------------- | --------------------------- |
| `Reveal`     | CSS transition, flipped by one `IntersectionObserver` | ~0.5 kB                     |
| `CountUp`    | `requestAnimationFrame` writing to the DOM node       | ~0.6 kB                     |
| `Magnetic`   | pointer listener setting two custom properties        | ~0.7 kB                     |
| `Parallax`   | `animation-timeline: view()`                          | **none** — Server Component |
| Theme switch | View Transitions API + `clip-path` keyframes          | shared with the toggle      |

## Why

- **Budget.** `motion` is ~35 kB gzipped. Spending a third of the remaining
  budget on easing functions, when CSS ships cubic-béziers for free, is not a
  trade that survives being written down.
- **The animations are declarative anyway.** Every effect here is a
  from-to transition on `opacity`, `translate`, `filter` or `clip-path`. CSS
  does exactly that, on the compositor, without a JavaScript frame loop.
- **Fewer React renders.** `CountUp` writes `textContent` directly rather than
  setting state 70 times for one number, and `Magnetic` writes custom
  properties instead of re-rendering on every mouse move.
- **Progressive enhancement falls out naturally.** `Parallax` has no fallback
  to write: a browser without `animation-timeline` renders the element at rest.
  `Reveal`'s hidden state is scoped to `@media (scripting: enabled) and
(prefers-reduced-motion: no-preference)`, so there is no code path in which a
  reveal can strand content invisible.

## Consequences

- No spring physics. The plan specified a spring (stiffness 300, damping 30)
  for product cards; that is approximated with `--ease-out-expo` over 500ms.
  Visually close, and nobody is measuring the overshoot.
- No gesture handling, layout animations or `AnimatePresence`. Nothing in the
  design needs them. If a later chunk does, `motion` can be added for that
  route alone — it is one install, and the primitives' public API would not
  change.
- `animation-timeline: view()` is unsupported in Firefox, so parallax is
  inert there. Accepted: it is decoration, and the content is unaffected.
- The primitives are thin enough that their behaviour is verified in a real
  browser (`tests/e2e/motion.spec.ts`) rather than against a library's
  guarantees.
