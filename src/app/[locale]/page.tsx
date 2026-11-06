import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

import { LanguageSwitch } from "@/components/features/language-switch";
import { ThemeToggle } from "@/components/features/theme-toggle";
import { getI18n } from "@/i18n/dictionary";
import { getCurrentYear } from "@/lib/build-time";

/*
 * Foundation preview.
 *
 * This page exists to verify the plumbing — tokens, type scale, theming,
 * locale routing and fonts — in a real browser. The design system (chunk 2)
 * and the actual home page sections (chunks 4–6) replace it.
 */

const TOKENS = [
  ["--bg", "bg-bg"],
  ["--bg-elevated", "bg-bg-elevated"],
  ["--bg-sunken", "bg-bg-sunken"],
  ["--accent", "bg-accent"],
  ["--accent-hover", "bg-accent-hover"],
  ["--accent-soft", "bg-accent-soft"],
] as const;

export default async function HomePage() {
  const { locale, messages } = await getI18n();
  const year = await getCurrentYear();

  return (
    <>
      <header className="sticky top-0 z-50 border-b glass">
        <nav className="mx-auto flex h-14 max-w-content items-center justify-between px-6">
          <Link
            href={`/${locale}`}
            className="font-mono text-small font-semibold tracking-tight"
          >
            OL<span className="text-accent">.</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="main" className="mx-auto w-full max-w-content flex-1 px-6">
        <section className="flex flex-col items-start gap-6 py-24 md:py-36">
          <p className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-label font-medium text-accent">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {messages.hero.availability}
          </p>

          <h1 className="max-w-[18ch] text-display">
            {messages.hero.headline}
          </h1>

          <p className="measure text-lead text-fg-muted">
            {messages.hero.subline}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}#work`}
              className="inline-flex items-center gap-2 rounded-control bg-accent px-5 py-2.5 text-small font-medium text-accent-fg transition-colors duration-200 hover:bg-accent-hover"
            >
              {messages.hero.viewWork}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link
              href={`/${locale}/resume`}
              className="inline-flex items-center gap-2 rounded-control border border-border-strong px-5 py-2.5 text-small font-medium transition-colors duration-200 hover:bg-bg-sunken"
            >
              <Download aria-hidden className="size-4" />
              {messages.hero.downloadResume}
            </Link>
          </div>
        </section>

        <section
          aria-label="Design token preview"
          className="border-t py-16 md:py-24"
        >
          <h2 className="text-h3">Tokens</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {TOKENS.map(([name, className]) => (
              <li key={name} className="space-y-2">
                <div
                  className={`${className} h-16 rounded-card border shadow-soft`}
                />
                <code className="block font-mono text-label text-fg-subtle">
                  {name}
                </code>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 text-h3">Type scale</h2>
          <div className="mt-6 space-y-4">
            <p className="text-display">Display</p>
            <p className="text-h1">Heading 1</p>
            <p className="text-h2">Heading 2</p>
            <p className="text-h3">Heading 3</p>
            <p className="text-lead text-fg-muted">
              Lead — the sentence that carries the pitch.
            </p>
            <p className="measure text-body">
              Body. Lead with outcomes and numbers, then explain how. Written
              for two readers: the scannable version is for recruiters, the
              depth is for engineers.
            </p>
            <p className="font-mono text-small text-fg-muted">
              Mono — JetBrains Mono, for code and small labels.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-content flex-col gap-2 px-6 py-10 text-small text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{messages.footer.builtWith}</p>
          <p className="font-mono text-label">{year} — Otávio Lima</p>
        </div>
      </footer>
    </>
  );
}
