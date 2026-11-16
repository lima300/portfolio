import { ArrowLeft, ArrowRight, ExternalLink, Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { MDXComponents } from "mdx/types";
import type { ComponentType } from "react";

import { BeforeAfter } from "@/components/features/before-after-figure";
import { Reveal } from "@/components/motion/reveal";
import { SharedMotif } from "@/components/motion/shared-motif";
import { ProjectMotif } from "@/components/sections/project-motif";
import { JsonLd } from "@/components/seo/json-ld";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { featuredProjects, findProject } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import { getI18n } from "@/i18n/dictionary";
import { formatRange } from "@/lib/format-date";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";
import { caseStudyGraph } from "@/lib/structured-data";

/*
 * The case study template.
 *
 * The page owns everything structured — the header, the TL;DR box, the
 * figures, the next-case-study card — and reads it from `projects.ts`, the
 * same record the home card renders. The MDX file owns only the story in
 * between. That split is what keeps a figure from saying one thing on the
 * card and another on the page.
 */

/**
 * Every case study prerenders, in both locales.
 *
 * `dynamicParams = false` would be the usual way to 404 anything else, but it
 * is unavailable under Cache Components; `findProject` calling `notFound()`
 * does the same job, and `ensureStatic` fails the build if a later change
 * makes the page depend on the request.
 */
export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export const ensureStatic = "navigation";

/**
 * Allowed to block on a client navigation, deliberately.
 *
 * Every case study shares one App Shell, and the page needs its slug for
 * everything it renders, so the instant-navigation check (dev only) asks for
 * a <Suspense> skeleton. A skeleton would break the card → case study morph:
 * the view transition snapshots the new page as the navigation commits, and
 * a skeleton has no motif to morph into. The route is prerendered in full for
 * every slug, so what the navigation waits on is a static payload.
 */
export const instant = false;

/** Interactive MDX components, merged over `src/mdx-components.tsx`. */
const caseStudyComponents: MDXComponents = { BeforeAfter };

type Props = PageProps<"/[locale]/work/[slug]">;

async function resolve(params: Props["params"]) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  return project;
}

/**
 * The template literal keeps the import statically analysable: the bundler
 * sees `src/content/work/<anything>/<anything>.mdx` and compiles every file
 * that matches, so there is no runtime filesystem access.
 */
