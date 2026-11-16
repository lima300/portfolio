# Otávio Lima — Portfolio Website Plan

> **Goal:** A portfolio that gets a recruiter at a top US company from "who is this?" to "we need to talk to him" in under 60 seconds. It should also feel elegant enough (Apple-level polish, green accent) that the site itself proves senior frontend craft.

- **Owner:** Otávio de Lima Soares, Senior Frontend Software Engineer
- **Stack:** Next.js (App Router, latest stable) · TypeScript (strict) · Tailwind CSS v4
- **Languages:** English (default) + Português (BR)
- **Theme:** follows the browser's light/dark preference, with a manual override
- **Accent color:** green
- **Recommended domain:** `otaviolima.dev` (fallback: `otaviolima.com`, `otaviolimasoares.dev`)

---

## 1. Success criteria

| Area              | Target                                                                                              |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| Recruiter clarity | Name, role, value statement, résumé, and contact visible above the fold on desktop and mobile       |
| Performance       | Lighthouse ≥ 95 in all 4 categories (mobile); LCP < 1.8s, CLS < 0.05, INP < 150ms                   |
| JS budget         | < 120 kB gzipped JS on first load for the home page                                                 |
| Accessibility     | WCAG 2.2 AA; 0 axe violations; full keyboard support; `prefers-reduced-motion` respected everywhere |
| SEO               | Indexed for "Otávio Lima frontend engineer"; OG images per page; JSON-LD `Person` schema            |
| Quality           | CI fails on lint, type errors, failing tests, a11y regressions, or a Lighthouse budget breach       |

---

## 2. Content inventory (from résumé, GitHub, Instagram)

### 2.1 Identity

- **Name:** Otávio de Lima Soares (display: **Otávio Lima**)
- **Headline (EN):** Senior Frontend Engineer. I build fast, scalable web platforms: micro-frontends, design systems, and the developer experience around them.
- **Headline (PT):** Engenheiro de Software Frontend Sênior. Construo plataformas web rápidas e escaláveis: micro-frontends, design systems e a experiência de desenvolvimento por trás delas.
- **Location:** Brazil (GMT-3), remote, working with US/global teams, 3+ time zones of overlap
- **Experience:** 6+ years
- **Email:** otavio.lima.vga@gmail.com (use the copy-to-clipboard button; **do not publish the phone number**)
- **Links:** GitHub `lima300` · LinkedIn `otavio-lima-soares` · Instagram `@otaviolima.dev` (verified, 30.8K) · Threads `@otaviolima.dev`
- **Personality hooks:** coffee → code ("I turn coffee into code and some random videos about it"), runner, traveler (Colombia, Chile), desk-setup enthusiast, from Varginha 🛸 (the "UFO city": a great easter-egg theme)
- **Creator motto:** "Disciplina. Carreira. Liberdade." / "Discipline. Career. Freedom."

### 2.2 Headline metrics (for the "impact strip")

- **60%** performance improvement (React 18 + Zustand + React Query modernization)
- **6** independent micro-frontends replacing iframe integrations
- **100+** reusable components in a company-wide design system
- **100k+** users on a platform built on that design system
- **80%** performance gain on SSR blog refactor → **40%** more sales conversions
- **30%** faster application development thanks to the design system
- **3 years in a row:** mentored globally award-winning student teams (iTwin4Good × Enactus)
- **30.8K** developers following on Instagram

### 2.3 Experience timeline

| Period              | Role                     | Company         | Highlight                                                                                                                                                                                   |
| ------------------- | ------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mar 2023 – Present  | Senior Software Engineer | Bentley Systems | React 18 modernization (+60% perf), 6-MFE Module Federation ecosystem, company-wide CI/CD reference for Azure CDN, testing pyramid (Jest/RTL/Cypress/Playwright), iTwin4Good mentoring lead |
| Jun 2022 – Mar 2023 | Software Engineer II     | SYDLE           | StencilJS design system (100+ components, −30% dev time), BPMN marketplace (100k+ users), JS→TS migrations, SSR blog refactor (+80% perf, +40% conversions)                                 |
| May 2021 – May 2022 | Software Engineer        | SYDLE           | BPMN editor with drag & drop + XML/JPG export, i18next internationalization, Jenkins CI/CD                                                                                                  |
| Jan 2021 – Apr 2021 | Software Engineer        | YouX Group      | Time-tracking platform for 200+ employees (React + Spring Boot), SonarQube, GitLab CI                                                                                                       |
| Mar 2019 – Jan 2022 | Software Engineer        | Emakers Jr      | Grammar-correction platform (10k+ users), real-time courier delivery app with WebSockets                                                                                                    |

