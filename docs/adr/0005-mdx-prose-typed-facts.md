# 0005 — MDX for case study prose, typed data for case study facts

- **Status:** Accepted
- **Date:** 2026-11-11
- **Refines:** the original plan's "MDX with typed frontmatter"

## Context

Each case study is a long-form story — context, decisions, results — wrapped
in structured facts: a title, a one-line outcome, a role, a period, a stack,
headline figures and a TL;DR. The same facts already drive the project cards
on the home page, from `src/data/projects.ts`.

The plan suggested MDX with typed frontmatter, through `@next/mdx` or a
content-collection tool such as Velite.

## Decision

`@next/mdx`, with MDX holding **only the prose**. Every structured fact stays
in `projects.ts`. The case study route imports the body by locale and slug
(`src/content/work/<locale>/<slug>.mdx`) and renders the header, TL;DR,
figures and next-case-study card itself.

## Why

- **One record per fact.** If the figures lived in frontmatter as well as in
  `projects.ts`, the card and the page could disagree, and nothing would
  notice. With one record they cannot.
- **Type safety without a content layer.** Frontmatter is untyped YAML until a
  tool like Velite validates it. Keeping the facts in TypeScript gets the same
  guarantees, with the same unit tests as the rest of the data, and adds no
  dependency.
- **Components stay in the design system.** `src/mdx-components.tsx` maps
  every Markdown element onto the existing type scale and tokens, so an
  article cannot drift into a second visual language, and `<Decision>` gives
  the decision log one consistent shape.
- **Fully static.** The dynamic import uses a template literal the bundler can
  analyse, so every body is compiled at build time and the route prerenders
  under Cache Components with `ensureStatic = "navigation"`.

## Consequences

- Adding a case study touches two places: an entry in `projects.ts` and one
  MDX file per locale. A unit test fails if a locale's file is missing.
- Remark and rehype plugins must be named by string, because Turbopack cannot
  receive a JavaScript function. Plugins that need function options are
  unavailable until that changes.
- Prettier's MDX parser predates MDX 2 and corrupts `{/* */}` comments, so
  `src/content/**/*.mdx` is excluded from formatting.
- Syntax highlighting (Shiki) is not wired up yet. None of the current case
  studies shows code, and confidentiality rules out most of what it could.
