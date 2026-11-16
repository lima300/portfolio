import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

import { LiveEmbed } from "@/components/features/live-embed";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { SectionHeading } from "@/components/ui/section-heading";
import { labProjects } from "@/data/projects";
import { getI18n } from "@/i18n/dictionary";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

/*
 * No <Reveal> on the cards: they sit at the top of the page, where a fade
 * only delays content that is already on screen.
 *
 * Side projects. Each card summarises its repository's own README and links
 * to the code; nothing here claims more than the repository shows.
 *
 * TODO(otavio): neither project is deployed yet. Once they are, set `live`
 * in `src/data/projects.ts` and the card grows a "Live" link on its own —
 * and, for a project marked `embed`, a frame that runs the demo in place.
 */

export const ensureStatic = "navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getI18n();

  return pageMetadata({
    locale,
    path: routes.lab,
    title: messages.lab.title,
    description: messages.lab.description,
  });
}

export default async function LabPage() {
  const { locale, messages } = await getI18n();

  return (
    <main id="main" className="flex-1 py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          as="h1"
          eyebrow={messages.lab.eyebrow}
          title={messages.lab.heading}
          description={messages.lab.intro}
        />

        <ul className="grid gap-6 md:grid-cols-2">
          {labProjects.map((project) => (
            <li key={project.slug}>
              <Card
                variant="elevated"
                padding="lg"
                className="flex h-full flex-col items-start gap-5"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-h3">{project.title}</h2>
                  <p className="text-lead text-fg">{project.outcome[locale]}</p>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {project.highlights.map((item) => (
                    <li
                      key={item.en}
                      className="flex gap-3 text-small text-fg-muted before:mt-[0.6em] before:size-1.5 before:shrink-0 before:rounded-full before:bg-accent"
                    >
                      {item[locale]}
                    </li>
                  ))}
                </ul>

                {project.live && project.embed ? (
                  <LiveEmbed
                    src={project.live}
                    title={project.title}
                    labels={{ load: messages.lab.runDemo }}
                  />
                ) : null}

                <ul className="mt-auto flex flex-wrap gap-1.5">
                  {project.stack.map((item) => (
                    <li key={item}>
                      <Pill variant="neutral">{item}</Pill>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {/*
                    aria-label rather than a visually hidden suffix: inside an
                    inline-flex link the suffix is its own flex item, and the
                    accessible name picks up a stray space ("Code : …").
                  */}
                  <a
                    href={project.repo}
                    aria-label={`${messages.work.viewCode}: ${project.title}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-small font-medium text-accent underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-accent"
                  >
                    <GitHubIcon className="size-4" />
                    {messages.work.viewCode}
                  </a>
                  {project.live ? (
                    <a
                      href={project.live}
                      aria-label={`${messages.work.viewLive}: ${project.title}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-small font-medium text-fg-muted transition-colors duration-200 hover:text-accent"
                    >
                      <ExternalLink aria-hidden className="size-4" />
                      {messages.work.viewLive}
                    </a>
                  ) : null}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