**Education:** B.Sc. Computer Science, Federal University of Lavras (UFLA), Jun 2022, GPA 92/100.

### 2.4 Skills (grouped, no progress bars)

- **Core:** React 18, Next.js, TypeScript, JavaScript, Tailwind CSS
- **State & data:** Zustand, Redux, React Query, GraphQL, REST, WebSockets
- **Architecture:** Micro-frontends, Module Federation, Design Systems, Web Components / StencilJS, SSR, Monorepos (Turborepo)
- **Testing:** Jest, React Testing Library, Cypress, Playwright
- **DevOps & cloud:** Azure DevOps, Azure CDN, GitHub Actions, GitLab CI, Jenkins, Nginx, AWS
- **Also comfortable with:** Node.js, Django REST Framework, Spring Boot, i18next, SonarQube

### 2.5 Featured case studies

1. **Developer Experience Platform** _(flagship, public repo)_: runtime-composed micro-frontend platform with a Webpack 5 host shell, Rsbuild remotes, typed federation contract, registry-driven routing, RBAC, error isolation, observability hooks, shared design tokens, Turborepo, CI.
2. **Modernizing an enterprise digital-twin platform** _(Bentley, anonymized)_: Redux → Zustand, React Query, React 18; iframes → 6 Module Federation MFEs; reusable Azure DevOps pipeline to Azure CDN; testing pyramid. Results: +60% perf, company-wide reference architecture.
3. **Building a design system for 100k+ users** _(SYDLE)_: StencilJS + Web Components, 100+ components, framework-agnostic adoption, BPMN marketplace, SSR blog refactor (+80% perf, +40% conversions).
4. **Side projects ("Lab")**:
   - **Barber Time:** Next.js 14 App Router, RSC, Prisma, PostgreSQL, NextAuth (Google), shadcn/ui, RHF + Zod.
   - **Zeno's Paradox:** interactive, mathematically accurate animation of Achilles and the tortoise (Framer Motion). A great embeddable live demo.
   - _(Optional)_ iTwin 3D / GlobalDisplay: geolocated iModels on a map (WebGL digital twins).

> ⚠️ **Bentley/SYDLE confidentiality:** no proprietary code, screenshots, client names, or internal URLs. Use re-created diagrams, generic mock UIs, and the metrics already public on the résumé/LinkedIn. Check with your manager if unsure.

### 2.6 Content & community

- Instagram @otaviolima.dev: verified, 30.8K followers, PT-BR content making programming simple, careers in international tech, discipline
- iTwin4Good Challenge (Enactus): led the initiative, mentored teams that won national + worldwide competitions 3 years in a row
- Story themes to surface: `<Setup/>` (gear page), Q&A ("Dúvidas"), running, travel

---

## 3. Information architecture

```
/                        → Home (single scroll, the "60-second pitch")
/work/[slug]             → Case study pages (4)
/lab                     → Side projects & experiments (with live embeds)
/about                   → Longer story, values, timeline, "currently", photos
/content                 → Content & community (Instagram, mentoring, talks)
/uses                    → Setup / gear / tools (ties to the <Setup/> highlight)
/resume                  → Print-optimized résumé page + PDF download (EN & PT)
/colophon                → How this site was built (stack, perf budget, a11y, repo)
/[locale]/...            → All routes under /en and /pt-br (EN default)
/404                     → Custom, playful (UFO easter egg)
```

### 3.1 Home page sections (in order)

