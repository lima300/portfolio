import type { Metadata } from "next";
import type { ComponentType } from "react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/i18n/config";
import { getI18n } from "@/i18n/dictionary";
import { routes } from "@/lib/routes";

/*
 * How the site is built, in prose. The body is MDX through the same pipeline
 * as the case studies (see ADR 0005), so it is translated per locale and
 * styled by `src/mdx-components.tsx`.
 */

export const ensureStatic = "navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getI18n();
  const path = (target: Locale) => routes.colophon(target);

  return {
    title: messages.colophon.title,
    description: messages.colophon.description,
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

export default async function ColophonPage() {
  const { locale, messages } = await getI18n();
  const { default: Body } = (await import(
    `@/content/pages/${locale}/colophon.mdx`
  )) as { default: ComponentType };

  return (
    <main id="main" className="flex-1 py-20 md:py-28">
      <Container>
        <article
          aria-labelledby="colophon-heading"
          className="mx-auto flex max-w-[70ch] flex-col gap-10"
        >
          <SectionHeading
            as="h1"
            eyebrow={messages.colophon.eyebrow}
            title={messages.colophon.heading}
            headingId="colophon-heading"
          />
          <div>
            <Body />
          </div>
        </article>
      </Container>
    </main>
  );
}
