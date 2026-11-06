<div align="center">

# otaviolima.dev

**The portfolio of [Otávio Lima](https://otaviolima.dev) — Senior Frontend Engineer.**

Built to answer one question in under 60 seconds: _can this person build things we'd want to ship?_
The site is the answer; this repository is the proof.

[![CI](https://github.com/lima300/otaviolima.dev/actions/workflows/ci.yml/badge.svg)](https://github.com/lima300/otaviolima.dev/actions/workflows/ci.yml)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-1A8F4A)](LICENSE)

[**Live site →**](https://otaviolima.dev) · [Architecture decisions](docs/adr) · [How it was built](https://otaviolima.dev/en/colophon)

</div>

---

## Why this repo exists

A portfolio that claims senior frontend skill has to demonstrate it twice: once
in the browser, and once in the source. So this repository is held to the same
standard as the site.

- **Accessibility is a build gate.** `eslint-plugin-jsx-a11y` at `strict`, plus
  an `axe-core` scan of every route in both locales on every pull request. Zero
  violations or CI fails.
- **Types reach the content.** Message catalogues are TypeScript modules, not
  JSON. A missing translation key breaks the build instead of rendering blank.
- **Decisions are written down.** Every non-obvious choice has an
  [ADR](docs/adr) saying what it was chosen over and what it costs.
- **The history is readable.** Conventional Commits, linted by `commitlint`,
  with a scope vocabulary that matches the folder structure.

## Goals it is built against

| Area                 | Target                                                                                                     |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| Performance          | Lighthouse ≥ 95 in all four categories on mobile · LCP < 1.8s · CLS < 0.05 · INP < 150ms                   |
| JS budget            | < 120 kB gzipped on first load for the home page                                                           |
| Accessibility        | WCAG 2.2 AA · zero `axe` violations · full keyboard support · `prefers-reduced-motion` honoured everywhere |
| Internationalisation | Complete parity between English and Brazilian Portuguese, including metadata and OG images                 |
| Quality              | CI fails on a lint error, a type error, a failing test, or an accessibility regression                     |

## Stack

| Concern   | Choice                                                                 | Why                                                                                             |
| --------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Framework | **Next.js 16** — App Router, React Server Components, Cache Components | Content ships as HTML; only interactive leaves cost JavaScript                                  |
| Language  | **TypeScript** `strict`                                                | No `any` escape hatches in application code                                                     |
| Styling   | **Tailwind CSS v4** with `@theme` tokens                               | Tokens live in CSS custom properties — one source of truth, so theming works at runtime         |
| Motion    | **Motion** + CSS scroll-driven animations                              | Only `transform`, `opacity`, `filter`, `clip-path`; every effect behind a reduced-motion guard  |
| Theming   | **next-themes** on `data-theme`                                        | Three real states — System / Light / Dark — with no flash before hydration                      |
| i18n      | Native `[locale]` routing + `next/root-params`                         | Typed catalogues, zero client runtime ([ADR 0002](docs/adr/0002-native-i18n.md))                |
| Icons     | **lucide-react**                                                       | Tree-shaken, one icon per import                                                                |
| Testing   | **Vitest** · **Playwright** · **axe-core**                             | Unit, end-to-end and accessibility in one pipeline                                              |
| Packaging | **pnpm**, pinned via `packageManager`                                  | Strict `node_modules` — an undeclared dependency fails to import instead of working by accident |

## Architecture

Every route lives under a `[locale]` root segment, which makes the locale a
_root parameter_. That one decision removes locale prop-drilling from the
entire tree — any Server Component can ask `next/root-params` for it.

```
Request  ──▶  proxy.ts            locale-less URL? negotiate and 307-redirect
              │                   (cookie → Accept-Language → English)
              ▼
         app/[locale]/layout.tsx  fonts · theme provider · i18n provider · skip link
              │
              ▼
         app/[locale]/**          Server Components read getMessages() directly
              │
              └──▶ client leaves  theme toggle · language switch · ⌘K · clipboard
```

```
src/
├── app/[locale]/        routes — one root layout, every locale prerendered
├── components/
│   ├── ui/              Button, Card, Pill, Toast — the design system
│   ├── sections/        composed page sections (Hero, ImpactStrip, Timeline…)
│   ├── motion/          Reveal, CountUp, Magnetic — all reduced-motion aware
│   └── features/        interactive leaves (theme, language, command palette)
├── data/                typed, bilingual source of truth for CV content
├── i18n/                locale registry, dictionary loader, client provider
├── messages/            en.ts · pt-br.ts — typed catalogues
├── lib/                 utilities, SEO helpers
└── proxy.ts             locale negotiation at the edge
tests/
├── unit/                Vitest
└── e2e/                 Playwright + axe-core
docs/adr/                architecture decision records
```

### The data model is the point

`src/data/` holds the CV content as typed objects with `{ en, ptBR }` fields.
The home page, `/resume`, the PDF and the JSON-LD `Person` schema all read from
it — so the résumé and the site can never drift apart. Changing a job title is
a one-line edit in one file.

## Running it

Requires **Node 22.12+** (`.nvmrc`) and **pnpm 10** (pinned by `packageManager`, so `corepack enable` is all you need).

```bash
corepack enable      # pnpm is pinned by package.json's "packageManager"
pnpm install
pnpm dev             # http://localhost:3000 → redirects to /en or /pt-br
```

### Scripts

| Command             | Does                                                                      |
| ------------------- | ------------------------------------------------------------------------- |
| `pnpm dev`          | Dev server with Turbopack                                                 |
| `pnpm build`        | Production build — prerenders every locale                                |
| `pnpm verify`       | **Format, lint, typecheck and unit tests.** Run this before pushing       |
| `pnpm typecheck`    | Regenerates route types, then `tsc --noEmit`                              |
| `pnpm test`         | Vitest                                                                    |
| `pnpm test:e2e`     | Playwright against a production build, including the `axe` scan           |
| `pnpm test:e2e:dev` | Playwright against `next dev` — catches React's development-only warnings |
| `pnpm format`       | Prettier, with Tailwind class sorting                                     |

> The `pre-commit` hook runs `lint-staged`; `commit-msg` runs `commitlint`.
> Both are installed by `pnpm install` via `husky`.

## Commit convention

[Conventional Commits](https://www.conventionalcommits.org), enforced on commit.
Beyond the usual types, the history uses `a11y:` and `i18n:` — because on this
project they are features, not chores.

```
feat(home): add scroll-linked experience timeline
a11y(ui): trap focus in the command palette dialog
perf(home): defer the aurora canvas until idle
i18n(work): translate the design system case study
```

Scopes mirror the folder structure (`ui`, `motion`, `sections`, `home`, `work`,
`i18n`, `theme`, `seo`, `data`, `a11y`, `perf`, `ci`, `repo`…).

## Licence

Source code: [MIT](LICENSE). Written content, photography and personal branding
are © Otávio de Lima Soares — please don't republish those as your own.

---

<div align="center">

**Looking for a senior frontend engineer?**

[otavio.lima.vga@gmail.com](mailto:otavio.lima.vga@gmail.com) · [LinkedIn](https://www.linkedin.com/in/otavio-lima-soares) · [Instagram](https://www.instagram.com/otaviolima.dev)

<sub>Built in Varginha, Brazil 🛸 — the UFO city.</sub>

</div>