1. **Nav (glass bar):** logo/monogram "OL", Work · About · Content · Résumé, language switch, theme toggle, ⌘K button. Becomes more compact and translucent on scroll.
2. **Hero:** large display type, e.g. _"Frontend that scales. Interfaces that feel effortless."_, plus a sub-line with role, years, and remote/GMT-3. CTAs: **View work** (primary green) · **Download résumé** · **Copy email**. A subtle animated green aurora/gradient mesh in the background. Availability pill: "● Open to Senior/Staff Frontend roles".
3. **Impact strip:** 4–5 animated count-up metrics (60%, 6 MFEs, 100+ components, 100k+ users, 3× award-winning mentees).
4. **Selected work:** Apple-style large product cards, each with a hero visual/video, a one-line outcome, stack chips, and Case study / Live / Code links.
5. **Experience:** elegant vertical timeline with scroll-linked progress line.
6. **Skills:** grouped "bento grid" of capabilities (not logos-only; each tile states what you _do_ with it).
7. **Content & community:** follower count, 3–6 embedded/curated posts (static thumbnails linking out, not heavy embeds), iTwin4Good mentoring story.
8. **Testimonials:** 2–3 quotes from managers/colleagues _(to collect: see §12)_.
9. **About teaser:** photo, short human paragraph (coffee, running, travel, Varginha 🛸).
10. **Contact / CTA footer:** big closing line, copy email, social links, local time in Brazil ("It's 14:32 here in Brazil").

### 3.2 Case study template (`/work/[slug]`)

1. Title, one-line outcome, role, team, timeline, stack
2. **TL;DR box** for recruiters (3 bullets + key metric)
3. Context & problem
4. Constraints
5. Architecture (animated diagram that builds on scroll)
6. Key decisions & trade-offs (decision log: "Chose X over Y because…")
7. Implementation highlights (code snippets with syntax highlighting, interactive demos where possible)
8. Results (metric cards, before/after slider)
9. What I'd do differently
10. Next case study (large transition card)

---

## 4. Design system: "Apple-elegant, green"

### 4.1 Principles

- **Content first, chrome second:** generous whitespace, large confident type, few elements per viewport
- **Materials over decoration:** frosted glass (`backdrop-blur`), soft depth, hairline borders
- **Motion with purpose:** every animation explains hierarchy or responds to the user
- **One accent:** green used sparingly for actions, highlights, and focus; never as large flat backgrounds

### 4.2 Typography

- **Display + UI:** `Geist` or `Inter` (variable, self-hosted via `next/font`). SF Pro isn't licensed for web use, so use a system font stack as the closest match: `-apple-system, BlinkMacSystemFont, "Inter", ...`. **Decision:** Inter Variable with `font-feature-settings: "ss01","cv11"` for an SF-like feel, and system stack fallback.
- **Mono:** `Geist Mono` / `JetBrains Mono` for code and small labels
- **Scale (fluid, `clamp`):** Display 56–96px · H1 40–64 · H2 32–44 · H3 24–28 · Body 17–18 · Small 14–15
- **Display tracking:** tight (−0.03em), with semibold weight (600) for headlines, à la Apple

### 4.3 Color tokens (CSS variables, Tailwind v4 `@theme`)

Green accent built on the Apple-like systemGreen range, tuned for WCAG contrast.

| Token            | Light                   | Dark                    | Use                   |
| ---------------- | ----------------------- | ----------------------- | --------------------- |
| `--bg`           | `#FBFBFD`               | `#000000`               | page background       |
| `--bg-elevated`  | `#FFFFFF`               | `#111113`               | cards, sheets         |
| `--fg`           | `#1D1D1F`               | `#F5F5F7`               | primary text          |
| `--fg-muted`     | `#6E6E73`               | `#A1A1A6`               | secondary text        |
| `--border`       | `rgba(0,0,0,.08)`       | `rgba(255,255,255,.10)` | hairlines             |
| `--accent`       | `#1A8F4A`               | `#30D158`               | buttons, links, focus |
| `--accent-hover` | `#147A3E`               | `#4ADE80`               | hover                 |
| `--accent-soft`  | `#E8F7EE`               | `rgba(48,209,88,.12)`   | pills, highlights     |
| `--accent-fg`    | `#FFFFFF`               | `#00210D`               | text on accent        |
| `--glass`        | `rgba(255,255,255,.72)` | `rgba(22,22,24,.72)`    | nav, overlays         |

- Gradients: `--aurora` = radial blends of `#30D158`, `#0FA968`, `#7EE8A2`, `#0B3D2E` at low opacity for hero/mesh backgrounds
- Verify every text/background pair ≥ 4.5:1 (≥ 3:1 for large text and UI) with an automated contrast check

### 4.4 Theming behavior

