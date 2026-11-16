import type { MetadataRoute } from "next";

import { featuredProjects } from "@/data/projects";
import { locales, type Locale } from "@/i18n/config";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

/**
 * Every indexable page, once per locale, each listing its translations so a
 * search engine pairs `/en/x` with `/pt-br/x` instead of treating them as
 * duplicates. Read from `routes` and the project records, so a new page or
 * case study only has to be added there.
 *
 * Left out on purpose: the 404, `/dev/*`, and the `#section` anchors that
 * `routes` also knows about but which are not pages.
 */
const pages: readonly ((locale: Locale) => string)[] = [
  routes.home,
  routes.about,
  routes.resume,
  routes.lab,
  routes.uses,
  routes.colophon,
  ...featuredProjects.map(
    (project) => (locale: Locale) => routes.caseStudy(locale, project.slug),
  ),
];

const absolute = (path: string) => new URL(path, site.url).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((path) =>
    locales.map((locale) => ({
      url: absolute(path(locale)),
      alternates: {
        languages: {
          en: absolute(path("en")),
          "pt-BR": absolute(path("pt-br")),
          "x-default": absolute(path("en")),
        },
      },
    })),
  );
}
