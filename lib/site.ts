/**
 * Single source of truth for site copy. Nothing here is invented:
 * every string maps to the brief.
 */
export const site = {
  name: "Sifat",
  /**
   * Primary navigation. Five items, each pointing at a real anchor: `Projects`
   * is the work index, `Services` is the discipline list inside About, and
   * `Education` is the journey rail. Order matters twice over: the glass dock
   * splits this list around the CTA - two on the left, three on the right - and
   * the footer reads the same array top to bottom. `glass-nav.tsx` mirrors that
   * split by hand for its gooey indices, so a change here has to land there too.
   */
  nav: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
  /**
   * Real routes, as opposed to the anchors above. The footer renders these and
   * the dock ignores them: every dock link is an in-page anchor.
   */
  pages: [
    { label: "Gallery", href: "/gallery" },
    { label: "Tools & stack", href: "/tools" },
    { label: "Resources", href: "/resources" },
    { label: "Blog", href: "/blog" },
  ],
  /** The one call to action, shared by the nav dock and the top bar. */
  cta: { label: "LET\u2019S TALK", href: "#contact" },
  footer: {
    line: "LET\u2019S BUILD",
    role: "Frontend, UI and graphic design.",
    note: "Independent builder \u2014 working with teams everywhere.",
    backToTop: "Back to top",
    legal: "ALL RIGHTS RESERVED",
    wordmark: ["MASABUR", "RAHMAN", "SIFAT"] as const,
    contact: {
      heading: "Ready to create",
      email: "masabur.rahman.sifat@outlook.com",
      location: "Bangladesh \u2022 UTC+6",
      blurb:
        "Available for international design systems, editorial web engineering, and select architectural commissions.",
    },
    columns: [
      {
        heading: "Site",
        links: [
          { label: "Home", href: "#home" },
          { label: "Projects", href: "#work" },
          { label: "Services", href: "#services" },
          { label: "About", href: "#about" },
          { label: "Education", href: "#education" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        heading: "Extras",
        links: [
          { label: "Gallery", href: "/gallery" },
          { label: "Tools & stack", href: "/tools" },
          { label: "Blog", href: "/blog" },
          { label: "Free resources", href: "/resources" },
        ],
      },
      {
        heading: "Follow",
        links: [
          { label: "GitHub", href: "https://github.com/sifat-rahman1/" },
          { label: "X", href: "#contact" },
          { label: "Behance", href: "#contact" },
          { label: "Dribbble", href: "#contact" },
        ],
      },
    ] as const,
  },
  hero: {
    eyebrow: "Web Development \u2022 UI/UX \u2022 Graphic Design",
    headline: "Sifat builds websites that don\u2019t look like templates.",
    subline: "Frontend, UI, and whatever\u2019s needed to make it work.",
    watermark: "SIFAT",
    availability: "Available for select work",
    primaryCta: { label: "See selected work", href: "#work" },
    secondaryCta: { label: "Hire me", href: "#contact" },
  },
  work: {
    index: "02",
    label: "Selected work",
    title: "Built from the ground up, never assembled from a kit.",
    intro:
      "Five projects \u2014 agency sites, landing pages and product apps. Open any of them and you will find a decision behind every spacing rule.",
  },
  about: {
    index: "03",
    label: "About",
    lead: "I\u2019m Sifat \u2014 a designer and AI-native web builder.",
    paragraphs: [
      "I\u2019ve always been curious about technology. Today, I use that curiosity to build websites and digital products through frontend development, UI/UX, graphic design, and AI-assisted workflows.",
      "AI helps me explore ideas and move through repetitive work faster, but I don\u2019t treat its first output as finished. I make the decisions around structure, typography, spacing, responsiveness, and interaction\u2014then test and refine everything until it feels intentional.",
      "I\u2019ve built agency sites, a local service platform, a moving planner, and an experimental AI content app. These projects have taught me to think beyond appearance and pay attention to performance, accessibility, and whether a feature actually works.",
      "I\u2019m still learning, and I\u2019m open about it. I show the tools I use, label experimental work honestly, and take responsibility for what I publish. I want every project to feel useful, considered, and worth trusting.",
    ],
    specs: [
      { term: "Discipline", detail: "Frontend, UI, graphic design" },
      { term: "Approach", detail: "Design instinct + AI tooling" },
      { term: "Pace", detail: "Rapid, iterative execution" },
      { term: "Output", detail: "Real, working projects" },
    ],
  },
  contact: {
    index: "05",
    label: "Hire me",
    title: "Hire me.",
    lead: "Tell me what you\u2019re building. I\u2019ll come back with the next steps.",
    brief: [
      "What you\u2019re making, and who it\u2019s for",
      "What already exists \u2014 sketches, copy, a half-built repo",
      "When you need it, and what \u201cdone\u201d looks like",
    ],
    fields: {
      name: { label: "01 / Name", placeholder: "Your name or studio" },
      email: { label: "02 / Email", placeholder: "you@studio.com" },
      brief: {
        label: "03 / The brief",
        placeholder: "Project, scope, timeline\u2026",
      },
    },
    submit: "Send the brief",
    note: "Every brief gets a reply \u2014 no newsletters, no follow-up sequences.",
  },
  meta: {
    title: "Masabur Rahman Sifat ■ Creative Engineer & UI/UX Designer",
    description:
      "Bespoke, high-contrast digital agency portfolio, frontend engineering, and UI/UX design systems by Masabur Rahman Sifat.",
  },
} as const

export type Site = typeof site
