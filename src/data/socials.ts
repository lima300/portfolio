import type { ComponentType, SVGProps } from "react";

import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/ui/brand-icons";

import type { Localized } from "./types";

export type Social = {
  id: string;
  /** The platform name, used as the accessible label. */
  name: string;
  /** The handle, shown where there is room for it. */
  handle: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Why a visitor might click, in their language. */
  note: Localized;
  /** Shown in the footer and the contact section. */
  primary: boolean;
  /** Feeds the JSON-LD `Person.sameAs` array. */
  sameAs: boolean;
};

export const socials: readonly Social[] = [
  {
    id: "github",
    name: "GitHub",
    handle: "lima300",
    href: "https://github.com/lima300",
    icon: GitHubIcon,
    note: {
      en: "Code, including this site",
      "pt-br": "Código, incluindo este site",
    },
    primary: true,
    sameAs: true,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "otavio-lima-soares",
    href: "https://www.linkedin.com/in/otavio-lima-soares",
    icon: LinkedInIcon,
    note: { en: "The professional version", "pt-br": "A versão profissional" },
    primary: true,
    sameAs: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@otaviolima.dev",
    href: "https://www.instagram.com/otaviolima.dev",
    icon: InstagramIcon,
    note: {
      en: "30.8K developers, programming made simpler",
      "pt-br": "30,8 mil devs, programação de forma simples",
    },
    primary: true,
    sameAs: true,
  },
  {
    id: "threads",
    name: "Threads",
    handle: "@otaviolima.dev",
    href: "https://www.threads.net/@otaviolima.dev",
    // No mark of its own yet: Threads shares the Instagram handle and
    // audience, so it is listed for `sameAs` but not given a footer icon.
    icon: InstagramIcon,
    note: { en: "Shorter thoughts", "pt-br": "Pensamentos mais curtos" },
    primary: false,
    sameAs: true,
  },
] as const;

export const primarySocials = socials.filter((social) => social.primary);

/** Profile URLs for the JSON-LD `Person.sameAs` array. */
export const sameAs = socials
  .filter((social) => social.sameAs)
  .map((social) => social.href);
