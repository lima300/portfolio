import { findProject } from "@/data/projects";
import { isLocale } from "@/i18n/config";
import { ogImageRoute } from "@/lib/og/image";

/** Each case study's preview: its title and the one-line outcome. */
const route = ogImageRoute((messages, params) => {
  const { slug, locale } = params as { slug: string; locale: string };
  const project = findProject(slug);
  const lang = isLocale(locale) ? locale : "en";
  return {
    eyebrow: messages.work.caseStudy,
    title: project?.title[lang] ?? messages.notFound.title,
    description: project?.outcome[lang],
  };
});

export const generateImageMetadata = route.generateImageMetadata;
export default route.Image;
