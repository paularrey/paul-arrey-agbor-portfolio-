export type ProjectStatus = "live" | "in-development";

export interface Project {
  slug: string;
  name: string;
  status: ProjectStatus;
  summary: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  previewImage?: string;
}

export const projects: Project[] = [
  {
    slug: "ravecard",
    name: "Ravecard",
    status: "in-development",
    summary:
      "Mobile-first fintech and digital utility payments app built around Nigerian payment workflows.",
    highlights: [
      "Multi-step checkout flows that separate form validation from payment confirmation, covering airtime and data, electricity (DisCos), cable TV, water, betting, gift cards, and subscriptions.",
      "Strict input rules, for example a \u20a650 minimum on airtime, enforced at the field level before a transaction can proceed.",
      "Wallet, transaction history, and notifications screens that mirror the flows a payments app needs day to day.",
      "Native-feeling bottom-tab mobile navigation with an installable-app setup.",
      "Circular provider badge system for selecting billers and utilities.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    liveUrl: "https://nexus-mauve-eta.vercel.app",
  },
  {
    slug: "dexmedix",
    name: "DexMedix",
    status: "live",
    summary:
      "Website and online booking system for a medical diagnostics laboratory in Makurdi.",
    highlights: [
      "Booking flow where patients choose walk-in or home sample collection, then a date and a 30-minute slot.",
      "Catalogue of six test departments with individual test pages.",
      "Four health-check package pages that pre-fill the booking form via query string.",
      "FAQ, contact, privacy, and terms pages.",
      "Floating WhatsApp and call shortcuts on every page.",
      "Fast, mobile-first layout built for low-bandwidth connections.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://dex-me-dix-kzs1.vercel.app",
  },
  // To add another project from github.com/paularrey, copy an entry above,
  // fill in the fields, and uncomment it. Every field except slug, name,
  // status, summary, highlights and stack is optional — the UI hides the
  // live/repository buttons for any URL you leave out.
  //
  // {
  //   slug: "example-project",
  //   name: "Example Project",
  //   status: "live",
  //   summary: "One sentence describing what the project does.",
  //   highlights: [
  //     "First concrete, verifiable detail about the build.",
  //     "Second concrete, verifiable detail about the build.",
  //   ],
  //   stack: ["Next.js", "TypeScript", "PostgreSQL"],
  //   liveUrl: "https://example.vercel.app",
  //   repoUrl: "https://github.com/paularrey/example-project",
  //   previewImage: "/projects/example-project.png",
  // },
  //
  // {
  //   slug: "another-project",
  //   name: "Another Project",
  //   status: "in-development",
  //   summary: "One sentence describing what the project does.",
  //   highlights: ["First detail about the build."],
  //   stack: ["React", "Node.js"],
  //   repoUrl: "https://github.com/paularrey/another-project",
  // },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);
