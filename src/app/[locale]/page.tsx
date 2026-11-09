import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";

/*
 * The home page: one scroll, in the order a recruiter reads.
 *
 * Selected work, the experience timeline, the skills grid and the content
 * section slot in between the impact strip and the contact block as the
 * remaining chunks land.
 */
export default function HomePage() {
  return (
    <main id="main" className="flex-1">
      <Hero />

      {/* Anchor targets for the nav until the real sections land. */}
      <div id="work" className="scroll-mt-24" />
      <div id="about" className="scroll-mt-24" />
      <div id="content" className="scroll-mt-24" />

      <Contact />
    </main>
  );
}
