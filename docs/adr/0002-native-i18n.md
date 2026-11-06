# 0002 — Native typed dictionaries instead of an i18n library

- **Status:** Accepted
- **Date:** 2026-11-06
- **Supersedes:** the original plan's choice of `next-intl`

## Context

The site ships in English and Brazilian Portuguese, with translated metadata,
`hreflang` alternates and a language switch that preserves the current page.
The original plan specified `next-intl`.

## Decision

Build i18n on Next.js primitives: a `[locale]` root segment,
`next/root-params` for locale access without prop drilling, and TypeScript
message catalogues.

## Why

- **Type safety beats runtime key lookup.** Catalogues are TypeScript modules.
  English defines the shape; `Widen<typeof en>` keeps the keys exact while
  letting the values differ. A missing or misspelled key is a compile error,
  not a blank string in production. A string-key API cannot offer that.
- **No client runtime.** Server Components read the catalogue directly. The
  one client context exists only for interactive leaves, and it carries data in
  the RSC payload — not JavaScript in the bundle.
- **No friction with Cache Components.** Locale resolution is a root param, so
  every locale prerenders statically with no request-time dependency.

## Consequences

- ICU message formatting (plurals, rich interpolation) is not available for
  free. Nothing in the current content needs it; if that changes, the
  formatting layer can be added behind the same `getMessages()` call.
- Locale-aware number and date formatting is plain `Intl`, which is adequate
  and already in every browser.
- The language-key parity and `Accept-Language` negotiation that a library
  would have provided are covered by unit tests instead.
