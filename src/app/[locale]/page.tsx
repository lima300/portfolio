import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { ImpactStrip } from "@/components/sections/impact-strip";
import { SelectedWork } from "@/components/sections/selected-work";

/*
 * The home page: one scroll, in the order a recruiter reads.
 *
 * The content and community section and the about teaser slot in between the
 * skills grid and the contact block as the remaining chunks land.
 */
export default function HomePage() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <ImpactStrip />
      <SelectedWork />

      {/* Anchor targets for the nav until the real sections land. */}
      <div id="about" className="scroll-mt-24" />
      <div id="content" className="scroll-mt-24" />

      <Contact />
    </main>
  );
}
