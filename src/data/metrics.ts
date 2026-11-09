import type { Localized } from "./types";

export type Metric = {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: Localized;
  detail: Localized;
};

/**
 * The impact strip: the numbers a recruiter should leave with.
 *
 * Every one of these is already public on the résumé or LinkedIn, which is
 * the line that keeps this file on the right side of the Bentley and SYDLE
 * confidentiality constraints.
 */
export const headlineMetrics: readonly Metric[] = [
  {
    id: "performance",
    value: 60,
    suffix: "%",
    label: { en: "Faster", "pt-br": "Mais rápido" },
    detail: {
      en: "React 18 + Zustand + React Query migration",
      "pt-br": "Migração para React 18 + Zustand + React Query",
    },
  },
  {
    id: "micro-frontends",
    value: 6,
    label: { en: "Micro-frontends", "pt-br": "Micro-frontends" },
    detail: {
      en: "Replacing iframe integrations, deployed independently",
      "pt-br": "Substituindo integrações por iframe, com deploy independente",
    },
  },
  {
    id: "components",
    value: 100,
    suffix: "+",
    label: { en: "Components shipped", "pt-br": "Componentes entregues" },
    detail: {
      en: "A design system that cut development time by 30%",
      "pt-br": "Um design system que reduziu em 30% o tempo de desenvolvimento",
    },
  },
  {
    id: "users",
    value: 100000,
    suffix: "+",
    label: { en: "Users served", "pt-br": "Usuários atendidos" },
    detail: {
      en: "On the platform built from that design system",
      "pt-br": "Na plataforma construída com esse design system",
    },
  },
] as const;

/** Secondary numbers, for the about and content pages. */
export const secondaryMetrics: readonly Metric[] = [
  {
    id: "mentoring",
    value: 3,
    suffix: "×",
    label: { en: "Award-winning teams", "pt-br": "Times premiados" },
    detail: {
      en: "Mentored to national and worldwide Enactus wins, three years running",
      "pt-br":
        "Mentorados a vitórias nacionais e mundiais na Enactus, três anos seguidos",
    },
  },
  {
    id: "followers",
    value: 30.8,
    decimals: 1,
    suffix: "K",
    label: { en: "Developers following", "pt-br": "Devs acompanhando" },
    detail: {
      en: "On Instagram, where I make programming simpler in Portuguese",
      "pt-br": "No Instagram, onde simplifico programação em português",
    },
  },
  {
    id: "conversions",
    value: 40,
    suffix: "%",
    label: { en: "More conversions", "pt-br": "Mais conversões" },
    detail: {
      en: "From an SSR refactor that also made the blog 80% faster",
      "pt-br": "De um refactor SSR que também deixou o blog 80% mais rápido",
    },
  },
] as const;
