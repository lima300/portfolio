import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

import { CopyEmail } from "@/components/features/copy-email";
import { Magnetic } from "@/components/motion/magnetic";
import { WordReveal } from "@/components/motion/word-reveal";
import { Aurora } from "@/components/sections/aurora";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { getI18n } from "@/i18n/dictionary";
import { getYearsOfExperience } from "@/lib/build-time";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

/**
 * The sixty-second pitch.
 *
 * Type-led, with no portrait: a photograph here would compete with the one
 * sentence that has to land, and the layout is built so that adding one later
 * is a new section rather than a redesign.
 *
 * Everything above the fold is server-rendered HTML. The only client code in
 * this subtree is the clipboard button, the magnetic pull on the primary CTA,
 * and the observer that pauses the aurora once you scroll past it.
 */
export async function Hero() {
  const { locale, messages } = await getI18n();
  const years = await getYearsOfExperience();

  return (
    <section className="relative isolate overflow-hidden">
      <Aurora />

      <Container className="relative flex flex-col items-start gap-7 pt-20 pb-24 md:pt-28 md:pb-32">
        <Pill dot>{messages.hero.availability}</Pill>

        <h1 className="max-w-[19ch] text-display">
          <WordReveal text={messages.hero.headline} />
        </h1>

        <p className="measure text-lead text-fg-muted">
          {messages.hero.subline.replace("{years}", String(years))}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-3">
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
            className={cn(buttonStyles({ variant: "secondary", size: "lg" }))}
          >
            <Download aria-hidden className="size-4" />
            {messages.hero.downloadResume}
          </Link>

          <CopyEmail variant="ghost" size="lg" />
        </div>
      </Container>
    </section>
  );
}
