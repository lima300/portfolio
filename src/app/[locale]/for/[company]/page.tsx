import { ArrowRight, FileText, TriangleAlert } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";

import { CopyEmail } from "@/components/features/copy-email";
import { LinkedInIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { SectionHeading } from "@/components/ui/section-heading";
import { companies, findCompany, projectsFor } from "@/data/companies";
import type { Locale } from "@/i18n/config";
import { getI18n } from "@/i18n/dictionary";
import { getYearsOfExperience } from "@/lib/build-time";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";
import { withYears } from "@/lib/years";

/*
 * A page for one company, sent by hand with an application.
 *
 * Unlisted on purpose: `noindex`, absent from the sitemap and linked from
 * nowhere on the site. It is not secret — anyone with the URL can open it —
 * so it says nothing a public page could not.
 *
 * It reorders the work and adds a note; it never removes a project or
 * changes a figure. Every fact still comes from `projects.ts`.
 */

/**
 * Every company prerenders, in both locales. As on the case studies, an
 * unknown slug 404s through `findCompany` rather than `dynamicParams`, which
 * Cache Components does not allow.
 */
export function generateStaticParams() {
  return companies.map((company) => ({ company: company.slug }));
}

export const ensureStatic = "navigation";

type Props = PageProps<"/[locale]/for/[company]">;

async function resolve(params: Props["params"]) {
  const { company: slug } = await params;
  const company = findCompany(slug);
  if (!company) notFound();
  return company;
}

/** Statically analysable, like the case studies: no runtime file access. */
async function loadNote(locale: Locale, slug: string) {
  const mod = (await import(`@/content/companies/${locale}/${slug}.mdx`)) as {
    default: ComponentType;
  };
  return mod.default;
}

const fill = (text: string, values: Record<string, string>) =>
  Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    text,
  );

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const company = await resolve(params);
  const { locale, messages } = await getI18n();
  const t = messages.forCompany;

  return {
    ...pageMetadata({
      locale,
      path: (target) => routes.company(target, company.slug),
      title: fill(t.title, { company: company.name }),
      description: fill(t.description, { company: company.name }),
    }),
    robots: { index: false, follow: false },
  };
}

export default async function CompanyPage({ params }: Props) {
  const company = await resolve(params);
  const { locale, messages } = await getI18n();
  const years = await getYearsOfExperience();
  const Note = await loadNote(locale, company.slug);
  const t = messages.forCompany;
  const values = { company: company.name, role: company.role[locale] };

  return (
    <main id="main" className="flex-1 py-20 md:py-28">
      <Container className="flex flex-col gap-16">
        {company.draft ? (
          <p
            role="note"
            className="flex items-start gap-3 rounded-card border border-accent/40 bg-accent-soft p-4 text-small text-fg"
          >
            <TriangleAlert
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-accent"
            />
            {t.draft}
          </p>
        ) : null}

        <div className="flex flex-col items-start gap-6">
          <SectionHeading
            as="h1"
            eyebrow={fill(t.eyebrow, values)}
            title={fill(t.heading, values)}
            description={withYears(fill(t.intro, values), years)}
          />
          <Pill dot>{messages.hero.availability}</Pill>
        </div>

        <section aria-labelledby="company-why-heading">
          <Card variant="elevated" padding="lg" className="flex flex-col gap-2">
            <h2
              id="company-why-heading"
              className="font-mono text-label tracking-widest text-accent uppercase"
            >
              {fill(t.why, values)}
            </h2>
            <div className="measure [&>p:last-child]:mb-0">
              <Note />
            </div>
          </Card>
        </section>

        <section
          aria-labelledby="company-work-heading"
          className="flex flex-col gap-6"
        >
          <SectionHeading
            title={t.workHeading}
            description={fill(t.workIntro, values)}
            headingId="company-work-heading"
          />

          <ol className="flex flex-col gap-4">
            {projectsFor(company).map((project, index) => (
              <li key={project.slug}>
                <Link
                  href={routes.caseStudy(locale, project.slug)}
                  className="group block"
                >
                  <Card
                    variant="product"
                    padding="none"
                    className="grid gap-6 p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:p-8"
                  >
                    <span
                      aria-hidden
                      className="font-mono text-label text-fg-subtle"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-h3 transition-colors duration-200 group-hover:text-accent">
                        {project.title[locale]}
                      </h3>
                      <p className="text-body text-fg-muted">
                        {project.outcome[locale]}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <dl className="flex gap-6">
                        {project.metrics.map((metric) => (
                          <div
                            key={metric.label.en}
                            className="flex flex-col-reverse"
                          >
                            <dt className="max-w-[12ch] text-label text-fg-subtle">
                              {metric.label[locale]}
                            </dt>
                            <dd className="text-h3 text-accent tabular-nums">
                              {metric.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <ArrowRight
                        aria-hidden
                        className="size-5 shrink-0 text-fg-subtle transition-[color,translate] duration-200 group-hover:translate-x-1 group-hover:text-accent"
                      />
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="company-next-heading"
          className="flex flex-col items-start gap-8 border-t pt-16"
        >
          <SectionHeading
            eyebrow={messages.contact.eyebrow}
            title={fill(t.nextHeading, values)}
            description={t.nextBody}
            headingId="company-next-heading"
          />
          <div className="flex flex-wrap gap-3">
            <Link
              href={routes.resume(locale)}
              className={cn(buttonStyles({ size: "lg" }))}
            >
              <FileText aria-hidden className="size-4" />
              {messages.hero.resume}
            </Link>
            <CopyEmail size="lg" />
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonStyles({ variant: "ghost", size: "lg" }))}
            >
              <LinkedInIcon className="size-4" />
              LinkedIn
            </a>
          </div>
        </section>
      </Container>
    </main>
  );
}
