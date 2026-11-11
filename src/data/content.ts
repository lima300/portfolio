import type { Localized } from "./types";

/**
 * The creator side.
 *
 * Kept separate from the CV because it answers a different question. The
 * résumé says what he can build; this says that he can explain it to 30,000
 * people and that teams he mentored went on to win things.
 */

export const instagram = {
  handle: "@otaviolima.dev",
  href: "https://www.instagram.com/otaviolima.dev",
  /** Verified account. */
  verified: true,
  followers: 30.8,
  followersSuffix: "K",
  motto: {
    en: "Discipline. Career. Freedom.",
    "pt-br": "Disciplina. Carreira. Liberdade.",
  } satisfies Localized,
  audience: {
    en: "Brazilian developers, mostly early in their careers",
    "pt-br": "Devs brasileiros, a maioria no começo da carreira",
  } satisfies Localized,
} as const;

export type ContentTheme = {
  id: string;
  title: Localized;
  description: Localized;
};

/** What the account is actually about, rather than a follower count alone. */
export const contentThemes: readonly ContentTheme[] = [
  {
    id: "simple",
    title: {
      en: "Programming, made simple",
      "pt-br": "Programação, de forma simples",
    },
    description: {
      en: "Breaking down the concepts that take junior developers the longest to trust — state, rendering, architecture — without the jargon that made them hard in the first place.",
      "pt-br":
        "Destrinchar os conceitos em que devs juniores levam mais tempo para confiar — estado, renderização, arquitetura — sem o jargão que os tornou difíceis.",
    },
  },
  {
    id: "international",
    title: {
      en: "Careers in international tech",
      "pt-br": "Carreira em tech internacional",
    },
    description: {
      en: "What actually changes when you work remotely for a company on another continent: interviews, English, time zones, and the expectations nobody writes down.",
      "pt-br":
        "O que muda de fato quando você trabalha remoto para uma empresa em outro continente: entrevistas, inglês, fusos e as expectativas que ninguém escreve.",
    },
  },
  {
    id: "discipline",
    title: {
      en: "Discipline over motivation",
      "pt-br": "Disciplina acima de motivação",
    },
    description: {
      en: "The unglamorous half of a career in software: showing up, shipping, and the habits that make six years add up to something.",
      "pt-br":
        "A metade sem glamour de uma carreira em software: aparecer, entregar, e os hábitos que fazem seis anos somarem alguma coisa.",
    },
  },
] as const;

export const mentoring = {
  programme: "iTwin4Good Challenge",
  organisation: "Enactus",
  company: "Bentley Systems",
  years: 3,
  outcome: {
    en: "Three years running, the student teams I mentored won at national and worldwide level.",
    "pt-br":
      "Por três anos consecutivos, os times de estudantes que mentorei venceram em nível nacional e mundial.",
  } satisfies Localized,
  detail: {
    en: "I led Bentley's mentoring for the iTwin4Good Challenge, an Enactus initiative where student teams build digital-twin solutions for social and environmental problems. My part was the engineering: helping teams scope something achievable, then get it working well enough to demo under pressure.",
    "pt-br":
      "Liderei a mentoria da Bentley no iTwin4Good Challenge, uma iniciativa da Enactus em que times de estudantes constroem soluções de gêmeos digitais para problemas sociais e ambientais. Minha parte era a engenharia: ajudar os times a definir um escopo alcançável e então fazê-lo funcionar bem o bastante para demonstrar sob pressão.",
  } satisfies Localized,
  /**
   * TODO(otavio): the plan asks for the exact competition names and years, to
   * make this verifiable. Left out rather than approximated — a specific claim
   * that turns out to be slightly wrong costs more than a general one.
   */
  competitions: [] as readonly string[],
} as const;

export type SocialPost = {
  id: string;
  url: string;
  kind: "reel" | "carousel" | "post";
  /**
   * One line, in the visitor's language — not the post's own caption, which
   * is long and written for a different audience.
   *
   * Optional, and the card reads fine without it: Instagram cannot be read
   * programmatically, so these are supplied by hand.
   */
  caption?: Localized;
  /** Path under /public. A static thumbnail, never an embed. */
  thumbnail?: string;
};

/**
 * Curated posts, chosen by Otávio.
 *
 * Links out to static cards, never Instagram embeds: an embed is an iframe, a
 * third-party script and a cookie banner's worth of tracking, for something
 * that could be a link.
 *
 * `kind` is read off the URL — `img_index` only appears on a carousel.
 *
 * TODO(otavio): add a one-line `caption` for each, and optionally a
 * `thumbnail` under /public/content. The cards render without either; a
 * caption just makes them worth clicking.
 */
export const featuredPosts: readonly SocialPost[] = [
  {
    id: "post-1",
    url: "https://www.instagram.com/p/DPjYE-Rjk2r/",
    kind: "carousel",
  },
  {
    id: "post-2",
    url: "https://www.instagram.com/p/DL5oeWNyCDA/",
    kind: "carousel",
  },
  {
    id: "post-3",
    url: "https://www.instagram.com/p/DUQm7xsjo95/",
    kind: "carousel",
  },
] as const;
