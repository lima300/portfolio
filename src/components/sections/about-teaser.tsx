import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PhotoFigure } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { about, facts } from "@/data/about";
import { portrait } from "@/data/photos";
import { getI18n } from "@/i18n/dictionary";
import { routes } from "@/lib/routes";

/**
 * The human paragraph, the practical details under it, and a face beside both.
 *
 * The portrait lives here rather than in the hero: there, a photograph would
 * compete with the one sentence that has to land. Here it is the answer to
 * "who is this", which is the question the section asks.
 *
 * The facts are the ones a recruiter checks before a first call — where he
 * is, whether the hours work, which languages.
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

          <Card variant="sunken" padding="lg" className="w-full">
            <h3 className="font-mono text-label tracking-widest text-accent uppercase">
              {messages.about.factsEyebrow}
            </h3>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
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

          <Link
            href={routes.about(locale)}
            className="inline-flex items-center gap-1.5 text-small font-medium text-accent underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-accent"
          >
            {messages.about.readMore}
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </div>

        <Reveal delay={80} className="lg:col-span-2">
          <PhotoFigure
            photo={portrait}
            locale={locale}
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 100vw"
            className="mx-auto max-w-sm lg:max-w-none"
          />
        </Reveal>
      </Container>
    </section>
  );
}
