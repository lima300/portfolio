import { JsonLd } from "@/components/seo/json-ld";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { Contact } from "@/components/sections/contact";
import { ContentCommunity } from "@/components/sections/content-community";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Hero } from "@/components/sections/hero";
import { ImpactStrip } from "@/components/sections/impact-strip";
import { SelectedWork } from "@/components/sections/selected-work";
import { SkillsBento } from "@/components/sections/skills-bento";
import { Testimonials } from "@/components/sections/testimonials";
import { getI18n } from "@/i18n/dictionary";
import { homeGraph } from "@/lib/structured-data";

/*
 * The home page: one scroll, in the order a recruiter reads.
 *
 * Proof first (work, experience, capability), then credibility from other
 * people, then the human paragraph, then the one thing to do next.
 *
 * Testimonials render nothing until real recommendations exist, so the page
 * reads correctly either way.
 */
export default async function HomePage() {
  const { locale, messages } = await getI18n();

  return (
    <main id="main" className="flex-1">
      <JsonLd data={homeGraph(locale, messages)} />
      <Hero />
      <ImpactStrip />
      <SelectedWork />
      <ExperienceTimeline />
      <SkillsBento />
      <ContentCommunity />
      <Testimonials />
      <AboutTeaser />
      <Contact />
    </main>
  );
}
