import type { Localized, YearMonth } from "./types";

export type Role = {
  id: string;
  company: string;
  /** Set when the company should not be named in public writing. */
  confidential?: boolean;
  title: Localized;
  start: YearMonth;
  /** Omitted while the role is current. */
  end?: YearMonth;
  location: Localized;
  /** The one line that would survive if everything else were cut. */
  summary: Localized;
  /** Outcome first, mechanism second. Three to five per role. */
  highlights: Localized<readonly string[]>;
  stack: readonly string[];
};

/**
 * The résumé, as data.
 *
 * The home page timeline, `/resume`, the PDF and the JSON-LD `Person` schema
 * all read from here. That is the whole point: a job title can only be wrong
 * in one place.
 *
 * Ordered most recent first, which is the order every surface renders.
 */
export const experience: readonly Role[] = [
  {
    id: "bentley",
    company: "Bentley Systems",
    title: {
      en: "Senior Software Engineer",
      "pt-br": "Engenheiro de Software Sênior",
    },
    start: "2023-03",
    location: { en: "Remote", "pt-br": "Remoto" },
    summary: {
      en: "Modernised an enterprise digital-twin platform and the architecture the teams around it build on.",
      "pt-br":
        "Modernizei uma plataforma corporativa de gêmeos digitais e a arquitetura em que os times ao redor dela constroem.",
    },
    highlights: {
      en: [
        "Cut page performance cost by 60% by migrating to React 18 with Zustand and React Query, replacing a Redux store that re-rendered far more than it needed to.",
        "Replaced iframe integrations with six independently deployable micro-frontends on Module Federation, so teams ship without coordinating releases.",
        "Built the reusable Azure DevOps pipeline to Azure CDN that became the company-wide reference for frontend delivery.",
        "Established the testing pyramid — Jest and React Testing Library under Cypress and Playwright — and the practices that keep it honest.",
        "Led the iTwin4Good Challenge mentoring, with student teams winning national and worldwide Enactus competitions three years running.",
      ],
      "pt-br": [
        "Reduzi em 60% o custo de performance das páginas migrando para React 18 com Zustand e React Query, no lugar de uma store Redux que renderizava muito mais do que precisava.",
        "Substituí integrações por iframe por seis micro-frontends com deploy independente usando Module Federation, para que os times publiquem sem coordenar releases.",
        "Construí o pipeline reutilizável de Azure DevOps para Azure CDN que se tornou a referência de entrega de frontend na empresa.",
        "Estabeleci a pirâmide de testes — Jest e React Testing Library sob Cypress e Playwright — e as práticas que a mantêm honesta.",
        "Liderei a mentoria do iTwin4Good Challenge, com times de estudantes vencendo competições nacionais e mundiais da Enactus por três anos consecutivos.",
      ],
    },
    stack: [
      "React 18",
      "TypeScript",
      "Zustand",
      "React Query",
      "Module Federation",
      "Azure DevOps",
      "Playwright",
    ],
  },
  {
    id: "sydle-2",
    company: "SYDLE",
    title: {
      en: "Software Engineer II",
      "pt-br": "Engenheiro de Software II",
    },
    start: "2022-06",
    end: "2023-03",
    location: { en: "Remote", "pt-br": "Remoto" },
    summary: {
      en: "Built the design system that a platform of 100k+ users is assembled from.",
      "pt-br":
        "Construí o design system do qual uma plataforma de mais de 100 mil usuários é montada.",
    },
    highlights: {
      en: [
        "Shipped a company-wide design system of 100+ components in StencilJS and Web Components, cutting application development time by 30%.",
        "Framework-agnostic by construction, so the same components served products on different stacks without a rewrite.",
        "Delivered a BPMN marketplace used by a platform with more than 100,000 users.",
        "Refactored the blog to server-side rendering: 80% faster, and 40% more sales conversions.",
        "Migrated legacy JavaScript codebases to TypeScript incrementally, without freezing feature work.",
      ],
      "pt-br": [
        "Entreguei um design system corporativo com mais de 100 componentes em StencilJS e Web Components, reduzindo em 30% o tempo de desenvolvimento das aplicações.",
        "Agnóstico de framework por construção, então os mesmos componentes atenderam produtos em stacks diferentes sem reescrita.",
        "Entreguei um marketplace de BPMN usado por uma plataforma com mais de 100 mil usuários.",
        "Refatorei o blog para renderização no servidor: 80% mais rápido e 40% mais conversões de vendas.",
        "Migrei bases legadas de JavaScript para TypeScript de forma incremental, sem congelar o desenvolvimento de features.",
      ],
    },
    stack: [
      "StencilJS",
      "Web Components",
      "TypeScript",
      "SSR",
      "Design Systems",
    ],
  },
  {
    id: "sydle-1",
    company: "SYDLE",
    title: { en: "Software Engineer", "pt-br": "Engenheiro de Software" },
    start: "2021-05",
    end: "2022-05",
    location: { en: "Remote", "pt-br": "Remoto" },
    summary: {
      en: "Built a visual BPMN process editor and took the product multilingual.",
      "pt-br":
        "Construí um editor visual de processos BPMN e tornei o produto multilíngue.",
    },
    highlights: {
      en: [
        "Built a BPMN editor with drag-and-drop modelling and export to XML and JPG.",
        "Internationalised the product with i18next, covering UI copy and locale-aware formatting.",
        "Set up Jenkins CI/CD so releases stopped being a manual ritual.",
      ],
      "pt-br": [
        "Construí um editor BPMN com modelagem por arrastar e soltar e exportação para XML e JPG.",
        "Internacionalizei o produto com i18next, cobrindo textos de interface e formatação por idioma.",
        "Configurei CI/CD com Jenkins para que releases deixassem de ser um ritual manual.",
      ],
    },
    stack: ["JavaScript", "BPMN", "i18next", "Jenkins"],
  },
  {
    id: "youx",
    company: "YouX Group",
    title: { en: "Software Engineer", "pt-br": "Engenheiro de Software" },
    start: "2021-01",
    end: "2021-04",
    location: { en: "Remote", "pt-br": "Remoto" },
    summary: {
      en: "Delivered a time-tracking platform used by 200+ employees.",
      "pt-br":
        "Entreguei uma plataforma de controle de horas usada por mais de 200 funcionários.",
    },
    highlights: {
      en: [
        "Built a time-tracking platform for 200+ employees in React and Spring Boot.",
        "Added SonarQube and GitLab CI to the pipeline, making code quality a gate rather than an opinion.",
      ],
      "pt-br": [
        "Construí uma plataforma de controle de horas para mais de 200 funcionários em React e Spring Boot.",
        "Adicionei SonarQube e GitLab CI ao pipeline, transformando qualidade de código em critério, não em opinião.",
      ],
    },
    stack: ["React", "Spring Boot", "SonarQube", "GitLab CI"],
  },
  {
    id: "emakers",
    company: "Emakers Jr",
    title: { en: "Software Engineer", "pt-br": "Engenheiro de Software" },
    start: "2019-03",
    end: "2022-01",
    location: { en: "Lavras, Brazil", "pt-br": "Lavras, Brasil" },
    summary: {
      en: "Shipped real products for real clients at the university's junior enterprise.",
      "pt-br":
        "Entreguei produtos reais para clientes reais na empresa júnior da universidade.",
    },
    highlights: {
      en: [
        "Built a grammar-correction platform that reached more than 10,000 users.",
        "Built a courier delivery app with real-time tracking over WebSockets.",
      ],
      "pt-br": [
        "Construí uma plataforma de correção gramatical que alcançou mais de 10 mil usuários.",
        "Construí um aplicativo de entregas com rastreamento em tempo real via WebSockets.",
      ],
    },
    stack: ["React", "Node.js", "WebSockets", "Django REST Framework"],
  },
] as const;

export type Education = {
  institution: string;
  degree: Localized;
  start: YearMonth;
  end: YearMonth;
  detail: Localized;
};

export const education: readonly Education[] = [
  {
    institution: "Federal University of Lavras (UFLA)",
    degree: {
      en: "BSc Computer Science",
      "pt-br": "Bacharelado em Ciência da Computação",
    },
    start: "2018-02",
    end: "2022-06",
    detail: { en: "GPA 92/100", "pt-br": "Média 92/100" },
  },
] as const;

/** Years of professional experience, counted from the first role. */
export function yearsOfExperience(now: Date): number {
  const first = experience[experience.length - 1];
  const [year, month] = first.start.split("-").map(Number);
  const months =
    (now.getUTCFullYear() - year) * 12 + (now.getUTCMonth() + 1 - month);
  return Math.floor(months / 12);
}