- Default: **follow the OS/browser** (`prefers-color-scheme`)
- Toggle cycles **System → Light → Dark**, persisted in `localStorage` (with try/catch); `next-themes` with `attribute="class"` and `enableSystem`
- No flash on load (inline theme script from `next-themes`; `suppressHydrationWarning` on `<html>`)
- Theme switch animates with the **View Transitions API**: a circular reveal from the toggle button, falling back to an instant switch
- `color-scheme` meta + `theme-color` meta per theme (green-tinted status bar on mobile Safari)

### 4.5 Components (built in-house, Radix primitives where needed)

Button (primary/secondary/ghost) · IconButton · Pill/Badge · Card (glass, elevated, product) · MetricCard · Timeline · BentoGrid · CommandPalette · Toast · Tabs · Tooltip · LanguageSwitch · ThemeToggle · CodeBlock (Shiki) · BeforeAfterSlider · ArchitectureDiagram (SVG) · VideoCard (muted autoplay, poster, pauses offscreen) · SectionHeading · Footer

### 4.6 Shapes, depth, spacing

- Radius: 12 (controls) · 20 (cards) · 28–32 (hero/product cards)
- Shadows: soft, layered, nearly invisible in dark mode (use borders + inner glow there)
- Spacing: 4px base scale; sections 120–160px apart on desktop, 72–96px on mobile
- Max content width: 1200px; text measure ≤ 70ch

---

## 5. Motion design

**Library:** `motion` (formerly Framer Motion) for component motion, plus **native CSS scroll-driven animations** (`animation-timeline: view()`) where supported, with motion fallback. Use the Lenis smooth-scroll library only if it doesn't break native scroll semantics; default is **no scroll-jacking**.

| Element               | Animation                                                                          | Timing                                           |
| --------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------ |
| Section reveal        | fade + 16px rise + slight blur → sharp, once                                       | 500ms, `cubic-bezier(.22,1,.36,1)`, stagger 60ms |
| Hero headline         | word-by-word mask reveal                                                           | 700ms total                                      |
| Hero background       | slow-drifting green aurora (CSS/canvas), pauses when offscreen                     | infinite, 20s loop                               |
| Metrics               | count-up when in view                                                              | 1.2s ease-out                                    |
| Product cards         | scale 0.96 → 1 + parallax image on scroll; hover lift + spotlight following cursor | spring (stiffness 300, damping 30)               |
| Timeline              | scroll-linked green progress line                                                  | scroll-driven                                    |
| Nav                   | shrink + blur increase on scroll                                                   | 200ms                                            |
| Buttons               | press scale 0.97; magnetic hover on primary CTA (desktop only)                     | spring                                           |
| Page transitions      | View Transitions API: shared-element morph from card → case study hero             | 400ms                                            |
| Theme switch          | circular clip-path reveal from toggle                                              | 450ms                                            |
| Architecture diagrams | nodes/edges draw in as you scroll                                                  | scroll-driven                                    |

**Rules**

- Animate only `transform`, `opacity`, `filter`, `clip-path`
- Everything wrapped in a `useReducedMotion` guard plus a global CSS `@media (prefers-reduced-motion: reduce)` override, which switches to instant or simple fades
- No loading screen. Content renders server-side immediately; motion enhances
- Heavy effects (canvas/WebGL) load lazily after `requestIdleCallback` and only on capable devices

---

## 6. "Fall in love" features (the extra mile)

