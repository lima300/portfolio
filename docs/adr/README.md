# Architecture Decision Records

Short, dated records of the decisions that shaped this site — what was chosen,
what it was chosen over, and what it costs. They exist so the reasoning
survives the commit that implemented it.

Format: [MADR](https://adr.github.io/madr/), trimmed.

| #                                     | Decision                                                  | Status                           |
| ------------------------------------- | --------------------------------------------------------- | -------------------------------- |
| [0001](0001-stack.md)                 | Next.js App Router, TypeScript strict, Tailwind v4        | Accepted; budget revised by 0006 |
| [0002](0002-native-i18n.md)           | Native typed dictionaries instead of an i18n library      | Accepted                         |
| [0003](0003-design-tokens.md)         | CSS custom properties as the single source of style truth | Accepted                         |
| [0004](0004-native-motion.md)         | A native motion layer instead of an animation library     | Accepted                         |
| [0005](0005-mdx-prose-typed-facts.md) | MDX for case study prose, typed data for its facts        | Accepted                         |
| [0006](0006-js-budget.md)             | A measured 175 kB first-load JS budget, enforced in CI    | Accepted                         |
