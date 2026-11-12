"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

const clockFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.timezone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export function SiteHeader() {
  const [time, setTime] = useState<string | null>(null);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const tick = () => setTime(clockFormatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const available = site.availability.status === "available";
  const statusLabel = available
    ? site.availability.label
    : site.availability.busyLabel;

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 px-4">
        <a
          href="#top"
          className="order-1 flex h-14 items-center text-sm font-medium tracking-tight text-foreground"
        >
          {site.name}
        </a>

        <div className="order-2 ml-auto flex h-14 items-center gap-2.5 sm:order-3">
          <span
            aria-hidden="true"
            className={cn(
              "size-2 shrink-0 rounded-full",
              available ? "bg-signal" : "bg-amber-500"
            )}
          />
          <span className="hidden text-xs text-muted-foreground lg:inline">
            {statusLabel}
          </span>
          <span
            className="font-mono text-xs text-muted-foreground tabular-nums"
            aria-label={
              time ? `Current time in Makurdi, ${time} WAT` : "Loading local time"
            }
          >
            {time ?? "--:--:--"}
            <span aria-hidden="true" className="ml-1 text-muted-foreground/70">
              WAT
            </span>
          </span>
        </div>

        <nav
          aria-label="Sections"
          className="order-3 -mx-1 flex w-[calc(100%+0.5rem)] shrink-0 items-center gap-0.5 overflow-x-auto border-t border-hairline px-1 sm:order-2 sm:mx-0 sm:w-auto sm:border-t-0 sm:px-0"
        >
          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex h-11 shrink-0 items-center gap-1.5 rounded-md px-3 text-sm transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-1.5 rounded-full transition-colors",
                    isActive ? "bg-signal" : "bg-transparent"
                  )}
                />
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
