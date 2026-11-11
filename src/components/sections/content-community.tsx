import { Award, ExternalLink } from "lucide-react";
import Image from "next/image";

import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  contentThemes,
  featuredPosts,
  instagram,
  mentoring,
} from "@/data/content";
import { getI18n } from "@/i18n/dictionary";
import { getYearsOfExperience } from "@/lib/build-time";
import { withYears } from "@/lib/years";
import { cn } from "@/lib/cn";

/**
 * The creator and community side.
 *
 * Built around the numbers and the mentoring story rather than embedded
 * posts. Two reasons: an Instagram embed is an iframe, a third-party script
 * and a cookie banner's worth of tracking for what could be an image and a
 * link — and a recruiter weighs "mentored three winning teams" far more
 * heavily than a carousel.
 */
export async function ContentCommunity() {
  const { locale, messages } = await getI18n();
  const years = await getYearsOfExperience();

  return (
    <section
      id="content"
      aria-labelledby="content-heading"
      className="scroll-mt-24 border-t py-20 md:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={messages.content.eyebrow}
          title={messages.content.heading}
          description={messages.content.description}
          headingId="content-heading"
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {/* The audience */}
          <Reveal className="lg:col-span-1">
            <Card
              variant="elevated"
              padding="lg"
              className="flex h-full flex-col gap-4"
            >
              <div className="flex items-center gap-2 text-fg-muted">
                <InstagramIcon className="size-5" />
                <span className="text-small font-medium">
                  {instagram.handle}
                </span>
                {instagram.verified ? (
                  <Pill variant="accent" className="px-2 py-0.5">
                    <span aria-hidden>✓</span>
                    <span className="sr-only">{messages.a11y.verified}</span>
                  </Pill>
                ) : null}
              </div>

              <p className="text-display leading-none text-accent tabular-nums">
                <CountUp
                  to={instagram.followers}
                  decimals={1}
                  suffix={instagram.followersSuffix}
                  locale={locale}
                />
              </p>

              <p className="text-small text-fg-muted">
                {instagram.audience[locale]}
              </p>

              <p className="font-mono text-label tracking-widest text-fg-subtle uppercase">
                {instagram.motto[locale]}
              </p>

              <a
                href={instagram.href}
                target="_blank"
                rel="me noreferrer"
                className={cn(
                  buttonStyles({ variant: "secondary", size: "sm" }),
                  "mt-auto self-start",
                )}
              >
                <InstagramIcon className="size-4" />
                {messages.content.followLabel}
                <ExternalLink aria-hidden className="size-3.5" />
              </a>
            </Card>
          </Reveal>

          {/* The mentoring story */}
          <Reveal delay={70} className="lg:col-span-2">
            <Card
              variant="elevated"
              padding="lg"
              className="flex h-full flex-col gap-4"
            >
              <div className="flex items-center gap-2">
                <Award aria-hidden className="size-5 text-accent" />
                <h3 className="font-mono text-label tracking-widest text-accent uppercase">
                  {messages.content.mentoringEyebrow}
                </h3>
              </div>

              <p className="text-h3">{mentoring.outcome[locale]}</p>

              <p className="measure text-small text-fg-muted">
                {mentoring.detail[locale]}
              </p>

              <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
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
        </div>

        {/* What the account covers */}
        <div className="flex flex-col gap-5">
          <h3 className="font-mono text-label tracking-widest text-accent uppercase">
            {messages.content.themesEyebrow}
          </h3>

          <ul className="grid gap-4 md:grid-cols-3">
            {contentThemes.map((theme, index) => (
              <li key={theme.id}>
                <Reveal delay={index * 60} className="h-full">
                  <Card variant="sunken" padding="lg" className="h-full">
                    <h4 className="text-body font-semibold">
                      {theme.title[locale]}
                    </h4>
                    <p className="mt-2 text-small text-fg-muted">
                      {withYears(theme.description[locale], years)}
                    </p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/*
          Favourite posts. No thumbnails yet, so the cards are typographic
          rather than showing an empty image frame — a link that is honestly a
          link beats a grey rectangle pretending to be a screenshot. The panel
          appears above the text once a thumbnail exists.
        */}
        {featuredPosts.length > 0 ? (
          <div className="flex flex-col gap-5">
            <h3 className="font-mono text-label tracking-widest text-accent uppercase">
              {messages.content.postsEyebrow}
            </h3>

            <ul className="grid gap-4 md:grid-cols-3">
              {featuredPosts.map((post, index) => (
                <li key={post.id}>
                  <Reveal delay={index * 60} className="h-full">
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group block h-full"
                    >
                      <Card
                        variant="sunken"
                        padding="lg"
                        className="flex h-full flex-col gap-3 transition-colors duration-200 group-hover:border-accent"
                      >
                        {post.thumbnail ? (
                          <Image
                            src={post.thumbnail}
                            alt=""
                            width={640}
                            height={640}
                            className="aspect-square w-full rounded-control object-cover"
                          />
                        ) : null}

                        <Pill variant="outline" className="self-start">
                          {messages.content.postKinds[post.kind]}
                        </Pill>

                        {post.caption ? (
                          <p className="text-small text-fg">
                            {post.caption[locale]}
                          </p>
                        ) : null}

                        <span className="mt-auto inline-flex items-center gap-1.5 text-label font-medium text-fg-muted transition-colors duration-200 group-hover:text-accent">
                          <InstagramIcon className="size-3.5" />
                          {messages.content.viewPost}
                          <ExternalLink aria-hidden className="size-3" />
                        </span>
                      </Card>
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