| #   | Feature                                  | Notes                                                                                                                                                         |
| --- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **⌘K command palette**                   | Navigate, switch theme/language, copy email, open résumé, jump to case studies (`cmdk`)                                                                       |
| 2   | **Recruiter mode ("60-second version")** | Toggle in the hero that collapses the site into a single summary card: role, 6+ yrs, top 3 projects, key metrics, remote/GMT-3, availability, résumé, contact |
| 3   | **Tailored company pages**               | `/for/[company]` (unlisted, `noindex`), e.g. `/for/stripe`, reorders projects and adds a short "why you" note; content in MDX                                 |
| 4   | **Live performance badge**               | Footer shows real metrics: "Lighthouse 100 · 0 a11y issues · 48 kB JS", generated by CI and committed as JSON                                                 |
| 5   | **Print = résumé**                       | `@media print` stylesheet turns `/resume` (and home) into a clean 1-page résumé                                                                               |
| 6   | **DevTools easter egg**                  | Styled green `console.log`: ASCII "OL" + "Hey curious dev 👀 — I'm from Varginha, the UFO city 🛸. The source is on GitHub, let's talk: …"                    |
| 7   | **UFO 404 page**                         | A tiny interactive UFO that "abducts" the broken URL; keyboard accessible                                                                                     |
| 8   | **Local time + status**                  | "It's 14:32 in Brazil, probably coding ☕" (by time of day)                                                                                                   |
| 9   | **Copy email with toast**                | Instead of a bare `mailto:` link                                                                                                                              |
| 10  | **Interactive case studies**             | Live Zeno's Paradox embed, before/after perf slider, animated MFE architecture diagram                                                                        |
| 11  | **Keyboard shortcuts**                   | `g w` work, `g a` about, `t` theme, `?` shortcut sheet                                                                                                        |
| 12  | **Tab-away title**                       | Title changes to "☕ Coffee break? Come back!" when the tab is hidden                                                                                         |
| 13  | **Dynamic OG images**                    | `next/og` per page and locale, styled in the green brand                                                                                                      |
| 14  | **Signature moment**                     | Hero with interactive green aurora/particle field reacting to the cursor, lazy-loaded, 60fps, off for reduced motion                                          |

> Rule: pick quality over quantity. Ship 1–9 in v1 and 10–14 in v1.1 if time is tight.

---

## 7. Technical architecture

### 7.1 Stack

| Concern           | Choice                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| Framework         | Next.js (latest stable, App Router, RSC, static generation everywhere possible)                            |
| Language          | TypeScript `strict`                                                                                        |
| Styling           | Tailwind CSS v4 (`@theme` tokens), `clsx` + `tailwind-merge`, `cva` for variants                           |
| Motion            | `motion`, CSS scroll-driven animations, View Transitions API                                               |
| Theming           | `next-themes`                                                                                              |
| i18n              | `next-intl` (locale routing `/en`, `/pt-br`, message catalogs, localized metadata)                         |
| Content           | MDX via `@next/mdx` or Velite/Content Collections (typed frontmatter) for case studies, lab, company pages |
| Code highlighting | Shiki (server-side, dual light/dark themes)                                                                |
| Primitives        | Radix UI (Dialog, Tooltip, Tabs), `cmdk`                                                                   |
| Icons             | `lucide-react` (tree-shaken) + custom SVG brand icons                                                      |
| Images            | `next/image`, AVIF/WebP, blur placeholders                                                                 |
| Fonts             | `next/font` (self-hosted, `display: swap`, subset)                                                         |
| Analytics         | Vercel Analytics + Speed Insights (privacy-friendly, no cookie banner needed)                              |
| Contact           | Copy email + optional form via Server Action → Resend, with honeypot and rate limiting                     |
| Hosting           | Vercel (preview deploys per PR), custom domain                                                             |

### 7.2 Folder structure

```
src/
  app/
    [locale]/
      layout.tsx            # fonts, theme provider, nav, footer, i18n provider
      page.tsx              # home
      work/[slug]/page.tsx
      lab/page.tsx
      about/page.tsx
      content/page.tsx
      uses/page.tsx
      resume/page.tsx
      colophon/page.tsx
      for/[company]/page.tsx
      opengraph-image.tsx
    not-found.tsx
    sitemap.ts
    robots.ts
  components/
    ui/                     # Button, Card, Pill, Toast...
    sections/               # Hero, ImpactStrip, SelectedWork, Timeline, Skills...
    motion/                 # Reveal, CountUp, Magnetic, Parallax...
    features/               # CommandPalette, RecruiterMode, ThemeToggle...
  content/
    work/{en,pt-br}/*.mdx
    lab/{en,pt-br}/*.mdx
    companies/*.mdx
  data/                     # experience.ts, skills.ts, metrics.ts, socials.ts (typed)
  i18n/                     # routing, request config
  messages/                 # en.json, pt-br.json
  lib/                      # utils, seo helpers, reduced-motion hook
  styles/globals.css        # Tailwind + @theme tokens
public/
  resume/otavio-lima-resume-en.pdf
  resume/otavio-lima-curriculo-pt.pdf
  images/, videos/
tests/
  e2e/                      # Playwright
  unit/                     # Vitest + RTL
```

### 7.3 Data model (single source of truth)

