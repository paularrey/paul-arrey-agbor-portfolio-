export const site = {
  name: "Paul Arrey Agbor",
  role: "Full-Stack Web Developer",
  location: "Makurdi, Benue State, Nigeria",
  timezone: "Africa/Lagos",
  email: "paulmichaelomega@gmail.com",
  whatsapp: {
    display: "+234 901 073 3157",
    href: "https://wa.me/2349010733157",
  },
  github: {
    display: "github.com/paularrey",
    href: "https://github.com/paularrey",
  },
  education: {
    degree: "B.Sc. Computer Science",
    school: "Joseph Sarwuan Tarka University, Makurdi",
    abbreviation: "JOSTUM",
  },
  coreStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
  ],
  poweredBy: "Echelon Technologies",
  description:
    "Full-Stack Web Developer in Makurdi, Nigeria, building Next.js, TypeScript and Node.js web applications.",
  /**
   * Flip `status` to "busy" to update the header availability dot.
   * Values: "available" | "busy"
   */
  availability: {
    status: "available" as "available" | "busy",
    label: "Available for work",
    busyLabel: "Currently booked",
    detail: "Open to freelance and remote projects",
  },
} as const;

export type Site = typeof site;

const PRODUCTION_SITE_URL = "https://paul-arrey-agbor-portfolio.vercel.app";

const isUsableSiteUrl = (value: string): boolean => {
  if (!/^https?:\/\//i.test(value)) return false;
  try {
    return new URL(value).hostname.length > 0;
  } catch {
    return false;
  }
};

const resolveSiteUrl = (): string => {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL?.trim(),
    PRODUCTION_SITE_URL,
  ];

  for (const candidate of candidates) {
    if (candidate && isUsableSiteUrl(candidate)) {
      return candidate.replace(/\/+$/, "");
    }
  }

  return PRODUCTION_SITE_URL;
};

export const siteUrl = resolveSiteUrl();

export const absoluteUrl = (path: string): string =>
  new URL(path, `${siteUrl}/`).toString();
