import { ArrowRight, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { JsonLd } from "@/components/seo/json-ld";
import { Testimonials } from "@/components/sections/testimonials";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PhotoFigure } from "@/components/ui/photo";
import { Pill } from "@/components/ui/pill";
import { SectionHeading } from "@/components/ui/section-heading";
import { about, facts } from "@/data/about";
import { mentoring } from "@/data/content";
import { lifePhotos, portrait } from "@/data/photos";
import { getI18n } from "@/i18n/dictionary";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";
import { profileGraph } from "@/lib/structured-data";

/*
 * The longer version of the about teaser.
 *
 * Built only from what is already established elsewhere on the site — the
 * human paragraph, the practical facts, the mentoring, the career and what
 * colleagues say — so nothing here can contradict the home page — plus the
 * photographs, which say the "away from the keyboard" part better than a
 * sentence could.
 *
 * TODO(otavio): the plan also asks for a longer story (how you got into
 * frontend, what you care about in how teams work) and a "currently" line.
 * Both would slot in between the intro and the photos.
 */

export const ensureStatic = "navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getI18n();

  return pageMetadata({
    locale,
    path: routes.about,
    title: messages.aboutPage.title,
    description: messages.aboutPage.description,
    type: "profile",
  });
}

export default async function AboutPage() {
  const { locale, messages } = await getI18n();

  return (
    <main id="main" className="flex-1">
      <JsonLd data={profileGraph(locale, messages)} />
      <section
        aria-labelledby="about-page-heading"
        className="pt-20 pb-16 md:pt-28 md:pb-24"
      >
        <Container className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="flex flex-col items-start gap-6 lg:col-span-3">
            <SectionHeading
              as="h1"
              eyebrow={messages.aboutPage.title}
              title={messages.aboutPage.heading}
              headingId="about-page-heading"
            />
            <p className="measure text-lead text-fg-muted">
              {about.paragraph[locale]}
            </p>

            {/*
              No <Reveal> on anything in this section: it is above the fold,
              so a fade would only delay content that is already on screen —
              and leave it below contrast while it runs.
            */}
            <Card variant="sunken" padding="lg" className="w-full">
              <h2 className="font-mono text-label tracking-widest text-fg-subtle uppercase">
                {messages.about.factsEyebrow}
              </h2>
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
          </div>

          <PhotoFigure
            photo={portrait}
            locale={locale}
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 100vw"
            eager
            className="mx-auto w-full max-w-sm lg:col-span-2 lg:max-w-none"
          />
        </Container>
      </section>

      <section
        aria-labelledby="about-photos-heading"
        className="border-t py-20 md:py-28"
      >
        <Container className="flex flex-col gap-8">
          <h2
            id="about-photos-heading"
            className="font-mono text-label tracking-widest text-accent uppercase"
          >
            {messages.aboutPage.photosHeading}
          </h2>
          <ul className="grid gap-6 sm:grid-cols-3">
            {lifePhotos.map((photo, index) => (
              <li key={photo.id}>
                <Reveal delay={index * 60}>
                  <PhotoFigure
                    photo={photo}
                    locale={locale}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 33vw, 100vw"
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="about-mentoring-heading"
        className="border-t py-20 md:py-28"
      >
        <Container>
          <Reveal>
            <Card
              variant="elevated"
              padding="lg"
              className="flex flex-col items-start gap-5"
            >
              <p className="font-mono text-label tracking-widest text-accent uppercase">
                {messages.aboutPage.mentoringEyebrow}
              </p>
              <h2 id="about-mentoring-heading" className="measure text-h3">
                {mentoring.outcome[locale]}
              </h2>
              <p className="measure text-body text-fg-muted">
                {mentoring.detail[locale]}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                <li>
                  <Pill variant="outline">{mentoring.programme}</Pill>
                </li>
                <li>
                  <Pill variant="outline">{mentoring.organisation}</Pill>
                </li>
                <li>
                  <Pill variant="neutral">{mentoring.company}</Pill>
                </li>
              </ul>
            </Card>
          </Reveal>
        </Container>
      </section>

      <ExperienceTimeline />
      <Testimonials />

      <section
        aria-labelledby="about-next-heading"
        className="border-t py-20 md:py-28"
      >
        <Container className="flex flex-col items-start gap-8">
          <SectionHeading
            eyebrow={messages.aboutPage.nextEyebrow}
            title={messages.aboutPage.nextHeading}
            headingId="about-next-heading"
          />
          <div className="flex flex-wrap gap-3">
            <Link
              href={routes.work(locale)}
              className={cn(buttonStyles({ size: "lg" }))}
            >
              {messages.aboutPage.seeWork}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link
              href={routes.resume(locale)}
              className={cn(buttonStyles({ variant: "secondary", size: "lg" }))}
            >
              <FileText aria-hidden className="size-4" />
              {messages.aboutPage.readResume}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
