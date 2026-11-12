export interface StackGroup {
  id: string;
  title: string;
  description: string;
  items: { name: string; detail: string }[];
}

export const stackGroups: StackGroup[] = [
  {
    id: "frontend",
    title: "Frontend & UI Systems",
    description:
      "Interfaces are typed end to end and composed from a small, reusable component layer.",
    items: [
      {
        name: "Next.js",
        detail:
          "App Router with server components by default; route handlers for the contact endpoint, sitemap, and robots.",
      },
      {
        name: "React",
        detail:
          "Client components only where state is required: forms, dialogs, and the live clock.",
      },
      {
        name: "TypeScript",
        detail:
          "Strict mode across the project, with shared types for projects and the contact schema.",
      },
      {
        name: "Tailwind CSS",
        detail:
          "Design tokens defined in CSS with @theme so colours and spacing stay in one place.",
      },
      {
        name: "shadcn/ui",
        detail:
          "Accessible dialog, form, and button primitives copied into the repo and restyled to the design system.",
      },
      {
        name: "Framer Motion",
        detail:
          "Scroll reveals and hover transitions, disabled automatically under prefers-reduced-motion.",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & Data",
    description:
      "Server code stays small: validate input once, send it once, and keep secrets out of the client bundle.",
    items: [
      {
        name: "Node.js",
        detail:
          "Route handlers that validate with a shared zod schema before any delivery attempt is made.",
      },
      {
        name: "PostgreSQL",
        detail:
          "Relational storage for transactional data and structured records in the applications built so far.",
      },
      {
        name: "Zod",
        detail:
          "One schema used by both the client form and the API route, so validation rules never drift apart.",
      },
      {
        name: "Resend",
        detail:
          "Primary transactional email transport for the contact form when an API key is configured.",
      },
      {
        name: "Nodemailer",
        detail:
          "SMTP fallback for the contact form when Resend is not configured.",
      },
      {
        name: "Rate limiting",
        detail:
          "Per-IP in-memory throttle plus a honeypot field on the contact endpoint to blunt scripted abuse.",
      },
    ],
  },
  {
    id: "tooling",
    title: "Tooling & Deployment",
    description:
      "The boring parts: static analysis, repeatable builds, and a deployment path with no manual steps.",
    items: [
      {
        name: "Git",
        detail:
          "Trunk-based commits with reviewable diffs; source lives at github.com/paularrey.",
      },
      {
        name: "ESLint",
        detail:
          "eslint-config-next with the TypeScript ruleset, run before every build.",
      },
      {
        name: "Vercel",
        detail:
          "Preview and production deployments with environment variables set in the dashboard.",
      },
      {
        name: "Lenis",
        detail:
          "Smooth scrolling for the single-page layout, skipped entirely when reduced motion is requested.",
      },
      {
        name: "Sonner",
        detail:
          "Toast notifications for form submission states.",
      },
    ],
  },
];
