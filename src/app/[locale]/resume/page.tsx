import type { Metadata } from "next";

import { PrintButton } from "@/components/features/print-button";
import { Container } from "@/components/ui/container";
import { facts } from "@/data/about";
import { education, experience } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import type { Locale } from "@/i18n/config";
import { getI18n } from "@/i18n/dictionary";
import { getYearsOfExperience } from "@/lib/build-time";
import { formatMonth, formatRange } from "@/lib/format-date";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";
import { withYears } from "@/lib/years";

/*
 * The résumé, as a page that is also the PDF.
 *
 * Everything comes from `src/data/experience.ts` and `skills.ts`, the same
 * records as the home timeline and skills grid, so a job title can only be
 * wrong in one place. The print stylesheet does the rest: no header, no
 * footer, no button, light palette, and URLs written out in full, because a
 * link on paper is only as good as the text of it.
 */

export const ensureStatic = "navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getI18n();
  const path = (target: Locale) => routes.resume(target);

  return {
    title: messages.resume.title,
    description: messages.resume.description,
    alternates: {
      canonical: path(locale),
      languages: {
        en: path("en"),
        "pt-BR": path("pt-br"),
        "x-default": path("en"),
      },
    },
  };
}

/** `https://www.linkedin.com/in/x` → `linkedin.com/in/x`, for paper. */
function bare(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}

function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="border-b pb-2 font-mono text-label tracking-widest text-accent uppercase"
    >
      {children}
    </h2>
  );
}

export default async function ResumePage() {
  const { locale, messages } = await getI18n();
  const years = await getYearsOfExperience();
  const languages = facts.find((fact) => fact.id === "languages");
  const based = facts.find((fact) => fact.id === "based");

  const contact = [
    { label: site.email, href: `mailto:${site.email}` },
    { label: bare(site.url), href: site.url },
    { label: bare(site.socials.linkedin), href: site.socials.linkedin },
    { label: bare(site.socials.github), href: site.socials.github },
  ];

  return (
    <main id="main" className="flex-1 py-16 md:py-24 print:py-0">
      <Container className="flex max-w-[52rem] flex-col gap-12 print:max-w-none print:gap-7 print:px-0">
        <header className="flex flex-col gap-5 print:gap-3">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-h1 text-balance-tight print:text-h2">
                {site.name}
              </h1>
              <p className="text-lead text-fg-muted print:text-body">
                {messages.resume.role}
                {based ? ` · ${based.value[locale]}` : null}
              </p>
            </div>
            <PrintButton className="print:hidden" />
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-small text-fg-muted">
            {contact.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent print:no-underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <section
          aria-labelledby="resume-summary"
          className="flex flex-col gap-3"
        >
          <SectionTitle id="resume-summary">
            {messages.resume.summary}
          </SectionTitle>
          <p className="text-body text-fg">
            {withYears(messages.hero.subline, years)}
          </p>
        </section>

        <section
          aria-labelledby="resume-experience"
          className="flex flex-col gap-3"
        >
          <SectionTitle id="resume-experience">
            {messages.resume.experience}
          </SectionTitle>
          <ol className="flex flex-col gap-8 print:gap-5">
            {experience.map((role) => (
              <li
                key={role.id}
                className="flex break-inside-avoid flex-col gap-2"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-lead font-semibold print:text-body">
                    {role.title[locale]} · {role.company}
                  </h3>
                  <p className="font-mono text-label text-fg-subtle">
                    {formatRange(
                      role.start,
                      role.end,
                      locale,
                      messages.experience.present,
                    )}{" "}
                    · {role.location[locale]}
                  </p>
                </div>
                <ul className="flex list-disc flex-col gap-1 pl-5 text-small text-fg-muted marker:text-accent">
                  {role.highlights[locale].map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <p className="text-label text-fg-subtle">
                  {role.stack.join(" · ")}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="resume-skills"
          className="flex break-inside-avoid flex-col gap-3"
        >
          <SectionTitle id="resume-skills">
            {messages.resume.skills}
          </SectionTitle>
          <dl className="grid gap-x-6 gap-y-2 text-small sm:grid-cols-[10rem_1fr] print:grid-cols-[9rem_1fr]">
            {skillGroups.map((group) => (
              <div key={group.id} className="contents">
                <dt className="font-semibold">{group.title[locale]}</dt>
                <dd className="text-fg-muted">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="grid break-inside-avoid gap-12 sm:grid-cols-2 print:grid-cols-2 print:gap-7">
          <section
            aria-labelledby="resume-education"
            className="flex flex-col gap-3"
          >
            <SectionTitle id="resume-education">
              {messages.resume.education}
            </SectionTitle>
            {education.map((item) => (
              <div key={item.institution} className="flex flex-col gap-0.5">
                <p className="text-small font-semibold">
                  {item.degree[locale]}
                </p>
                <p className="text-small text-fg-muted">{item.institution}</p>
                <p className="font-mono text-label text-fg-subtle">
                  {formatMonth(item.start, locale)} —{" "}
                  {formatMonth(item.end, locale)} · {item.detail[locale]}
                </p>
              </div>
            ))}
          </section>

          {languages ? (
            <section
              aria-labelledby="resume-languages"
              className="flex flex-col gap-3"
            >
              <SectionTitle id="resume-languages">
                {messages.resume.languages}
              </SectionTitle>
              <p className="text-small text-fg-muted">
                {languages.value[locale]}
              </p>
            </section>
          ) : null}
        </div>
      </Container>
    </main>
  );
}
