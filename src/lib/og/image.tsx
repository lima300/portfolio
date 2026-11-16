import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";

import { dictionaries } from "@/i18n/dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import type { Messages } from "@/messages/en";
import { site } from "@/lib/site";

/**
 * The link preview every page shares: what LinkedIn, WhatsApp, Slack and X
 * show when someone pastes a URL. One renderer, so each page only says what
 * its card is about — the layout, type and colours are decided here once.
 *
 * Dark on purpose: in a light chat or feed, a black card with one green
 * accent is the thing that stands out. The colours are the site's own dark
 * tokens (`globals.css`), written out because Satori cannot read CSS
 * variables.
 */

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png";

const colors = {
  bg: "#000000",
  elevated: "#111113",
  fg: "#f5f5f7",
  muted: "#a1a1a6",
  subtle: "#8a8a8f",
  border: "rgba(255,255,255,0.1)",
  accent: "#30d158",
  accentFg: "#00210d",
} as const;

/*
 * Static WOFF files, not the site's next/font ones: Satori reads TTF, OTF and
 * WOFF only, and does not understand variable fonts.
 */
const fontDir = join(process.cwd(), "src/assets/fonts");

async function loadFonts() {
  const [regular, semibold, mono] = await Promise.all([
    readFile(join(fontDir, "inter-latin-400.woff")),
    readFile(join(fontDir, "inter-latin-600.woff")),
    readFile(join(fontDir, "jetbrains-mono-latin-500.woff")),
  ]);
  return [
    { name: "Inter", data: regular, weight: 400, style: "normal" },
    { name: "Inter", data: semibold, weight: 600, style: "normal" },
    { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
  ] as const;
}

export type OgCard = {
  locale: Locale;
  eyebrow: string;
  title: string;
  description?: string;
};

/** The longest title still set at full size; longer ones step down. */
const LONG_TITLE = 48;

/**
 * The finished PNG, cached.
 *
 * Under Cache Components, reading the font files is I/O the prerender cannot
 * see the end of, so an uncached image route fails to prerender — and then
 * fails at request time. Caching the whole render makes each card a static
 * file computed once at build, keyed by its text.
 */
export async function renderOgImage(card: OgCard): Promise<Response> {
  const png = await renderPng(card);
  return new Response(png, {
    headers: { "Content-Type": ogContentType },
  });
}

async function renderPng({
  locale,
  eyebrow,
  title,
  description,
}: OgCard): Promise<Uint8Array<ArrayBuffer>> {
  "use cache";
  cacheLife("max");

  const host = new URL(site.url).host;
  const titleSize = title.length > LONG_TITLE ? 60 : 76;

  const image = new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: colors.bg,
        // A soft green light in one corner, the accent's only large use.
        backgroundImage:
          "radial-gradient(circle at 100% 0%, rgba(48,209,88,0.22), rgba(48,209,88,0) 55%)",
        color: colors.fg,
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: 16,
            backgroundColor: colors.accent,
            color: colors.accentFg,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: -1,
          }}
        >
          OL
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "JetBrains Mono",
            fontSize: 26,
            color: colors.muted,
          }}
        >
          {host}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontFamily: "JetBrains Mono",
            fontSize: 24,
            color: colors.accent,
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              display: "block",
              fontSize: 30,
              lineHeight: 1.4,
              color: colors.muted,
              maxWidth: 960,
              // Two lines at most; a preview is not the place for a paragraph.
              lineClamp: 2,
            }}
          >
            {description}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 28,
          borderTop: `1px solid ${colors.border}`,
          fontSize: 26,
          color: colors.subtle,
        }}
      >
        <div style={{ display: "flex", color: colors.fg, fontWeight: 600 }}>
          {site.name}
        </div>
        <div style={{ display: "flex" }}>
          {dictionaries[locale].resume.role}
        </div>
      </div>
    </div>,
    { ...ogSize, fonts: [...(await loadFonts())] },
  );
  return new Uint8Array(await image.arrayBuffer());
}

/**
 * The locale an image route was reached under. Image routes are Route
 * Handlers, so they read it from `params` rather than `next/root-params`.
 */
export async function ogMessages(
  params: Promise<{ locale: string }> | { locale: string },
): Promise<{ locale: Locale; messages: Messages }> {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "en";
  return { locale: resolved, messages: dictionaries[resolved] };
}

type Params = { locale: string };

/**
 * Builds a page's `opengraph-image` exports from what its card should say.
 *
 * `generateImageMetadata` rather than a static `alt` export, because the alt
 * text has to be in the page's language. Next hands it `params` as a plain
 * object and the image function a promise; `ogMessages` accepts either.
 */
export function ogImageRoute(
  card: (
    messages: Messages,
    params: Params,
  ) => Omit<OgCard, "locale"> | Promise<Omit<OgCard, "locale">>,
) {
  async function describe(params: Params | Promise<Params>) {
    const resolved = await params;
    const { locale, messages } = await ogMessages(resolved);
    return { locale, ...(await card(messages, resolved)) };
  }

  return {
    async generateImageMetadata({ params }: { params: Params }) {
      const { title } = await describe(params);
      return [
        {
          id: "card",
          alt: `${title} — ${site.name}`,
          size: ogSize,
          contentType: ogContentType,
        },
      ];
    },
    async Image({ params }: { params: Promise<Params> }) {
      return renderOgImage(await describe(params));
    },
  };
}
