import Link from "next/link";

import { LocalTime } from "@/components/features/local-time";
import { Container } from "@/components/ui/container";
import { primarySocials } from "@/data/socials";
import { getI18n } from "@/i18n/dictionary";
import { getBrazilTimeSnapshot, getCurrentYear } from "@/lib/build-time";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

/**
 * A Server Component, with two client leaves: the live clock and — in the
 * contact section above it — the clipboard button. Everything else here is
 * static HTML.
 */
export async function SiteFooter() {
  const { locale, messages } = await getI18n();
  const [year, snapshot] = await Promise.all([
    getCurrentYear(),
    getBrazilTimeSnapshot(locale),
  ]);

  return (
    <footer className="border-t print:hidden">
      <Container className="flex flex-col gap-10 py-12 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-small font-medium">{site.name}</p>
            <LocalTime initial={snapshot} />
          </div>

          <nav aria-label={messages.a11y.socialLinks}>
            <ul className="flex flex-col gap-3">
              {primarySocials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="me noreferrer"
                    className="group inline-flex items-center gap-3 text-small text-fg-muted transition-colors duration-200 hover:text-accent"
                  >
                    <social.icon className="size-4 shrink-0" />
                    <span className="font-medium text-fg group-hover:text-accent">
                      {social.name}
                    </span>
                    <span className="text-fg-subtle">
                      {social.note[locale]}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t pt-8 text-label text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {messages.footer.rights}
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{messages.footer.builtWith}</span>
            <a
              href={site.repo}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-fg-muted underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
            >
              {messages.footer.sourceOnGithub}
            </a>
            <Link
              href={routes.uses(locale)}
              className="font-medium text-fg-muted underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
            >
              {messages.footer.uses}
            </Link>
            <Link
              href={routes.colophon(locale)}
              className="font-medium text-fg-muted underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
            >
              {messages.footer.colophon}
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
