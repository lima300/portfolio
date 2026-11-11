import { Quote } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/data/testimonials";
import { getI18n } from "@/i18n/dictionary";

/**
 * Colleague references.
 *
 * Renders nothing while `testimonials` is empty, which it is until real
 * recommendations are pasted in. A section headed "What the people I worked
 * with say" above invented quotes would undo the credibility the rest of the
 * site is built to earn — so the component is finished and waiting, and the
 * section appears on its own as soon as the first entry lands.
 */
export async function Testimonials() {
  const { locale, messages } = await getI18n();

  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-24 border-t py-20 md:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={messages.testimonials.eyebrow}
          title={messages.testimonials.heading}
          headingId="testimonials-heading"
        />

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li key={testimonial.id}>
              <Reveal delay={index * 70} className="h-full">
                <Card
                  variant="elevated"
                  padding="lg"
                  className="flex h-full flex-col gap-5"
                >
                  <Quote aria-hidden className="size-5 shrink-0 text-accent" />

                  <blockquote className="text-body text-fg">
                    <p>“{testimonial.quote[locale]}”</p>
                  </blockquote>

                  {/*
                    figcaption would need a figure; a plain footer inside the
                    list item keeps the quote and its attribution associated
                    without nesting landmarks.
                  */}
                  <footer className="mt-auto flex flex-col gap-0.5">
                    <p className="text-small font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-label text-fg-muted">
                      {testimonial.role[locale]} · {testimonial.company}
                    </p>
                    <p className="text-label text-fg-subtle">
                      {testimonial.relationship[locale]}
                    </p>
                  </footer>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
