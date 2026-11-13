import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

import { CopyEmail } from "@/components/features/copy-email";
import { LinkedInIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { facts } from "@/data/about";
import { headlineMetrics } from "@/data/metrics";
import { featuredProjects } from "@/data/projects";
import { bcp47 } from "@/i18n/config";
import { getI18n } from "@/i18n/dictionary";
import { getYearsOfExperience } from "@/lib/build-time";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";
import { withYears } from "@/lib/years";

/** The facts a recruiter screens on; the personal one stays on /about. */
const SCREENING_FACTS = ["based", "hours", "languages"];

/**
 * The whole site as one card: who, how long, the numbers, the three projects
 * worth a click, the practicalities, and the two ways to act on it.
 *
 * Assembled from the same data as the pages it summarises, so it cannot drift
 * from them. Rendered on the server inside a closed <dialog>.
 */
export async function RecruiterSummary() {
  const { locale, messages } = await getI18n();
  const years = await getYearsOfExperience();
  const t = messages.recruiter;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start gap-3 pr-10">
        <p className="font-mono text-label tracking-widest text-accent uppercase">
          {t.title}
        </p>
        {/*
          Takes focus when the dialog opens, so a screen reader starts at the
          name rather than at the close button.
        */}
        <h2
          id="recruiter-summary-title"
          tabIndex={-1}
          data-autofocus
          className="text-h2 outline-none"
        >
          {site.name}
        </h2>
        <p className="text-lead text-fg">
          {messages.resume.role} · {withYears(t.years, years)}
        </p>
        <Pill dot>{messages.hero.availability}</Pill>
      </div>

      <section
        aria-labelledby="recruiter-numbers"
        className="flex flex-col gap-3"
      >
        <h3
          id="recruiter-numbers"
          className="font-mono text-label tracking-widest text-fg-subtle uppercase"
        >
          {t.numbers}
        </h3>
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {headlineMetrics.map((metric) => (
            <div
              key={metric.id}
              className="flex flex-col-reverse justify-end gap-0.5"
            >
              <dt className="text-label text-fg-subtle">
                {metric.label[locale]}
              </dt>
              <dd className="text-h3 text-accent tabular-nums">
                {metric.prefix}
                {metric.value.toLocaleString(bcp47[locale])}
                {metric.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="recruiter-work" className="flex flex-col gap-3">
        <h3
          id="recruiter-work"
          className="font-mono text-label tracking-widest text-fg-subtle uppercase"
        >
          {t.topWork}
        </h3>
        <ul className="flex flex-col divide-y divide-border">
          {featuredProjects.map((project) => (
            <li key={project.slug}>
              <Link
                href={routes.caseStudy(locale, project.slug)}
                aria-label={`${t.readCaseStudy}: ${project.title[locale]}`}
                className="group flex items-center gap-4 py-3"
              >
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-body font-medium text-fg transition-colors duration-200 group-hover:text-accent">
                    {project.title[locale]}
                  </span>
                  <span className="text-small text-fg-muted">
                    {project.outcome[locale]}
                  </span>
                </div>
                <ArrowRight
                  aria-hidden
                  className="size-4 shrink-0 text-fg-subtle transition-[color,translate] duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="recruiter-facts"
        className="flex flex-col gap-3"
      >
        <h3
          id="recruiter-facts"
          className="font-mono text-label tracking-widest text-fg-subtle uppercase"
        >
          {t.facts}
        </h3>
        <dl className="grid gap-4 sm:grid-cols-3">
          {facts
            .filter((fact) => SCREENING_FACTS.includes(fact.id))
            .map((fact) => (
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
      </section>

      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
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
    </div>
  );
}
