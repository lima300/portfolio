import type { Localized } from "./types";

export type Testimonial = {
  id: string;
  /**
   * The quote, without surrounding quotation marks — the component adds
   * typographic ones.
   *
   * Recommendations arrive in whatever language they were written in. Put the
   * original under its own locale and a faithful translation under the other,
   * rather than leaving a reader with a quote they cannot read.
   */
  quote: Localized;
  /** Attribution. A quote without a name is not a testimonial. */
  name: string;
  role: Localized;
  company: string;
  /** How they know the work: "Manager at Bentley Systems", "Mentee". */
  relationship: Localized;
  /** Link to the original, if it is public. */
  source?: string;
};

/**
 * Colleague recommendations, from LinkedIn (December and September 2025).
 *
 * The English is the original, quoted verbatim; the Portuguese is a faithful
 * translation. Paragraphs are separated by a blank line (`\n\n`).
 */
export const testimonials: readonly Testimonial[] = [
  {
    id: "ivan-gasparetto",
    name: "Ivan Gasparetto Filho",
    role: {
      en: "Director of Software Development",
      "pt-br": "Diretor de Desenvolvimento de Software",
    },
    company: "Bentley Systems",
    relationship: {
      en: "Managed me directly",
      "pt-br": "Meu gestor direto",
    },
    quote: {
      en: "I worked with Otavio at Bentley Systems and saw first-hand how strong and dependable he is as a React.js engineer. He consistently delivered high-quality work, showed real ownership of his responsibilities, and could be trusted with complex features.\n\nBeyond his day-to-day role, Otavio was one of the very few engineers who actively supported students participating in the iTwin4Good challenge, giving his time and expertise without being asked. That says a lot about his character.\n\nHe’s a true professional: technically solid, reliable, and respectful. I would happily work with him again and recommend him without hesitation.",
      "pt-br":
        "Trabalhei com o Otávio na Bentley Systems e vi de perto o quanto ele é forte e confiável como engenheiro React.js. Ele entregava trabalho de alta qualidade de forma consistente, assumia de verdade suas responsabilidades e era alguém a quem se podia confiar funcionalidades complexas.\n\nAlém do dia a dia, o Otávio foi um dos pouquíssimos engenheiros que apoiaram ativamente os estudantes do desafio iTwin4Good, dedicando seu tempo e conhecimento sem que ninguém pedisse. Isso diz muito sobre o caráter dele.\n\nEle é um verdadeiro profissional: tecnicamente sólido, confiável e respeitoso. Eu trabalharia com ele de novo com prazer e o recomendo sem hesitar.",
    },
  },
  {
    id: "gesebel-medeiros",
    name: "Gesebel Medeiros",
    role: { en: "Program Manager", "pt-br": "Gerente de Programa" },
    company: "Bentley Systems",
    relationship: {
      en: "Worked with me across multiple projects",
      "pt-br": "Trabalhou comigo em vários projetos",
    },
    quote: {
      en: "I had the pleasure of working with Otávio on multiple projects and can confidently say he is an excellent professional. He is highly focused, solution-oriented, and consistently tackles complex technical challenges with clarity and efficiency. Otávio collaborates extremely well with cross-functional teams and communicates technical concepts clearly and effectively. He is supportive, approachable, and a true team player. Any engineering team would be fortunate to have him. I highly recommend Otávio.",
      "pt-br":
        "Tive o prazer de trabalhar com o Otávio em vários projetos e posso dizer com segurança que ele é um excelente profissional. É muito focado, orientado a soluções e enfrenta desafios técnicos complexos com clareza e eficiência, de forma consistente. O Otávio colabora muito bem com times multidisciplinares e comunica conceitos técnicos de forma clara e eficaz. É prestativo, acessível e joga de verdade em equipe. Qualquer time de engenharia teria sorte de tê-lo. Recomendo muito o Otávio.",
    },
  },
  {
    id: "leonardo-portes",
    name: "Leonardo Portes",
    role: { en: "Frontend Engineer", "pt-br": "Engenheiro Frontend" },
    company: "Bentley Systems",
    relationship: {
      en: "Teammate on the frontend team",
      "pt-br": "Colega no time de frontend",
    },
    quote: {
      en: "I had the pleasure of working with Otávio for quite a while on the frontend team — both on projects we built side by side and on separate ones that were part of a bigger product. He's super committed, has solid technical skills, and is always learning and staying ahead of the curve.\n\nHe's one of those people you naturally turn to when you need a second opinion or want to sanity check an idea — especially when it comes to React. A solid dev, great to work with, and someone I’d definitely team up with again.",
      "pt-br":
        "Tive o prazer de trabalhar com o Otávio por um bom tempo no time de frontend — tanto em projetos que construímos lado a lado quanto em outros separados, que faziam parte de um produto maior. Ele é super comprometido, tem habilidades técnicas sólidas e está sempre aprendendo e à frente da curva.\n\nÉ uma daquelas pessoas a quem você recorre naturalmente quando precisa de uma segunda opinião ou quer validar uma ideia — principalmente quando o assunto é React. Um dev sólido, ótimo de trabalhar junto, e alguém com quem eu com certeza formaria time de novo.",
    },
  },
] as const;

export const hasTestimonials = testimonials.length > 0;