async function loadBody(locale: Locale, slug: string) {
  const mod = (await import(`@/content/work/${locale}/${slug}.mdx`)) as {
    default: ComponentType<{ components?: MDXComponents }>;
  };
  return mod.default;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await resolve(params);
  const { locale } = await getI18n();

  return pageMetadata({
    locale,
    path: (target) => routes.caseStudy(target, project.slug),
    title: project.title[locale],
    description: project.outcome[locale],
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const project = await resolve(params);
  const { locale, messages } = await getI18n();
  const Body = await loadBody(locale, project.slug);

  const index = featuredProjects.findIndex(
    (item) => item.slug === project.slug,
  );
  const next = featuredProjects[(index + 1) % featuredProjects.length];

  const period = formatRange(
    project.start,
    project.end,
    locale,
    messages.experience.present,
  );

  return (
    <main id="main" className="flex-1">
      <JsonLd data={caseStudyGraph(project, locale)} />
      <article aria-labelledby="case-study-title">
        <header className="pt-28 pb-12 md:pt-36 md:pb-16">
          <Container className="flex flex-col gap-10">
            <Link
              href={routes.work(locale)}
              className="inline-flex w-fit items-center gap-1.5 text-small font-medium text-fg-muted transition-colors duration-200 hover:text-accent"
            >
              <ArrowLeft aria-hidden className="size-4" />
              {messages.caseStudy.backToWork}
            </Link>

            <div className="grid gap-10 lg:grid-cols-5 lg:items-center lg:gap-16">
              <div className="flex flex-col items-start gap-5 lg:col-span-3">
                <p className="font-mono text-label tracking-widest text-accent uppercase">
                  {messages.work.caseStudy}
                </p>

                <h1
                  id="case-study-title"
                  className="text-h1 text-balance-tight"
                >
                  {project.title[locale]}
                </h1>

                <p className="measure text-lead text-fg">
                  {project.outcome[locale]}
                </p>

                <dl className="grid w-full grid-cols-1 gap-x-8 gap-y-4 border-t pt-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <dt className="text-label text-fg-subtle">
                      {messages.caseStudy.role}
                    </dt>
                    <dd className="text-small">{project.role[locale]}</dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="text-label text-fg-subtle">
                      {messages.caseStudy.period}
                    </dt>
                    <dd className="text-small">{period}</dd>
                  </div>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <dt className="text-label text-fg-subtle">
                      {messages.caseStudy.stack}
                    </dt>
                    <dd>
                      <ul className="flex flex-wrap gap-1.5">
                        {project.stack.map((item) => (
                          <li key={item}>
                            <Pill variant="neutral">{item}</Pill>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
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

              <Card
                variant="sunken"
                padding="md"
                className="flex items-center lg:col-span-2 lg:self-stretch lg:p-8"
              >
                {/*
                  Fixed at the motif's own 2:1, centred in the column: the
                  diagrams are drawn for that ratio, and stretching one to
                  the header's height only adds empty frame.
                */}
                <SharedMotif slug={project.slug}>
                  <ProjectMotif
                    motif={project.motif}
                    className="aspect-[2/1] w-full"
                  />
                </SharedMotif>
              </Card>
            </div>
          </Container>
        </header>

        <Container>
          <section
            aria-labelledby="tldr-heading"
            className="grid gap-8 rounded-hero border bg-bg-elevated p-6 shadow-soft md:grid-cols-3 md:p-10"
          >
            <div className="flex flex-col gap-4 md:col-span-2">
              <h2
                id="tldr-heading"
                className="font-mono text-label tracking-widest text-accent uppercase"
              >
                {messages.caseStudy.tldr}
              </h2>
              <ul className="flex flex-col gap-3">
                {project.tldr.map((item) => (
                  <li
                    key={item.en}
                    className="flex gap-3 text-body text-fg before:mt-[0.7em] before:size-1.5 before:shrink-0 before:rounded-full before:bg-accent"
                  >
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 md:border-l md:pl-8">
              <p className="font-mono text-label tracking-widest text-fg-subtle uppercase">
                {messages.caseStudy.keyFigures}
              </p>
              <dl className="flex flex-col gap-5">
                {project.metrics.map((metric) => (
                  <div key={metric.label.en} className="flex flex-col-reverse">
                    <dt className="text-small text-fg-muted">
                      {metric.label[locale]}
                    </dt>
                    <dd className="text-h2 text-accent tabular-nums">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <div className="mx-auto max-w-[70ch] py-16 md:py-24">
            <Body components={caseStudyComponents} />
          </div>
        </Container>
      </article>

      {next && next.slug !== project.slug ? (
        <nav
          aria-label={messages.caseStudy.next}
          className="border-t py-16 md:py-24"
        >
          <Container>
            <Reveal>
              <Link
                href={routes.caseStudy(locale, next.slug)}
                className="group block"
              >
                <Card
                  variant="product"
                  padding="none"
                  className="grid gap-8 p-6 md:grid-cols-2 md:items-center md:p-10"
                >
                  <div className="flex flex-col items-start gap-3">
                    <p className="font-mono text-label tracking-widest text-accent uppercase">
                      {messages.caseStudy.next}
                    </p>
                    <p className="text-h2 text-balance-tight">
                      {next.title[locale]}
                    </p>
                    <p className="text-lead text-fg-muted">
                      {next.outcome[locale]}
                    </p>
                    <ArrowRight
                      aria-hidden
                      className="mt-2 size-6 text-accent transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                  <SharedMotif slug={next.slug}>
                    <ProjectMotif motif={next.motif} className="aspect-[2/1]" />
                  </SharedMotif>
                </Card>
              </Link>
            </Reveal>
          </Container>
        </nav>
      ) : null}
    </main>
  );
}