`data/experience.ts`, `data/skills.ts`, `data/metrics.ts`, and `data/socials.ts` are typed objects with `{ en, ptBR }` text fields. The home page, the `/resume` page, and the JSON-LD schema all read from them, so the résumé and the site never drift apart.

### 7.4 SEO

- Localized `generateMetadata` per page, canonical URLs, `hreflang` alternates (`en`, `pt-BR`, `x-default`)
- JSON-LD: `Person` (name, jobTitle, sameAs: GitHub/LinkedIn/Instagram, alumniOf UFLA), `CreativeWork` per case study
- `sitemap.ts`, `robots.ts`, dynamic OG images, favicon set + `apple-touch-icon`, web manifest with green `theme_color`

### 7.5 Accessibility checklist

- Semantic landmarks, one `h1` per page, logical heading order
- "Skip to content" link styled in green
- Visible custom focus ring (`2px solid var(--accent)`, offset 3px)
- All interactive elements reachable and operable by keyboard; command palette traps focus correctly
- Alt text for every meaningful image; decorative visuals `aria-hidden`
- Videos: muted, with pause control, no autoplay with reduced motion
- Language switch sets `<html lang>`; translated `aria-label`s
- Tested with VoiceOver (macOS/iOS) and axe

### 7.6 Quality & CI (GitHub Actions)

- `lint` (ESLint + `eslint-plugin-jsx-a11y`) · `typecheck` · `vitest` · `playwright` (incl. `@axe-core/playwright`)
- **Lighthouse CI** with budgets (fail if perf < 95 or JS > 120 kB); writes `metrics.json` for the live badge
- Bundle analyzer report on PRs
- Husky + lint-staged + conventional commits
- README with architecture notes, screenshots, Lighthouse scores (the repo itself is a portfolio piece)

---

## 8. Internationalization details

- EN is the default; detect `Accept-Language` on first visit to suggest PT-BR (a non-intrusive banner, never a forced redirect)
- Language switch keeps the current page (`/en/work/dxp` ↔ `/pt-br/work/dxp`)
- Translate everything: UI strings, MDX case studies, metadata, OG images, résumé PDF
- Locale-aware number/date formatting (`Intl`)
- The PT version can lean slightly more into the creator side (Instagram audience is Brazilian); EN leans into the recruiter pitch

---

## 9. Assets to produce

| Asset                     | Guidance                                                                                                                                                                |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Professional photo**    | Natural light or soft studio, neutral or dark background, shoulders-up, slight smile. Plus 2–3 casual photos (running, setup, travel) for About. Export AVIF/WebP at 2× |
| **Monogram/logo**         | "OL" wordmark in Inter Semibold, plus a green dot accent. SVG                                                                                                           |
| **Project visuals**       | Device mockups (MacBook/iPhone frames) of DXP, Barber Time, Zeno; short 5–10s muted loops (WebM/MP4 < 1.5 MB each)                                                      |
| **Architecture diagrams** | Re-drawn as SVG (MFE shell + remotes, CI/CD pipeline, testing pyramid)                                                                                                  |
| **Résumé PDFs**           | EN + PT, matching the site's typography                                                                                                                                 |
| **Domain**                | Buy `otaviolima.dev` (Google Registrar / Cloudflare / Namecheap), point to Vercel                                                                                       |
| **Testimonials**          | 2–3 short quotes with name, role, company (ask on LinkedIn)                                                                                                             |

---

## 10. Implementation roadmap

### Phase 0: Foundations (Days 1–2)

- [ ] Buy domain; create repo `lima300/portfolio`; Vercel project + preview deploys
- [ ] Scaffold Next.js + TS strict + Tailwind v4 + ESLint/Prettier/Husky
- [ ] Set up `next-intl` routing (`/en`, `/pt-br`) and `next-themes` (system default)
- [ ] Design tokens in `globals.css` (`@theme`), fonts via `next/font`
- [ ] CI: lint, typecheck, unit tests, Playwright smoke + axe, Lighthouse CI

### Phase 1: Design system (Days 3–5)

- [ ] Build UI primitives (Button, Card, Pill, Toast, Tooltip, Section, Glass Nav)
- [ ] Motion primitives (Reveal, CountUp, Magnetic, Parallax) with reduced-motion guards
- [ ] Theme toggle with View Transitions circular reveal
- [ ] Hidden `/dev/kitchen-sink` page (noindex) to review components in both themes

