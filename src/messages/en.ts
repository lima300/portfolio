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
    resume: "Résumé",
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
    moreInLab: "Side projects in the lab",
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
    before: "Before",
    after: "After",
    compare: "Compare before and after",
  },
  experience: {
    eyebrow: "Experience",
    heading: "{years}+ years, mostly spent making large frontends smaller.",
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
    more: "Everything on content & community",
  },
  contentPage: {
    title: "Content & community",
    description:
      "Otávio Lima's teaching and mentoring: a verified Instagram for 30,000 Brazilian developers, and three years of award-winning iTwin4Good teams.",
    intro:
      "Teaching the same architecture I ship has made me better at both. Here is the audience, the mentoring, what the account covers and the posts I'd start with.",
    nextHeading: "The work is what all of this is about.",
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
  resume: {
    title: "Résumé",
    role: "Senior Frontend Engineer",
    description:
      "Otávio Lima's résumé: Senior Frontend Engineer, micro-frontends and design systems. Print-ready, and always current.",
    print: "Print or save as PDF",
    summary: "Summary",
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    languages: "Languages",
  },
  aboutPage: {
    title: "About",
    description:
      "Who Otávio Lima is, how he works, and the practical details: location, working hours, languages.",
    heading: "Engineer, teacher, runner. Mostly in that order.",
    mentoringEyebrow: "Giving back",
    nextEyebrow: "Next",
    nextHeading: "The work is the better introduction.",
    seeWork: "See the work",
    readResume: "Read the résumé",
  },
  colophon: {
    title: "Colophon",
    description:
      "How this site is built: the stack, the decisions behind it, and the budgets it is held to.",
    eyebrow: "Colophon",
    heading: "How this site is built.",
  },
  lab: {
    title: "Lab",
    description:
      "Side projects and experiments by Otávio Lima: smaller than the case studies, and all open source.",
    eyebrow: "Lab",
    heading: "Smaller things, built to learn something.",
    intro:
      "Side projects outside the day job. Each one exists to try an idea properly — a framework model, a piece of mathematics — and each one is open source.",
    runDemo: "Run the live demo",
  },
  commands: {
    open: "Open command palette",
    label: "Command palette",
    placeholder: "Type a command or search…",
    empty: "Nothing matches that.",
    groups: {
      navigate: "Go to",
      caseStudies: "Case studies",
      actions: "Actions",
      elsewhere: "Elsewhere",
    },
    items: {
      home: "Home",
      work: "Selected work",
      about: "About",
      resume: "Résumé",
      lab: "Lab",
      content: "Content & community",
      uses: "Setup",
      colophon: "How this site was built",
      copyEmail: "Copy email address",
      themeSystem: "Use the system theme",
      themeLight: "Use the light theme",
      themeDark: "Use the dark theme",
      /** Written in the language it switches to. */
      switchLanguage: "Ler em português",
      shortcuts: "Show keyboard shortcuts",
      summary: "The 60-second version",
    },
  },
  shortcuts: {
    title: "Keyboard shortcuts",
    then: "then",
    close: "Close",
    items: {
      palette: "Open the command palette",
      home: "Go home",
      work: "Go to selected work",
      about: "Go to about",
      resume: "Go to the résumé",
      lab: "Go to the lab",
      theme: "Change the theme",
      help: "Show this list",
    },
  },
  recruiter: {
    open: "The 60-second version",
    title: "The 60-second version",
    close: "Close the summary",
    years: "{years}+ years",
    numbers: "In numbers",
    topWork: "Top projects",
    facts: "Practicalities",
    readCaseStudy: "Read the case study",
  },
  notFound: {
    title: "Page not found",
    eyebrow: "404",
    heading: "Nothing here but a UFO.",
    body: "I'm from Varginha, Brazil's UFO city, so this was bound to happen eventually. The address below doesn't lead anywhere. Want it gone?",
    brokenLabel: "The address that led nowhere",
    abduct: "Beam it up",
    abducted: "Taken. Somewhere real, instead:",
    home: "Home",
    work: "Selected work",
    about: "About",
    paletteHint: "Or press {shortcut} to search the whole site.",
  },
  delight: {
    awayTitle: "☕ Coffee break? Come back!",
    console: {
      greeting: "Hey, curious dev 👀",
      body: "I'm from Varginha, the UFO city 🛸. The source of this site is on GitHub:",
      cta: "Press ⌘K for everything else, or copy my email from the contact section. Let's talk.",
    },
  },
  uses: {
    title: "Uses",
    description:
      "The setup Otávio Lima works at: computer, screens, keyboards and desk.",
    eyebrow: "Setup",
    heading: "The desk the work happens at.",
    intro:
      "The hardware on the desk, item by item: the machine, the screens, the keyboards and the desk itself.",
  },
  footer: {
    builtWith: "Built with Next.js, TypeScript and Tailwind CSS.",
    sourceOnGithub: "Source on GitHub",
    colophon: "How this site was built",
    uses: "Setup",
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
