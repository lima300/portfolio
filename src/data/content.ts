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
      en: "The unglamorous half of a career in software: showing up, shipping, and the habits that make {years} years add up to something.",
      "pt-br":
        "A metade sem glamour de uma carreira em software: aparecer, entregar, e os hábitos que fazem {years} anos somarem alguma coisa.",
    },
  },
] as const;

export const mentoring = {
  programme: "iTwin4Good Challenge",
  organisation: "Enactus",
  company: "Bentley Systems",
  years: 3,
  outcome: {
    en: "In every edition of the challenge I mentored — three years running — the student teams won at national and worldwide level.",
    "pt-br":
      "Em todas as edições do desafio que mentorei — três anos seguidos — os times de estudantes venceram em nível nacional e mundial.",
  } satisfies Localized,
  detail: {
    en: "I led Bentley's mentoring for the iTwin4Good Challenge, an Enactus initiative where student teams build digital-twin solutions for social and environmental problems. My part was the engineering: helping teams scope something achievable, then get it working well enough to demo under pressure.",
    "pt-br":
      "Liderei a mentoria da Bentley no iTwin4Good Challenge, uma iniciativa da Enactus em que times de estudantes constroem soluções de gêmeos digitais para problemas sociais e ambientais. Minha parte era a engenharia: ajudar os times a definir um escopo alcançável e então fazê-lo funcionar bem o bastante para demonstrar sob pressão.",
  } satisfies Localized,
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
 * Ordered as Otávio ranks them. Captions are one-line summaries written for
 * this page, not the posts' own captions.
 *
 * TODO(otavio): optionally add a `thumbnail` for each under /public/content.
 */
export const featuredPosts: readonly SocialPost[] = [
  {
    id: "javascript-fundamentals",
    url: "https://www.instagram.com/p/DL5oeWNyCDA/",
    kind: "carousel",
    caption: {
      en: "Do you understand JavaScript, or just memorise tutorials? The concepts that made it click.",
      "pt-br":
        "Você entende JavaScript ou só decora tutorial? Os conceitos que fizeram tudo fazer sentido.",
    },
  },
  {
    id: "free-resources",
    url: "https://www.instagram.com/p/DPjYE-Rjk2r/",
    kind: "carousel",
    caption: {
      en: "Five free resources that take a developer from starting out to standing out.",
      "pt-br":
        "Cinco recursos gratuitos para sair do começo e se destacar como dev.",
    },
  },
  {
    id: "tech-roadmap",
    url: "https://www.instagram.com/p/DUQm7xsjo95/",
    kind: "carousel",
    caption: {
      en: "Getting into tech isn't about being a genius. The roadmap I wish I'd had, in order.",
      "pt-br":
        "Entrar em TI não é sobre ser gênio. O roadmap que eu queria ter tido, na ordem certa.",
    },
  },
] as const;
