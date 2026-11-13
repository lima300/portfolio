import type { Metadata } from "next";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { usesGroups } from "@/data/uses";
import type { Locale } from "@/i18n/config";
import { getI18n } from "@/i18n/dictionary";
import { routes } from "@/lib/routes";

/*
 * The desk the work happens at — the site's version of the <Setup/> story
 * highlight. No <Reveal> on the cards: they sit at the top of the page.
 */

export const ensureStatic = "navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getI18n();
  const path = (target: Locale) => routes.uses(target);

  return {
    title: messages.uses.title,
    description: messages.uses.description,
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

export default async function UsesPage() {
  const { locale, messages } = await getI18n();

  return (
    <main id="main" className="flex-1 py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          as="h1"
          eyebrow={messages.uses.eyebrow}
          title={messages.uses.heading}
          description={messages.uses.intro}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {usesGroups.map((group) => (
            <Card
              key={group.id}
              variant="elevated"
              padding="lg"
              className="flex flex-col gap-5"
            >
              <h2
                id={`uses-${group.id}`}
                className="font-mono text-label tracking-widest text-accent uppercase"
              >
                {group.title[locale]}
              </h2>
              <dl
                aria-labelledby={`uses-${group.id}`}
                className="flex flex-col gap-4"
              >
                {group.items.map((item) => (
                  <div key={item.name} className="flex flex-col gap-0.5">
                    <dt className="text-body font-medium text-fg">
                      {item.name}
                    </dt>
                    <dd className="text-small text-fg-muted">
                      {item.kind[locale]}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
