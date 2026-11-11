import type { Messages } from "./en";

/**
 * Adapted, not translated: the PT version leans a little more into the
 * creator voice, since that audience arrives from Instagram.
 */
const ptBr: Messages = {
  meta: {
    title: "Otávio Lima — Engenheiro de Software Frontend Sênior",
    titleTemplate: "%s — Otávio Lima",
    description:
      "Engenheiro de Software Frontend Sênior. Construo plataformas web rápidas e escaláveis: micro-frontends, design systems e a experiência de desenvolvimento por trás delas.",
  },
  a11y: {
    skipToContent: "Ir para o conteúdo",
    themeToggle: "Alterar o tema de cores",
    languageSwitch: "Alterar o idioma",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    primaryNavigation: "Principal",
    socialLinks: "Em outros lugares",
    verified: "Conta verificada",
    homeLink: "Otávio Lima — início",
  },
  theme: {
    system: "Sistema",
    light: "Claro",
    dark: "Escuro",
  },
  nav: {
    work: "Projetos",
    about: "Sobre",
    content: "Conteúdo",
    resume: "Currículo",
  },
  hero: {
    availability: "Aberto a vagas Sênior/Staff de Frontend",
    headline: "Frontend que escala. Interfaces que parecem simples.",
    subline:
      "Engenheiro Frontend Sênior, {years}+ anos. Construo micro-frontends, design systems e a experiência de desenvolvimento por trás deles. Remoto do Brasil (GMT-3), com um dia de trabalho que cruza com o horário dos EUA.",
    viewWork: "Ver projetos",
    resume: "Currículo",
    copyEmail: "Copiar e-mail",
  },
  impact: {
    eyebrow: "Em números",
    heading: "O que esse trabalho de fato mudou.",
  },
  work: {
    eyebrow: "Projetos selecionados",
    heading: "Plataformas que seguiram rápidas enquanto cresciam.",
    description:
      "Três sistemas, cada um respondendo à mesma pergunta que todo frontend compartilhado encontra: como vários times publicam de forma independente sem quebrar uns aos outros?",
    caseStudy: "Estudo de caso",
    viewLive: "Ver online",
    viewCode: "Código",
    confidential: "Trabalho de cliente — código e telas não divulgados",
    role: "Função",
    moreInLab: "Projetos pessoais no lab",
  },
  caseStudy: {
    backToWork: "Todos os projetos",
    tldr: "Resumo",
    keyFigures: "Números-chave",
    period: "Período",
    role: "Papel",
    stack: "Stack",
    next: "Próximo case",
    over: "em vez de",
  },
  experience: {
    eyebrow: "Experiência",
    heading:
      "{years}+ anos, a maior parte deles deixando frontends grandes menores.",
    present: "Atual",
    education: "Formação",
    highlights: "Destaques",
  },
  skills: {
    eyebrow: "Capacidades",
    heading: "O que eu uso, e para quê.",
    description:
      "Agrupado pelo problema, não pelo logo. Sem barras de proficiência: um 80% autoatribuído não é informação.",
  },
  content: {
    eyebrow: "Conteúdo & comunidade",
    heading: "Eu explico esse trabalho para 30 mil devs.",
    description:
      "Ensinar a mesma arquitetura que eu entrego me deixou melhor nas duas coisas. Explicar um trade-off para quem está aprendendo é a forma mais rápida de descobrir se você realmente entende.",
    followLabel: "Seguir no Instagram",
    mentoringEyebrow: "Mentoria",
    themesEyebrow: "Sobre o que é",
    postsEyebrow: "Favoritos",
    viewPost: "Ver no Instagram",
    postKinds: { reel: "Reel", carousel: "Carrossel", post: "Post" },
  },
  testimonials: {
    eyebrow: "Referências",
    heading: "O que dizem as pessoas com quem trabalhei.",
  },
  about: {
    eyebrow: "Sobre",
    heading: "A versão curta e humana.",
    readMore: "Mais sobre mim",
    factsEyebrow: "Os detalhes práticos",
  },
  contact: {
    eyebrow: "Contato",
    heading: "Vamos construir algo que dure.",
    body: "Estou aberto a vagas Sênior e Staff de frontend, remoto, trabalhando com times dos EUA e globais. O caminho mais rápido é o e-mail — um clique copia.",
    emailCopied: "E-mail copiado",
    emailCopyFailed:
      "Não foi possível copiar — o endereço é otavio.lima.vga@gmail.com",
    copyEmail: "Copiar e-mail",
    copied: "Copiado",
  },
  localTime: {
    label: "São {time} aqui no Brasil",
    morning: "provavelmente no primeiro café ☕",
    afternoon: "provavelmente no meio de um refactor",
    evening: "provavelmente gravando algo 🎥",
    night: "provavelmente dormindo — respondo de manhã",
  },
  resume: {
    title: "Currículo",
    role: "Engenheiro Frontend Sênior",
    description:
      "Currículo de Otávio Lima: Engenheiro Frontend Sênior, micro-frontends e design systems. Pronto para imprimir e sempre atualizado.",
    print: "Imprimir ou salvar em PDF",
    summary: "Resumo",
    experience: "Experiência",
    skills: "Habilidades",
    education: "Formação",
    languages: "Idiomas",
  },
  aboutPage: {
    title: "Sobre",
    description:
      "Quem é Otávio Lima, como ele trabalha e os detalhes práticos: localização, horário de trabalho, idiomas.",
    heading: "Engenheiro, professor, corredor. Mais ou menos nessa ordem.",
    mentoringEyebrow: "Retribuindo",
    nextEyebrow: "Próximo passo",
    nextHeading: "O trabalho é a melhor apresentação.",
    seeWork: "Ver os projetos",
    readResume: "Ler o currículo",
  },
  colophon: {
    title: "Colofão",
    description:
      "Como este site é construído: a stack, as decisões por trás dela e os orçamentos que ele precisa respeitar.",
    eyebrow: "Colofão",
    heading: "Como este site é construído.",
  },
  lab: {
    title: "Lab",
    description:
      "Projetos pessoais e experimentos de Otávio Lima: menores que os cases, e todos open source.",
    eyebrow: "Lab",
    heading: "Coisas menores, feitas para aprender algo.",
    intro:
      "Projetos fora do trabalho. Cada um existe para testar uma ideia direito — um modelo de framework, um pedaço de matemática — e todos são open source.",
  },
  footer: {
    builtWith: "Feito com Next.js, TypeScript e Tailwind CSS.",
    sourceOnGithub: "Código no GitHub",
    colophon: "Como este site foi construído",
    rights: "Todos os direitos reservados.",
  },
};

export default ptBr;
