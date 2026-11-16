import type { Localized, YearMonth } from "./types";

export type ProjectMetric = {
  value: string;
  label: Localized;
};

export type Project = {
  slug: string;
  /** Short name, for cards and the command palette. */
  title: Localized;
  /** The result, in one line. This is the part a recruiter reads. */
  outcome: Localized;
  /** Two or three sentences of context. */
  summary: Localized;
  /**
   * The case study's TL;DR box: three bullets for the reader who will not
   * scroll. Each states a fact already established elsewhere in this file or
   * the CV — the box summarises, it does not introduce new claims.
   */
  tldr: readonly Localized[];
  role: Localized;
  start: YearMonth;
  end?: YearMonth;
  stack: readonly string[];
  /** One or two headline figures, already formatted. */
  metrics: readonly ProjectMetric[];
  /**
   * Which abstract diagram the card renders. These are drawn from scratch —
   * no proprietary screenshots, per the Bentley and SYDLE constraints.
   */
  motif: "federation" | "migration" | "components";
  /** Public repository, if there is one. */
  repo?: string;
  live?: string;
  /** True when the client cannot be named or the code shown. */
  confidential?: boolean;
  /** Ordering on the home page. Lower comes first. */
  rank: number;
};

export const projects: readonly Project[] = [
  {
    slug: "developer-experience-platform",
    title: {
      en: "Developer Experience Platform",
      "pt-br": "Plataforma de Experiência do Desenvolvedor",
    },
    outcome: {
      en: "A micro-frontend platform where teams ship on their own schedule.",
      "pt-br":
        "Uma plataforma de micro-frontends em que cada time publica no seu próprio ritmo.",
    },
    summary: {
      en: "A runtime-composed platform: a Webpack 5 host shell loading Rsbuild remotes through a typed federation contract, with registry-driven routing, RBAC, error isolation per remote and shared design tokens. Built to answer the question a shared frontend always runs into — how do five teams deploy independently without breaking each other?",
      "pt-br":
        "Uma plataforma composta em tempo de execução: um shell host em Webpack 5 carregando remotes Rsbuild por um contrato de federação tipado, com roteamento orientado a registro, RBAC, isolamento de erros por remote e design tokens compartilhados. Construída para responder à pergunta que todo frontend compartilhado encontra — como cinco times fazem deploy de forma independente sem quebrar uns aos outros?",
    },
    tldr: [
      {
        en: "A Webpack 5 host shell composes Rsbuild remotes at runtime, so a team deploys its remote without redeploying anyone else.",
        "pt-br":
          "Um shell host em Webpack 5 compõe remotes Rsbuild em tempo de execução, então um time faz deploy do seu remote sem redeploy de ninguém.",
      },
      {
        en: "A typed federation contract turns a breaking change between host and remote into a compile error instead of a production incident.",
        "pt-br":
          "Um contrato de federação tipado transforma uma mudança incompatível entre host e remote em erro de compilação, não em incidente em produção.",
      },
      {
        en: "Registry-driven routing, RBAC and per-remote error boundaries are platform concerns, solved once instead of by every team.",
        "pt-br":
          "Roteamento orientado a registro, RBAC e error boundaries por remote são responsabilidades da plataforma, resolvidas uma vez e não por cada time.",
      },
    ],
    role: {
      en: "Architecture and implementation",
      "pt-br": "Arquitetura e implementação",
    },
    start: "2025-01",
    stack: [
      "Module Federation",
      "Webpack 5",
      "Rsbuild",
      "TypeScript",
      "Turborepo",
      "React",
    ],
    metrics: [
      {
        value: "5",
        label: { en: "Independent remotes", "pt-br": "Remotes independentes" },
      },
      {
        value: "0",
        label: {
          en: "Cross-team deploy coordination",
          "pt-br": "Coordenação de deploy entre times",
        },
      },
    ],
    motif: "federation",
    repo: "https://github.com/lima300/developer-experience-platform",
    rank: 1,
  },
  {
    slug: "digital-twin-modernisation",
    title: {
      en: "Modernising an enterprise digital-twin platform",
      "pt-br": "Modernizando uma plataforma corporativa de gêmeos digitais",
    },
    outcome: {
      en: "60% faster, and the architecture became the company's reference.",
      "pt-br":
        "60% mais rápido, e a arquitetura virou a referência da empresa.",
    },
    summary: {
      en: "A large React application had outgrown its Redux store and its iframe integrations. I migrated it to React 18 with Zustand and React Query, replaced the iframes with six independently deployable micro-frontends on Module Federation, and built the Azure DevOps pipeline that delivers them to Azure CDN. That pipeline is now the company-wide reference for frontend delivery.",
      "pt-br":
        "Uma aplicação React grande havia superado sua store Redux e suas integrações por iframe. Migrei para React 18 com Zustand e React Query, substituí os iframes por seis micro-frontends com deploy independente usando Module Federation, e construí o pipeline de Azure DevOps que os entrega ao Azure CDN. Esse pipeline é hoje a referência de entrega de frontend em toda a empresa.",
    },
    tldr: [
      {
        en: "Migrated a large React application from a Redux store to React 18 with Zustand and React Query, cutting page performance cost by 60%.",
        "pt-br":
          "Migrei uma aplicação React grande de uma store Redux para React 18 com Zustand e React Query, reduzindo em 60% o custo de performance das páginas.",
      },
      {
        en: "Replaced iframe integrations with six independently deployable micro-frontends on Module Federation.",
        "pt-br":
          "Substituí integrações por iframe por seis micro-frontends com deploy independente usando Module Federation.",
      },
      {
        en: "Built the Azure DevOps pipeline to Azure CDN that became the company-wide reference for frontend delivery.",
        "pt-br":
          "Construí o pipeline de Azure DevOps para Azure CDN que virou a referência de entrega de frontend da empresa.",
      },
    ],
    role: {
      en: "Senior Software Engineer, Bentley Systems",
      "pt-br": "Engenheiro de Software Sênior, Bentley Systems",
    },
    start: "2023-03",
    stack: [
      "React 18",
      "Zustand",
      "React Query",
      "Module Federation",
      "Azure DevOps",
      "Playwright",
    ],
    metrics: [
      {
        value: "60%",
        label: { en: "Faster", "pt-br": "Mais rápido" },
      },
      {
        value: "6",
        label: {
          en: "Micro-frontends replacing iframes",
          "pt-br": "Micro-frontends no lugar de iframes",
        },
      },
    ],
    motif: "migration",
    confidential: true,
    rank: 2,
  },
  {
    slug: "design-system-at-scale",
    title: {
      en: "A design system for 100,000+ users",
      "pt-br": "Um design system para mais de 100 mil usuários",
    },
    outcome: {
      en: "100+ components, 30% less development time, one source of truth.",
      "pt-br":
        "Mais de 100 componentes, 30% menos tempo de desenvolvimento, uma fonte da verdade.",
    },
    summary: {
      en: "Products on different stacks were each rebuilding the same inputs, tables and dialogs. I built the company's design system in StencilJS and Web Components — framework-agnostic by construction, so one implementation served every product. It cut application development time by 30% and underpinned a BPMN marketplace serving more than 100,000 users.",
      "pt-br":
        "Produtos em stacks diferentes reconstruíam, cada um, os mesmos inputs, tabelas e diálogos. Construí o design system da empresa em StencilJS e Web Components — agnóstico de framework por construção, então uma implementação atendia todos os produtos. Reduziu em 30% o tempo de desenvolvimento e sustentou um marketplace BPMN que serve mais de 100 mil usuários.",
    },
    tldr: [
      {
        en: "Built a design system of 100+ components in StencilJS and Web Components, so one implementation served products on different stacks.",
        "pt-br":
          "Construí um design system com mais de 100 componentes em StencilJS e Web Components, então uma implementação atendeu produtos em stacks diferentes.",
      },
      {
        en: "Cut application development time by 30%, and underpinned a BPMN marketplace on a platform with 100,000+ users.",
        "pt-br":
          "Reduzi em 30% o tempo de desenvolvimento das aplicações e sustentei um marketplace BPMN numa plataforma com mais de 100 mil usuários.",
      },
      {
        en: "Refactored the blog to server-side rendering: 80% faster, and 40% more sales conversions.",
        "pt-br":
          "Refatorei o blog para renderização no servidor: 80% mais rápido e 40% mais conversões de vendas.",
      },
    ],
    role: {
      en: "Software Engineer II, SYDLE",
      "pt-br": "Engenheiro de Software II, SYDLE",
    },
    start: "2022-06",
    end: "2023-03",
    stack: [
      "StencilJS",
      "Web Components",
      "TypeScript",
      "Design Tokens",
      "SSR",
    ],
    metrics: [
      {
        value: "100+",
        label: { en: "Components shipped", "pt-br": "Componentes entregues" },
      },
      {
        value: "30%",
        label: {
          en: "Less development time",
          "pt-br": "Menos tempo de desenvolvimento",
        },
      },
    ],
    motif: "components",
    confidential: true,
    rank: 3,
  },
] as const;