### Phase 2: Home page (Days 6–10)

- [ ] Nav, Hero (+ aurora background), Impact strip, Selected work, Experience timeline, Skills bento, Content & community, About teaser, Contact footer
- [ ] Typed data files (`experience`, `skills`, `metrics`, `socials`) in EN + PT
- [ ] Copy email + toast, local time widget, availability pill

### Phase 3: Case studies & pages (Days 11–16)

- [ ] MDX pipeline + case study template
- [ ] Write 4 case studies (DXP, Bentley modernization, SYDLE design system, Lab)
- [ ] Animated architecture diagrams, before/after slider, Zeno live embed
- [ ] `/about`, `/content`, `/uses`, `/resume` (print stylesheet), `/colophon`, `/lab`

### Phase 4: Delight features (Days 17–20)

- [ ] ⌘K command palette + keyboard shortcuts + `?` sheet
- [ ] Recruiter mode
- [ ] `/for/[company]` tailored pages
- [ ] DevTools easter egg, UFO 404, tab-away title
- [ ] Shared-element page transitions (card → case study)

### Phase 5: Polish & launch (Days 21–24)

- [ ] Dynamic OG images (per page, per locale), JSON-LD, sitemap, hreflang
- [ ] Full a11y audit (axe + VoiceOver + keyboard-only pass)
- [ ] Perf pass: image sizes, font subsetting, bundle check, Lighthouse ≥ 95 mobile
- [ ] Cross-browser/device QA: Safari iOS, Chrome Android, Firefox, Safari macOS, low-end Android
- [ ] Proofread EN + PT (ideally a native-speaker review for EN)
- [ ] Live performance badge from CI
- [ ] Launch 🚀 Update LinkedIn, GitHub profile `blog` field, Instagram bio link; post a "how I built my portfolio" Reel + carousel

### Phase 6: Post-launch (ongoing)

- [ ] Publish 1 technical article/month (micro-frontends, design systems, React performance), each repurposed as Instagram content
- [ ] Add testimonials as they come in
- [ ] Review analytics monthly; refresh projects every quarter

---

## 11. Content writing guidelines

- Lead with outcomes and numbers, then explain how
- Write for two readers: the scannable TL;DR is for recruiters, the depth is for engineers
- Active voice, first person, short sentences; no buzzword chains
- Every project answers: _What problem? What did I own? What trade-offs? What result?_
- Keep EN and PT equivalent in substance, adapted (not literally translated) in tone

---

## 12. Open items / things I need from you

1. **Professional photo:** schedule a shoot (see §9)
2. **Domain:** confirm `otaviolima.dev` and purchase it
3. **LinkedIn data:** LinkedIn blocks automated access, so please export or paste: headline, About, certifications, languages, recommendations, volunteering
4. **Testimonials:** ask 2–3 former managers/colleagues (Bentley, SYDLE, iTwin4Good)
5. **Confidentiality check:** confirm what you can say about Bentley and SYDLE work
6. **Instagram highlights:** pick 3–6 favorite posts/Reels to feature, plus your best-performing numbers (views, saves)
7. **Availability statement:** e.g. "Open to Senior/Staff Frontend roles, remote (US time zones)"
8. **Live demos:** confirm hosting for Barber Time and Zeno's Paradox (Vercel), and add READMEs/screenshots to those repos
9. **GitHub cleanup:** pin DXP, Barber Time, Zeno's Paradox, and the portfolio repo; archive or hide old tutorial repos (Tindev, ecoleta, go_barber, calculator…); fill in the profile README and `blog` URL
10. **Achievements to verify:** names of the competitions the iTwin4Good teams won (for credibility and links)

---

## 13. Definition of done

- [ ] All pages exist in EN + PT-BR, with no placeholder text
- [ ] Lighthouse ≥ 95 (mobile) on home + one case study; 0 axe violations
- [ ] Light/dark follows the system, toggle works, no flash on load
- [ ] Reduced motion fully respected
- [ ] Recruiter can reach the résumé and copy the email in ≤ 2 interactions from any page
- [ ] OG previews look right on LinkedIn, WhatsApp, X, and Slack
- [ ] Repo public with README, CI green, Lighthouse report attached
