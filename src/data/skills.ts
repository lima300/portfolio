import type { Localized } from "./types";

export type SkillGroup = {
  id: string;
  title: Localized;
  /** What he *does* with these, not just that he knows them. */
  statement: Localized;
  items: readonly string[];
};

/**
 * Grouped by what the tools are for, and each group leads with a sentence
 * rather than a logo wall. A list of names tells a reader you have heard of
 * something; a sentence tells them what you did with it.
 *
 * Deliberately no proficiency bars: a self-assigned 80% is not information.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    id: "core",
    title: { en: "Core", "pt-br": "Base" },
    statement: {
      en: "Where I spend most days: typed React applications that stay fast as the codebase grows.",
      "pt-br":
        "Onde passo a maior parte dos dias: aplicações React tipadas que seguem rápidas conforme a base cresce.",
    },
    items: ["React 18", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    id: "state",
    title: { en: "State & data", "pt-br": "Estado & dados" },
    statement: {
      en: "Choosing the smallest tool that fits. Swapping Redux for Zustand and React Query is where most of that 60% came from.",
      "pt-br":
        "Escolher a menor ferramenta que resolve. Trocar Redux por Zustand e React Query é de onde vem a maior parte daqueles 60%.",
    },
    items: ["Zustand", "React Query", "Redux", "GraphQL", "REST", "WebSockets"],
  },
  {
    id: "architecture",
    title: { en: "Architecture", "pt-br": "Arquitetura" },
    statement: {
      en: "Splitting systems so teams can ship without coordinating. Six micro-frontends, one typed federation contract.",
      "pt-br":
        "Dividir sistemas para que times publiquem sem se coordenar. Seis micro-frontends, um contrato de federação tipado.",
    },
    items: [
      "Micro-frontends",
      "Module Federation",
      "Design Systems",
      "Web Components",
      "SSR",
      "Turborepo",
    ],
  },
  {
    id: "testing",
    title: { en: "Testing", "pt-br": "Testes" },
    statement: {
      en: "A pyramid that people actually trust: fast unit tests underneath, a thin layer of end-to-end on top.",
      "pt-br":
        "Uma pirâmide em que as pessoas realmente confiam: testes unitários rápidos embaixo, uma camada fina de ponta a ponta no topo.",
    },
    items: ["Jest", "React Testing Library", "Playwright", "Cypress", "Vitest"],
  },
  {
    id: "devops",
    title: { en: "DevOps & cloud", "pt-br": "DevOps & cloud" },
    statement: {
      en: "Owning delivery, not just the code. The Azure pipeline I built became the company's reference for frontend deploys.",
      "pt-br":
        "Ser responsável pela entrega, não só pelo código. O pipeline Azure que construí tornou-se a referência da empresa para deploys de frontend.",
    },
    items: [
      "Azure DevOps",
      "Azure CDN",
      "GitHub Actions",
      "GitLab CI",
      "Jenkins",
      "Nginx",
      "AWS",
    ],
  },
  {
    id: "adjacent",
    title: { en: "Also comfortable with", "pt-br": "Também à vontade com" },
    statement: {
      en: "Enough backend to design a sensible API contract and argue about it productively.",
      "pt-br":
        "Backend o suficiente para desenhar um contrato de API sensato e discutir sobre ele de forma produtiva.",
    },
    items: [
      "Node.js",
      "Django REST Framework",
      "Spring Boot",
      "PostgreSQL",
      "Prisma",
      "SonarQube",
    ],
  },
] as const;
