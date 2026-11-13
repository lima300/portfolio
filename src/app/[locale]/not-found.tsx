import type { Metadata } from "next";

import { UfoAbduction } from "@/components/features/ufo-abduction";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getI18n } from "@/i18n/dictionary";

/*
 * The 404, inside the site's own layout — header, footer, ⌘K and all — so a
 * dead link lands somewhere that still works. Reached by `notFound()` (an
 * unknown case study) and by any unmatched path, through `[...missing]`.
 * Next adds `noindex` on its own.
 */

export async function generateMetadata(): Promise<Metadata> {
  const { messages } = await getI18n();
  return { title: messages.notFound.title };
}

export default async function NotFound() {
  const { messages } = await getI18n();

  return (
    <main id="main" className="flex-1 py-20 md:py-28">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading
          as="h1"
          align="center"
          eyebrow={messages.notFound.eyebrow}
          title={messages.notFound.heading}
          description={messages.notFound.body}
        />
        <UfoAbduction />
      </Container>
    </main>
  );
}
