import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { GitHubIcon, WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";

const meta = [
  { label: "Role", value: site.role },
  { label: "Based in", value: site.location },
  { label: "Education", value: `${site.education.degree}, ${site.education.abbreviation}` },
  { label: "Core stack", value: site.coreStack.join(", ") },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-texture pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(120%_80%_at_50%_0%,black,transparent)]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-28">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              {site.role} &mdash; {site.location.split(",")[0]}, Nigeria
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-5 max-w-3xl text-[2rem] leading-[1.12] font-medium tracking-tight text-balance sm:text-[2.75rem] lg:text-[3.5rem]">
              I ship reliable full-stack and fintech web software, from
              multi-step payment flows to production booking systems.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
              Next.js, TypeScript, Tailwind CSS, and Node.js, end to end.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <a
                href="#work"
                className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
              >
                View selected work
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>

              <a
                href={site.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-hairline bg-surface px-4 text-sm text-foreground transition-colors hover:border-muted-foreground/40 hover:bg-surface-2"
              >
                <GitHubIcon className="size-4" />
                GitHub
              </a>

              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-hairline bg-surface px-4 text-sm text-foreground transition-colors hover:border-muted-foreground/40 hover:bg-surface-2"
              >
                <WhatsAppIcon className="size-4" />
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.24} className="lg:col-span-4">
          <div className="flex h-full flex-col justify-between gap-6 rounded-xl border border-hairline bg-surface p-5">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-signal"
              />
              <span className="font-mono text-xs tracking-wider text-signal uppercase">
                {site.availability.status === "available"
                  ? site.availability.label
                  : site.availability.busyLabel}
              </span>
            </div>

            <dl className="flex flex-col gap-3.5">
              {meta.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-hairline pb-3 last:border-0 last:pb-0"
                >
                  <dt className="font-mono text-[0.7rem] tracking-wider text-muted-foreground uppercase">
                    {row.label}
                  </dt>
                  <dd className="text-[0.82rem] leading-snug text-foreground">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex items-center gap-2 border-t border-hairline pt-4 text-muted-foreground">
              <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
              <span className="font-mono text-[0.72rem] tracking-wide">
                {site.location}
              </span>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-12">
          <Link
            href="#work"
            className="inline-flex h-11 items-center font-mono text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            Scroll to selected work &darr;
          </Link>
        </div>
      </div>
    </section>
  );
}
