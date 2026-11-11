/**
 * English is the source of truth for the message shape. Every other catalogue
 * is typed as `Messages`, so a missing or misspelled key is a build error
 * rather than a blank string in production.
 */
const en = {
  meta: {
    title: "Otávio Lima — Senior Frontend Engineer",
    titleTemplate: "%s — Otávio Lima",
    description:
      "Senior Frontend Engineer. I build fast, scalable web platforms: micro-frontends, design systems, and the developer experience around them.",
  },
  a11y: {
    skipToContent: "Skip to content",
    themeToggle: "Change colour theme",
    languageSwitch: "Change language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryNavigation: "Primary",
    socialLinks: "Elsewhere",
    verified: "Verified account",
    homeLink: "Otávio Lima — home",
  },
  theme: {
    system: "System",
    light: "Light",
    dark: "Dark",
  },
  nav: {
    work: "Work",
    about: "About",
    content: "Content",
    resume: "Résumé",
  },
  hero: {
    availability: "Open to Senior/Staff Frontend roles",
    headline: "Frontend that scales. Interfaces that feel effortless.",
    subline:
      "Senior Frontend Engineer, {years}+ years. I build micro-frontends, design systems and the developer experience around them. Remote from Brazil (GMT-3), with a working day that overlaps US hours.",
    viewWork: "View work",
    downloadResume: "Download résumé",
    copyEmail: "Copy email",
  },
  impact: {
    eyebrow: "By the numbers",
    heading: "What that work actually moved.",
  },
  work: {
    eyebrow: "Selected work",
    heading: "Platforms that stayed fast as they grew.",
    description:
      "Three systems, each answering the same question a shared frontend always runs into: how do several teams ship independently without breaking each other?",
    caseStudy: "Case study",
    viewLive: "Live",
    viewCode: "Code",
    confidential: "Client work — code and screenshots withheld",
    role: "Role",
  },
  caseStudy: {
    backToWork: "All work",
    tldr: "TL;DR",
    keyFigures: "Key figures",
    period: "Period",
    role: "Role",
    stack: "Stack",
    next: "Next case study",
    over: "over",
  },
  experience: {
    eyebrow: "Experience",
    heading: "Six years, mostly spent making large frontends smaller.",
    present: "Present",
    education: "Education",
    highlights: "Highlights",
  },
  skills: {
    eyebrow: "Capabilities",
    heading: "What I reach for, and what I reach for it to do.",
    description:
      "Grouped by the problem rather than the logo. No proficiency bars: a self-assigned 80% is not information.",
  },
  content: {
    eyebrow: "Content & community",
    heading: "I explain this work to 30,000 developers.",
    description:
      "Teaching the same architecture I ship has made me better at both. Explaining a trade-off to someone learning it is the fastest way to find out whether you understand it.",
    followLabel: "Follow on Instagram",
    mentoringEyebrow: "Mentoring",
    themesEyebrow: "What it covers",
    postsEyebrow: "Favourites",
    viewPost: "View on Instagram",
    postKinds: { reel: "Reel", carousel: "Carousel", post: "Post" },
  },
  testimonials: {
    eyebrow: "References",
    heading: "What the people I worked with say.",
  },
  about: {
    eyebrow: "About",
    heading: "The short, human version.",
    readMore: "More about me",
    factsEyebrow: "The practical details",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Let's build something that lasts.",
    body: "I'm open to Senior and Staff frontend roles, remote, working with US and global teams. The fastest way to reach me is email — one click copies it.",
    emailCopied: "Email copied to clipboard",
    emailCopyFailed: "Couldn't copy — the address is otavio.lima.vga@gmail.com",
    copyEmail: "Copy email",
    copied: "Copied",
  },
  localTime: {
    /** `{time}` is replaced with a locale-formatted clock. */
    label: "It's {time} in Brazil",
    morning: "probably on the first coffee ☕",
    afternoon: "probably deep in a refactor",
    evening: "probably recording something 🎥",
    night: "probably asleep — I'll reply in the morning",
  },
  footer: {
    builtWith: "Built with Next.js, TypeScript and Tailwind CSS.",
    sourceOnGithub: "Source on GitHub",
    colophon: "How this site was built",
    rights: "All rights reserved.",
  },
} as const;

/**
 * Widens every string literal to `string` while keeping the key structure
 * exact. Translations must provide the same keys, but obviously not the same
 * values — without this, `as const` would demand the English wording.
 */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Messages = Widen<typeof en>;

export default en;
