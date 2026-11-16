import { experience } from "@/data/experience";
import type { Project } from "@/data/projects";
import { socials } from "@/data/socials";
import { bcp47, type Locale } from "@/i18n/config";
import type { Messages } from "@/messages/en";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

/**
 * schema.org descriptions of the site, for search engines and for the AI
 * tools that increasingly answer "who is this person?" before anyone clicks.
 *
 * Built from the same data the pages render — the résumé, the socials, the
 * project records — so the structured version cannot drift from the visible
 * one. The `Person` has a stable `@id`, and every other node points at it
 * instead of repeating it.
 */

const absolute = (path: string) => new URL(path, site.url).toString();

export const personId = absolute("/#person");
const websiteId = absolute("/#website");

export function person(locale: Locale, messages: Messages) {
  const current = experience.find((role) => !role.end && !role.confidential);

  return {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    alternateName: site.legalName,
    url: absolute(routes.home(locale)),
    jobTitle: messages.resume.role,
    description: messages.meta.description,
    ...(current
      ? { worksFor: { "@type": "Organization", name: current.company } }
      : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Varginha",
      addressRegion: "MG",
      addressCountry: "BR",
    },
    knowsLanguage: ["pt-BR", "en"],
    knowsAbout: [
      "Frontend engineering",
      "React",
      "TypeScript",
      "Micro-frontends",
      "Module Federation",
      "Design systems",
      "Web Components",
      "Web performance",
    ],
    sameAs: socials.filter((social) => social.sameAs).map((s) => s.href),
  };
}

function website(locale: Locale, messages: Messages) {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    description: messages.meta.description,
    inLanguage: bcp47[locale],
    author: { "@id": personId },
  };
}

/** Home: the site, and the person it is about. */
export function homeGraph(locale: Locale, messages: Messages) {
  return {
    "@context": "https://schema.org",
    "@graph": [website(locale, messages), person(locale, messages)],
  };
}

/** About: a profile page, which is what Google expects for a person. */
export function profileGraph(locale: Locale, messages: Messages) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        url: absolute(routes.about(locale)),
        name: messages.aboutPage.title,
        inLanguage: bcp47[locale],
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      person(locale, messages),
    ],
  };
}

/** A case study: an article, written by the person, about one project. */
export function caseStudyGraph(project: Project, locale: Locale) {
  const url = absolute(routes.caseStudy(locale, project.slug));

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: url,
    headline: project.title[locale],
    description: project.outcome[locale],
    abstract: project.summary[locale],
    inLanguage: bcp47[locale],
    image: absolute(
      `${routes.caseStudy(locale, project.slug)}/opengraph-image/card`,
    ),
    author: { "@id": personId, "@type": "Person", name: site.name },
    isPartOf: { "@id": websiteId },
    keywords: project.stack.join(", "),
  };
}
