import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/data/skills";
import { getI18n } from "@/i18n/dictionary";
import { cn } from "@/lib/cn";

/**
 * Capabilities as a bento grid.
 *
 * Each tile leads with a sentence about what the tools are *for*, with the
 * names underneath as secondary detail. A logo wall tells a reader you have
 * heard of something; a sentence tells them what you did with it.
 *
 * The first two tiles are wider on large screens, which gives the grid a
 * rhythm and puts the two groups that matter most to a frontend role at the
 * top.
 */
const EMPHASIS = ["lg:col-span-2", "lg:col-span-2"] as const;

export async function SkillsBento() {
  const { locale, messages } = await getI18n();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-24 border-t py-20 md:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={messages.skills.eyebrow}
          title={messages.skills.heading}
          description={messages.skills.description}
          headingId="skills-heading"
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <li key={group.id} className={cn(EMPHASIS[index])}>
              <Reveal delay={Math.min(index, 5) * 60} className="h-full">
                <Card variant="elevated" padding="lg" className="h-full">
                  <h3 className="font-mono text-label tracking-widest text-accent uppercase">
                    {group.title[locale]}
                  </h3>

                  <p className="mt-3 text-body text-fg">
                    {group.statement[locale]}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Pill variant="neutral">{item}</Pill>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
