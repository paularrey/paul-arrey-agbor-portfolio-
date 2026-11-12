# paul-portfolio

Personal engineering portfolio for Paul Arrey Agbor. Single-page Next.js site with selected work, stack, background, and a contact form.

## Overview

- Single page with anchored sections: Work, Stack, About, Contact.
- Project data lives in `src/data/projects.ts`; no component edits needed to add a project.
- Contact form posts to `src/app/api/contact/route.ts`. Resend is the primary transport, Nodemailer the SMTP fallback, and the route returns `503 { "fallback": true }` when neither is configured.
- Metadata, Open Graph, Twitter card, sitemap, robots, and Person JSON-LD are defined in `src/app/layout.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts`.

## Folder structure

```
src/
  app/
    api/contact/route.ts   contact form endpoint
    globals.css            Tailwind v4 theme tokens (@theme)
    layout.tsx             metadata, fonts, JSON-LD, providers
    page.tsx               section composition
    robots.ts
    sitemap.ts
    icon.svg               emerald "P" favicon
  components/              section and interaction components
    ui/                    shadcn/ui primitives (button, dialog, input, label, textarea)
  data/
    projects.ts            project list
    site.ts                identity, links, availability, absolute URL helpers
    stack.ts               stack matrix content
  lib/
    contact-schema.ts      zod schema shared by the form and the API route
    utils.ts               cn() helper
public/
  paul.jpg                 photo used for Open Graph / Twitter cards
  projects/                optional project screenshots (not tracked by default)
```

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript strict
- Tailwind CSS v4 (theme defined in `src/app/globals.css` with `@theme`, no `tailwind.config.js`)
- Geist Sans and Geist Mono via the `geist` package
- shadcn/ui primitives, Radix UI
- react-hook-form + zod (one schema for client and server)
- Resend, Nodemailer
- framer-motion, lenis, canvas-confetti, sonner, lucide-react

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run lint
npm run build
```

## Environment

Copy `.env.example` to `.env.local` and fill in what you need.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Enables Resend delivery for the contact form. |
| `CONTACT_TO_EMAIL` | Recipient. Defaults to `paulmichaelomega@gmail.com`. |
| `CONTACT_FROM_EMAIL` | Sender. Must be verified in Resend. Defaults to `onboarding@resend.dev`. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | SMTP fallback. Ignored when `RESEND_API_KEY` is set. |
| `NEXT_PUBLIC_SITE_URL` | Public origin used for `metadataBase`, Open Graph, sitemap, and robots. Defaults to `http://localhost:3000`. |

Delivery order:

1. `RESEND_API_KEY` set -> Resend.
2. Otherwise `SMTP_HOST` + `SMTP_USER` + `SMTP_PASS` set -> Nodemailer.
3. Otherwise -> `503 { "fallback": true }` and the UI shows direct email and WhatsApp buttons.

No environment value is ever sent to the client.

## Adding a project

Edit `src/data/projects.ts`. Every entry needs `slug`, `name`, `status` (`"live"` or `"in-development"`), `summary`, `highlights`, and `stack`. The rest are optional:

```ts
{
  slug: "example-project",
  name: "Example Project",
  status: "live",
  summary: "One sentence describing what the project does.",
  highlights: [
    "First concrete, verifiable detail about the build.",
    "Second concrete, verifiable detail about the build.",
  ],
  stack: ["Next.js", "TypeScript", "PostgreSQL"],
  liveUrl: "https://example.vercel.app",
  repoUrl: "https://github.com/paularrey/example-project",
  previewImage: "/projects/example-project.png",
}
```

Leave `liveUrl` or `repoUrl` undefined and the corresponding button is not rendered. Two commented-out example entries sit at the bottom of the file.

Order matters: the first project renders as the wide card in the grid.

## Adding screenshots

1. Export the screenshot as a PNG named after the project slug: `public/projects/<slug>.png`, for example `public/projects/ravecard.png`.
2. Restart the dev server (or rebuild). The file is detected at build time and rendered inside a browser-chrome frame.
3. Alternatively set `previewImage: "/projects/<slug>.png"` explicitly in the project entry.

When no screenshot exists the card renders a fallback: the project monogram and the route path in mono. There are no broken images, iframes, or hotlinked screenshot services.

## Replacing the social preview photo

`public/paul.jpg` is used as the Open Graph and Twitter card image.

1. Replace the file in place. Keep the name `paul.jpg`.
2. Recommended size is 1200 x 630 (landscape). Any dimensions work: read them from the file and update `width` and `height` in the `openGraph.images` and `twitter.images` arrays in `src/app/layout.tsx`.
3. Do not add `opengraph-image.tsx` or any generated OG image. The static file is the source of truth.

## Deploying to Vercel

1. Push the repository to GitHub and import it in Vercel.
2. Framework preset: Next.js. Build command `next build`, output handled automatically.
3. Set environment variables in **Project Settings > Environment Variables** for Production and Preview:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` (for example `https://your-domain.com`)
   - Optionally the `SMTP_*` variables as a fallback.
4. Deploy. Verify `/sitemap.xml`, `/robots.txt`, and the favicon, then test the contact form end to end.

## Checks

```bash
npm run lint
npm run build
```

Both must pass with zero errors before shipping.
