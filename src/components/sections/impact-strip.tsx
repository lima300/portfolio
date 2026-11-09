import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { headlineMetrics } from "@/data/metrics";
import { getI18n } from "@/i18n/dictionary";

/**
 * Four numbers, straight after the hero.
 *
 * This is the section a recruiter skims before deciding whether to read the
 * rest, so it leads with the outcome and keeps the mechanism in small type
 * underneath. Each figure counts up as it arrives, which is the one piece of
 * decoration that earns its place here: it draws the eye to the number.
 */
export async function ImpactStrip() {
  const { locale, messages } = await getI18n();

  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="scroll-mt-24 border-t py-20 md:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={messages.impact.eyebrow}
          title={messages.impact.heading}
          headingId="impact-heading"
        />

        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {headlineMetrics.map((metric, index) => (
            <li key={metric.id}>
              <Reveal delay={index * 70}>
                <MetricCard
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  decimals={metric.decimals}
                  locale={locale}
                  label={metric.label[locale]}
                  detail={metric.detail[locale]}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
