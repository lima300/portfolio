import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { SectionHeading } from "@/components/ui/section-heading";
import { education, experience } from "@/data/experience";
import { getI18n } from "@/i18n/dictionary";
import { formatMonth, formatRange } from "@/lib/format-date";

/**
 * The career, most recent first.
 *
 * The green progress line is a CSS scroll-driven animation: it fills as the
 * list travels through the viewport, with no scroll listener and no work on
 * the main thread. Where `animation-timeline` is unsupported, or motion is
 * reduced, the overlay simply does not exist and the muted rule stands on its
 * own.
 *
 * An ordered list, because the sequence is the content.
 */
export async function ExperienceTimeline() {
  const { locale, messages } = await getI18n();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 border-t py-20 md:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={messages.experience.eyebrow}
          title={messages.experience.heading}
          headingId="experience-heading"
        />

        <div className="relative">
          {/* The rule, and the accent that fills it. Both decorative. */}
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px bg-border-strong"
          >
            <div data-timeline-progress="" className="h-full w-px bg-accent" />
          </div>

          <ol className="flex flex-col gap-12">
            {experience.map((role, index) => (
              <li key={role.id} className="relative pl-10">
                <Reveal delay={Math.min(index, 4) * 60}>
                  <span
                    aria-hidden
                    className="absolute top-2 -left-10 ml-[3px] size-2.5 rounded-full border-2 border-bg bg-accent"
                  />

                  <p className="font-mono text-label text-fg-subtle">
                    {formatRange(
                      role.start,
                      role.end,
                      locale,
                      messages.experience.present,
                    )}
                  </p>

                  <h3 className="mt-1 text-h3">
                    {role.title[locale]}
                    <span className="text-fg-muted"> · {role.company}</span>
                  </h3>

                  <p className="mt-2 measure text-body text-fg-muted">
                    {role.summary[locale]}
                  </p>

                  <ul className="mt-4 flex measure flex-col gap-2">
                    {role.highlights[locale].map((highlight) => (
                      <li
                        key={highlight}
                        className="relative pl-5 text-small text-fg-muted"
                      >
                        <span
                          aria-hidden
                          className="absolute top-[0.6em] left-0 size-1.5 rounded-full bg-accent-soft ring-1 ring-accent"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {role.stack.map((item) => (
                      <li key={item}>
                        <Pill variant="outline">{item}</Pill>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="border-t pt-10">
          <h3 className="font-mono text-label tracking-widest text-accent uppercase">
            {messages.experience.education}
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {education.map((entry) => (
              <li key={entry.institution} className="flex flex-col gap-1">
                <p className="text-body font-medium">{entry.degree[locale]}</p>
                <p className="text-small text-fg-muted">
                  {entry.institution} · {formatMonth(entry.end, locale)} ·{" "}
                  {entry.detail[locale]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
