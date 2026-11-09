import { CopyEmail } from "@/components/features/copy-email";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Pill } from "@/components/ui/pill";
import { getI18n } from "@/i18n/dictionary";

/**
 * The closing call to action.
 *
 * Deliberately the last thing on the page and deliberately short: by the time
 * someone reaches it they have already decided, and the only job left is to
 * make the address one click away.
 */
export async function Contact() {
  const { messages } = await getI18n();

  return (
    <section id="contact" className="scroll-mt-24 border-t py-20 md:py-28">
      <Container className="flex flex-col items-start gap-6">
        <Pill dot>{messages.hero.availability}</Pill>

        <SectionHeading
          eyebrow={messages.contact.eyebrow}
          title={messages.contact.heading}
          description={messages.contact.body}
        />

        <CopyEmail variant="primary" size="lg" showAddress className="mt-2" />
      </Container>
    </section>
  );
}