/** Home-page order. */
export const featuredProjects = [...projects].sort((a, b) => a.rank - b.rank);

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export type LabProject = {
  slug: string;
  title: string;
  outcome: Localized;
  /**
   * Three things worth knowing, each taken from the project's own README —
   * the lab card summarises the repository, it does not embellish it.
   */
  highlights: readonly Localized[];
  stack: readonly string[];
  repo: string;
  /** No deployments yet; the card links the code alone until there is one. */
  live?: string;
  /**
   * The live URL can be framed, so the card offers to run it in place.
   * Inert until `live` is set: there is nothing to embed before a deploy.
   */
  embed?: boolean;
};

/**
 * Side projects. Smaller surface than the case studies, so they live on their
 * own page rather than competing with the work above.
 */
export const labProjects: readonly LabProject[] = [
  {
    slug: "zenos-paradox",
    title: "Zeno's Paradox",
    outcome: {
      en: "Achilles and the tortoise, animated to the actual mathematics.",
      "pt-br":
        "Aquiles e a tartaruga, animados conforme a matemática de verdade.",
    },
    highlights: [
      {
        en: "Positions come from the real series, so the animation shows exactly when and where an infinite sequence of gaps closes in finite time.",
        "pt-br":
          "As posições vêm da série de verdade, então a animação mostra exatamente quando e onde uma sequência infinita de distâncias se fecha em tempo finito.",
      },
      {
        en: "Play, pause, step through each interval, or change the speeds and the head start and watch the meeting point move.",
        "pt-br":
          "Dá para tocar, pausar, avançar intervalo por intervalo, ou mudar as velocidades e a vantagem inicial e ver o ponto de encontro se mover.",
      },
      {
        en: "The mathematics lives in pure functions, apart from the components and the animation loop that draw it.",
        "pt-br":
          "A matemática vive em funções puras, separada dos componentes e do loop de animação que a desenham.",
      },
    ],
    stack: ["React", "TypeScript", "Vite", "Framer Motion"],
    repo: "https://github.com/lima300/achilles-torroise-paradox",
    // TODO(otavio): set `live` to the Vercel URL once deployed; the card
    // then grows a "Run the live demo" frame on its own.
    embed: true,
  },
  {
    slug: "barber-time",
    title: "Barber Time",
    outcome: {
      en: "A booking app built on the App Router, with server-side everything.",
      "pt-br":
        "Um app de agendamentos no App Router, com tudo no lado do servidor.",
    },
    highlights: [
      {
        en: "Server Components read straight from PostgreSQL through Prisma, with no REST layer in between for reads.",
        "pt-br":
          "Server Components leem direto do PostgreSQL via Prisma, sem uma camada REST no meio para as leituras.",
      },
      {
        en: "Google sign-in through NextAuth, with sessions persisted in the database so they survive a deploy.",
        "pt-br":
          "Login com Google via NextAuth, com sessões persistidas no banco para sobreviverem a um deploy.",
      },
      {
        en: "A mobile-first booking flow: search, a service sheet, a date picker and a 30-minute slot grid.",
        "pt-br":
          "Um fluxo de agendamento pensado para o celular: busca, detalhes do serviço, seletor de data e uma grade de horários de 30 minutos.",
      },
    ],
    stack: [
      "Next.js",
      "React Server Components",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "Zod",
    ],
    repo: "https://github.com/lima300/barber-time",
  },
] as const;
