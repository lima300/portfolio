import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

import { CopyEmail } from "@/components/features/copy-email";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Contact } from "@/components/sections/contact";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { MetricCard } from "@/components/ui/metric-card";
import { Pill } from "@/components/ui/pill";
import { headlineMetrics } from "@/data/metrics";
import { getI18n } from "@/i18n/dictionary";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

/*
 * The home page, still being assembled.
 *
 * The hero and impact strip get their real treatment in the next chunk, with
 * the aurora background and the headline reveal. What is here is enough to
 * review the shell in place: the glass nav materialising on scroll, the
 * footer, the live clock and the copy-to-clipboard flow.
 */

export default async function HomePage() {
  const { locale, messages } = await getI18n();

  return (
    <main id="main" className="flex-1">
      <section className="py-20 md:py-32">
        <Container className="flex flex-col items-start gap-6">
          <Pill dot>{messages.hero.availability}</Pill>

          <h1 className="max-w-[18ch] text-display">
            {messages.hero.headline}
          </h1>

          <p className="measure text-lead text-fg-muted">
            {messages.hero.subline}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                href={routes.work(locale)}
                className={cn(buttonStyles({ size: "lg" }))}
              >
                {messages.hero.viewWork}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Magnetic>

            <Link
              href={routes.resume(locale)}
              // Built in the secondary-pages chunk.
              prefetch={false}
              className={cn(buttonStyles({ variant: "secondary", size: "lg" }))}
            >
              <Download aria-hidden className="size-4" />
              {messages.hero.downloadResume}
            </Link>

            <CopyEmail variant="ghost" size="lg" />
          </div>
        </Container>
      </section>

      <section id="work" className="scroll-mt-24 border-t py-16 md:py-24">
        <Container>
          <Card variant="sunken" padding="lg">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {headlineMetrics.map((metric, index) => (
                <Reveal key={metric.id} delay={index * 60}>
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
              ))}
            </div>
          </Card>
        </Container>
      </section>

      {/* Anchor targets for the nav until the real sections land. */}
      <div id="about" className="scroll-mt-24" />
      <div id="content" className="scroll-mt-24" />

      <Contact />
    </main>
  );
}
