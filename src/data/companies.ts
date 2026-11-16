import { featuredProjects, type Project } from "./projects";
import type { Localized } from "./types";

/**
 * Tailored company pages, `/[locale]/for/[slug]`.
 *
 * Unlisted: `noindex`, out of the sitemap, linked from nowhere. Each one is a
 * URL sent by hand alongside an application, so it can open with that
 * company's name, put the most relevant work first and carry a short note on
 * why this company — the part a generic portfolio cannot say.
 *
 * Facts here, prose in `src/content/companies/{locale}/{slug}.mdx`, the same
 * split as the case studies (docs/adr/0005-mdx-prose-typed-facts.md). Adding
 * a company is one entry here and one MDX file per locale.
 */
export type Company = {
  /** The URL segment. Lowercase, so `/for/acme` reads naturally in an email. */
  slug: string;
  /** As the company writes it. */
  name: string;
  /** The role this page goes with. */
  role: Localized;
  /**
   * Case-study slugs, most relevant first. Any left out follow in their
   * home-page order, so a page never hides work — it only reorders it.
   */
  projectOrder: readonly string[];
  /**
   * Placeholder copy. The page shows a banner until this is removed, so a
   * draft cannot be sent by mistake looking finished.
   */
  draft?: boolean;
};

export const companies: readonly Company[] = [
  /*
   * TODO(otavio): a worked example of the format. Rename it to a real
   * company (slug, name, role, order) and rewrite both MDX notes in your own
   * words, then drop `draft`. There must always be at least one entry: the
   * route prerenders every company, and Next fails a build that would
   * prerender none.
   */
  {
    slug: "example",
    name: "Example Co.",
    role: {
      en: "Senior Frontend Engineer",
      "pt-br": "Engenheiro Frontend Sênior",
    },
    projectOrder: ["design-system-at-scale", "developer-experience-platform"],
    draft: true,
  },
] as const;

export function findCompany(slug: string): Company | undefined {
  return companies.find((company) => company.slug === slug);
}

/** The company's chosen order first, then everything else in home order. */
export function projectsFor(company: Company): Project[] {
  const chosen = company.projectOrder
    .map((slug) => featuredProjects.find((project) => project.slug === slug))
    .filter((project): project is Project => project !== undefined);

  return [
    ...chosen,
    ...featuredProjects.filter((project) => !chosen.includes(project)),
  ];
}
