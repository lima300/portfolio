import { ArrowRight, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import {
  AudienceCard,
  ContentThemes,
  FavouritePosts,
  MentoringCard,
} from "@/components/sections/content-community";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getI18n } from "@/i18n/dictionary";
import { getYearsOfExperience } from "@/lib/build-time";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

/*
 * Content & community, on its own page: the audience, the mentoring, what the
 * account covers and the favourite posts. The same blocks as the home
 * section, so the two cannot disagree; here they get the whole page and a
 * place in the outline of their own.
 *
 * No <Reveal> on the first row: it sits above the fold, where a fade only
 * delays content that is already on screen.
 *
 * TODO(otavio): the plan also lists talks. Once there is one, it slots in
 * after the mentoring row as its own block.
 */

export const ensureStatic = "navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getI18n();

  return pageMetadata({
    locale,
    path: routes.content,
    title: messages.contentPage.title,
    description: messages.contentPage.description,
  });
}

export default async function ContentPage() {
  const { locale, messages } = await getI18n();
  const years = await getYearsOfExperience();
  const block = { locale, messages, level: 2 } as const;

  return (
    <main id="main" className="flex-1 py-20 md:py-28">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          as="h1"
          eyebrow={messages.content.eyebrow}
          title={messages.content.heading}
          description={messages.contentPage.intro}
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <AudienceCard locale={locale} messages={messages} />
          </div>
          <div className="lg:col-span-2">
            <MentoringCard {...block} />
          </div>
        </div>

        <ContentThemes {...block} years={years} />
        <FavouritePosts {...block} />

        <section
          aria-labelledby="content-next-heading"
          className="flex flex-col items-start gap-8 border-t pt-16"
        >
          <SectionHeading
            eyebrow={messages.aboutPage.nextEyebrow}
            title={messages.contentPage.nextHeading}
            headingId="content-next-heading"
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
        </section>
      </Container>
    </main>
  );
}
