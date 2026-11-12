import { site } from "@/data/site";
import { GitHubIcon, WhatsAppIcon } from "@/components/icons";

const year = new Date().getFullYear();

const links = [
  { label: "GitHub", href: site.github.href, icon: "github" as const },
  { label: "WhatsApp", href: site.whatsapp.href, icon: "whatsapp" as const },
  { label: "Email", href: `mailto:${site.email}`, icon: "mail" as const },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-foreground">
            &copy; {year} {site.name}
          </p>
          <p className="font-mono text-[0.7rem] tracking-wider text-muted-foreground uppercase">
            Powered by {site.poweredBy}
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-2"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.icon === "mail"
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-hairline px-3.5 text-sm text-muted-foreground transition-colors hover:border-muted-foreground/40 hover:text-foreground"
            >
              {link.icon === "github" ? (
                <GitHubIcon className="size-4" />
              ) : link.icon === "whatsapp" ? (
                <WhatsAppIcon className="size-4" />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="size-4"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              )}
              {link.label}
              {link.icon !== "mail" ? (
                <span className="sr-only"> (opens in new tab)</span>
              ) : null}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
