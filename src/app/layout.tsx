import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, site, siteUrl } from "@/data/site";

const title = "Paul Arrey Agbor | Full-Stack Web Developer";
const description =
  "Full-Stack Web Developer in Makurdi, Nigeria, building Next.js, TypeScript and Node.js web applications.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Paul Arrey Agbor",
    "Full-Stack Web Developer",
    "Next.js developer Nigeria",
    "TypeScript developer Makurdi",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: site.name,
    url: absoluteUrl("/"),
    title,
    description,
    images: [
      {
        url: "/paul.jpg",
        width: 288,
        height: 480,
        alt: "Paul Arrey Agbor, Full-Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: "/paul.jpg",
        width: 288,
        height: 480,
        alt: "Paul Arrey Agbor, Full-Stack Web Developer",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: absoluteUrl("/"),
  image: absoluteUrl("/paul.jpg"),
  sameAs: [site.github.href],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: `${site.education.school} (${site.education.abbreviation})`,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Makurdi",
    addressRegion: "Benue State",
    addressCountry: "NG",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:inline-flex focus:h-11 focus:items-center focus:rounded-lg focus:bg-primary focus:px-4 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-2 focus:outline-offset-2 focus:outline-ring"
        >
          Skip to content
        </a>

        <Providers>
          <SiteHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
