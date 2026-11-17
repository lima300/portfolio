import type { Metadata } from "next";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PhotoFigure } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { setupPhoto } from "@/data/photos";
import { usesGroups } from "@/data/uses";
import { getI18n } from "@/i18n/dictionary";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

/*
 * The desk the work happens at — the site's version of the <Setup/> story
 * highlight: a photo of the desk, then what is on it. No <Reveal> on the
 * cards or the photo: they sit at the top of the page.
 */

export const ensureStatic = "navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getI18n();

  return pageMetadata({
    locale,
    path: routes.uses,
    title: messages.uses.title,
    description: messages.uses.description,
  });
}

export default async function UsesPage() {
  const { locale, messages } = await getI18n();

  return (
    <main id="main" className="flex-1 py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <div className="grid items-end gap-10 md:grid-cols-3">
          <SectionHeading
            as="h1"
            eyebrow={messages.uses.eyebrow}
            title={messages.uses.heading}
            description={messages.uses.intro}
            className="md:col-span-2"
          />
          <PhotoFigure
            photo={setupPhoto}
            locale={locale}
            sizes="(min-width: 1024px) 340px, (min-width: 768px) 30vw, 100vw"
            eager
            className="mx-auto w-full max-w-sm md:max-w-none"
          />
        </div>

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
