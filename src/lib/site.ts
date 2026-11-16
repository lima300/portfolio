/**
 * Site-wide constants. Anything that appears in metadata, JSON-LD, the
 * sitemap, the footer or a social link is defined once, here.
 */

export const site = {
  name: "Otávio Lima",
  legalName: "Otávio de Lima Soares",
  role: "Senior Frontend Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://otaviolima.dev",
  email: "otavio.lima.vga@gmail.com",
  timeZone: "America/Sao_Paulo",
  location: "Brazil",
  repo: "https://github.com/lima300/portfolio",
  socials: {
    github: "https://github.com/lima300",
    linkedin: "https://www.linkedin.com/in/otavio-lima-soares",
    instagram: "https://www.instagram.com/otaviolima.dev",
    threads: "https://www.threads.net/@otaviolima.dev",
  },
} as const;

export type Site = typeof site;
