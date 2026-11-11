import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { about, facts } from "@/data/about";
import { getI18n } from "@/i18n/dictionary";
import { routes } from "@/lib/routes";

/**
 * The human paragraph, with the practical details beside it.
 *
 * No portrait yet, and the layout does not pretend otherwise: rather than a
 * grey placeholder frame, the second column carries the facts a recruiter
 * actually checks before a first call — where he is, whether the hours work,
 * which languages. When a photograph exists it replaces this column's
 * position in the grid without the section being redesigned.
 */
export async function AboutTeaser() {
  const { locale, messages } = await getI18n();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-t py-20 md:py-28"
    >
      <Container className="grid gap-10 lg:grid-cols-5 lg:gap-16">
        <div className="flex flex-col items-start gap-6 lg:col-span-3">
          <SectionHeading
            eyebrow={messages.about.eyebrow}
            title={messages.about.heading}
            headingId="about-heading"
          />

          <p className="measure text-lead text-fg-muted">
            {about.paragraph[locale]}
          </p>

          <Link
            href={routes.about(locale)}
            className="inline-flex items-center gap-1.5 text-small font-medium text-accent underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-accent"
          >
            {messages.about.readMore}
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </div>

        <Reveal delay={80} className="lg:col-span-2">
          <Card variant="sunken" padding="lg" className="h-full">
            <h3 className="font-mono text-label tracking-widest text-accent uppercase">
              {messages.about.factsEyebrow}
            </h3>

            <dl className="mt-5 flex flex-col gap-4">
              {facts.map((fact) => (
                <div key={fact.id} className="flex flex-col gap-0.5">
                  <dt className="text-label text-fg-subtle">
                    {fact.label[locale]}
                  </dt>
                  <dd className="text-small font-medium text-fg">
                    {fact.value[locale]}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
