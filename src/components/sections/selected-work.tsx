import { ArrowUpRight, ExternalLink, Lock } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";
import { ProjectMotif } from "@/components/sections/project-motif";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProjects, type Project } from "@/data/projects";
import { getI18n } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/messages/en";
import { formatRange } from "@/lib/format-date";
import { routes } from "@/lib/routes";

/**
 * The large product cards.
 *
 * Each one leads with the outcome rather than the title — the title tells you
 * what it was called, the outcome tells you whether to keep reading. The
 * visual is an abstract architecture diagram, which also sidesteps the
 * problem that two of these three cannot show any real UI.
 */

function ProjectCard({
  project,
  locale,
  messages,
}: {
  project: Project;
  locale: Locale;
  messages: Messages;
}) {
  const period = formatRange(
    project.start,
    project.end,
    locale,
    messages.experience.present,
  );

  return (
    <Spotlight className="rounded-hero">
      <Card variant="product" padding="none" className="h-full">
        <div className="grid gap-8 p-6 md:grid-cols-2 md:items-center md:gap-10 md:p-10">
          <ProjectMotif
            motif={project.motif}
            className="order-first aspect-[2/1] md:order-last"
          />

          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-label text-fg-subtle">
              <span>{period}</span>
              <span aria-hidden>·</span>
              <span>{project.role[locale]}</span>
            </div>

            <h3 className="text-h3">{project.title[locale]}</h3>

            <p className="text-lead text-fg">{project.outcome[locale]}</p>

            <p className="measure text-small text-fg-muted">
              {project.summary[locale]}
            </p>

            <dl className="flex flex-wrap gap-x-8 gap-y-3 py-1">
              {project.metrics.map((metric) => (
                /*
                 * `flex-col-reverse` puts the figure above its label visually
                 * while keeping dt before dd in the DOM, which is what a
                 * description list requires — and means the label is
                 * announced once, not twice.
                 */
                <div key={metric.label.en} className="flex flex-col-reverse">
                  <dt className="text-label text-fg-subtle">
                    {metric.label[locale]}
                  </dt>
                  <dd className="text-h3 text-accent tabular-nums">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <li key={item}>
                  <Pill variant="neutral">{item}</Pill>
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href={routes.caseStudy(locale, project.slug)}
                // Case study pages arrive with the MDX pipeline.
                prefetch={false}
                className="inline-flex items-center gap-1.5 text-small font-medium text-accent underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-accent"
              >
                {messages.work.caseStudy}
                <ArrowUpRight aria-hidden className="size-4" />
              </Link>

              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-small font-medium text-fg-muted transition-colors duration-200 hover:text-accent"
                >
                  <ExternalLink aria-hidden className="size-4" />
                  {messages.work.viewLive}
                </a>
              ) : null}

              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-small font-medium text-fg-muted transition-colors duration-200 hover:text-accent"
                >
                  <GitHubIcon className="size-4" />
                  {messages.work.viewCode}
                </a>
              ) : null}

              {project.confidential ? (
                <span className="inline-flex items-center gap-1.5 text-label text-fg-subtle">
                  <Lock aria-hidden className="size-3.5" />
                  {messages.work.confidential}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </Card>
    </Spotlight>
  );
}

export async function SelectedWork() {
  const { locale, messages } = await getI18n();

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-24 border-t py-20 md:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={messages.work.eyebrow}
          title={messages.work.heading}
          description={messages.work.description}
          headingId="work-heading"
        />

        <ul className="flex flex-col gap-6">
          {featuredProjects.map((project, index) => (
            <li key={project.slug}>
              <Reveal delay={index * 60}>
                <ProjectCard
                  project={project}
                  locale={locale}
                  messages={messages}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
