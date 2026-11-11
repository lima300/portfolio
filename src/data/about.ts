import type { Localized } from "./types";

/**
 * The human paragraph, and the facts a recruiter checks before a first call.
 *
 * Both matter: the paragraph is why someone remembers you, the facts are why
 * they stop wondering whether the time zones work.
 */

export const about = {
  paragraph: {
    en: "I turn coffee into code, and some of it into short videos about doing it better. I'm from Varginha — Brazil's UFO city, which is about as good an origin story as a frontend engineer gets. Most of my work is the unglamorous kind: finding why a large application got slow, then making it not be. Away from the keyboard I run, travel when I can, and spend more time on my desk setup than I would defend in public.",
    "pt-br":
      "Transformo café em código, e parte disso em vídeos curtos sobre fazer isso melhor. Sou de Varginha — a cidade do ET, o que é uma história de origem razoavelmente boa para um engenheiro frontend. A maior parte do meu trabalho é do tipo sem glamour: descobrir por que uma aplicação grande ficou lenta e então fazer com que não fique. Longe do teclado eu corro, viajo quando dá, e gasto mais tempo no setup da mesa do que eu defenderia em público.",
  } satisfies Localized,
} as const;

export type Fact = {
  id: string;
  label: Localized;
  value: Localized;
};

export const facts: readonly Fact[] = [
  {
    id: "based",
    label: { en: "Based in", "pt-br": "Morando em" },
    value: {
      en: "Varginha, Brazil 🛸",
      "pt-br": "Varginha, Brasil 🛸",
    },
  },
  {
    id: "hours",
    label: { en: "Working hours", "pt-br": "Horário de trabalho" },
    value: {
      en: "GMT-3, with 3+ hours overlapping US teams",
      "pt-br": "GMT-3, com 3+ horas sobrepostas a times dos EUA",
    },
  },
  {
    id: "languages",
    label: { en: "Languages", "pt-br": "Idiomas" },
    value: {
      en: "Portuguese (native), English (professional)",
      "pt-br": "Português (nativo), inglês (profissional)",
    },
  },
  {
    id: "elsewhere",
    label: { en: "Away from the keyboard", "pt-br": "Longe do teclado" },
    value: {
      en: "Running, travel, and an indefensible amount of coffee",
      "pt-br": "Corrida, viagem e uma quantidade indefensável de café",
    },
  },
] as const;
