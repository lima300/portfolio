import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/features/theme-provider";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { ToastProvider } from "@/components/ui/toast";
import { bcp47, locales } from "@/i18n/config";
import { getI18n } from "@/i18n/dictionary";
import { I18nProvider } from "@/i18n/provider";
import { site } from "@/lib/site";

import "../globals.css";

/*
 * Inter with the SF-like stylistic sets enabled in `globals.css`
 * (`ss01`, `ss03`, `cv11`). Self-hosted by next/font, so no third-party
 * request and no layout shift.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Every locale is prerendered at build time. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getI18n();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: messages.meta.title,
      template: messages.meta.titleTemplate,
    },
    description: messages.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        "pt-BR": "/pt-br",
        "x-default": "/en",
      },
    },
    authors: [{ name: site.legalName, url: site.url }],
    creator: site.legalName,
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const { locale, messages } = await getI18n();

  return (
    <html
      lang={bcp47[locale]}
      // next-themes sets `data-theme` before hydration; React must accept the DOM.
      suppressHydrationWarning
      /*
       * `globals.css` sets `scroll-behavior: smooth`. This lets Next suspend it
       * for the duration of a route change, so navigating does not animate a
       * long scroll back to the top.
       */
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <I18nProvider locale={locale} messages={messages}>
            <ToastProvider>
              <a
                href="#main"
                className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-100 focus-visible:rounded-control focus-visible:bg-accent focus-visible:px-4 focus-visible:py-2 focus-visible:text-small focus-visible:font-medium focus-visible:text-accent-fg"
              >
                {messages.a11y.skipToContent}
              </a>
              <SiteHeader />
              {children}
              <SiteFooter />
            </ToastProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
