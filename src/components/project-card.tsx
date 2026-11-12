"use client";

import Image from "next/image";
import { ArrowUpRight, ExternalLink, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GitHubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/data/projects";

function monogram(name: string): string {
  return name.replace(/[^A-Za-z]/g, "").slice(0, 1).toUpperCase() || "?";
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const live = status === "live";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.68rem] tracking-wider uppercase",
        live
          ? "border-signal/35 bg-signal/10 text-signal"
          : "border-hairline bg-background/60 text-muted-foreground"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          live ? "bg-signal" : "border border-muted-foreground/70"
        )}
      />
      {live ? "Live" : "In development"}
    </span>
  );
}

export function ProjectCard({
  project,
  previewSrc,
  frameLabel,
  className,
}: {
  project: Project;
  previewSrc?: string;
  frameLabel: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-hairline bg-surface transition-colors duration-200 hover:border-muted-foreground/35",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-hairline bg-background/50 px-3.5 py-2.5">
        <span aria-hidden="true" className="size-2 rounded-full bg-hairline" />
        <span aria-hidden="true" className="size-2 rounded-full bg-hairline" />
        <span aria-hidden="true" className="size-2 rounded-full bg-hairline" />
        <span className="ml-2 truncate font-mono text-[0.7rem] text-muted-foreground">
          {frameLabel}
        </span>
      </div>

      <div className="grid-texture relative aspect-[16/10] overflow-hidden border-b border-hairline bg-background">
        {previewSrc ? (
          <Image
            src={previewSrc}
            alt={`${project.name} interface preview`}
            fill
            sizes="(min-width: 768px) 66vw, 100vw"
            className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="grid-texture absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="font-mono text-5xl font-medium tracking-tight text-muted-foreground/40 transition-colors duration-300 group-hover:text-signal/65 sm:text-6xl"
            >
              {monogram(project.name)}
            </span>
            <span className="font-mono text-[0.68rem] tracking-widest text-muted-foreground uppercase">
              No preview yet
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          <h3 className="text-lg font-medium tracking-tight text-foreground">
            {project.name}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-hairline px-2 py-1 font-mono text-[0.68rem] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-hairline pt-4">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
            >
              Live site
              <ExternalLink aria-hidden="true" className="size-3.5" />
              <span className="sr-only"> for {project.name} (opens in new tab)</span>
            </a>
          ) : null}

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-hairline px-3.5 text-sm text-foreground transition-colors hover:border-muted-foreground/40 hover:bg-surface-2"
            >
              <GitHubIcon className="size-3.5" />
              Repository
              <span className="sr-only"> for {project.name} (opens in new tab)</span>
            </a>
          ) : null}

          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="ml-auto inline-flex h-11 items-center gap-1.5 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <FileText aria-hidden="true" className="size-3.5" />
                Breakdown
              </button>
            </DialogTrigger>

            <DialogContent className="gap-0 overflow-hidden border border-hairline bg-surface p-0 shadow-2xl sm:max-w-xl">
              <div className="max-h-[78vh] overflow-y-auto p-5 pr-12 sm:p-6 sm:pr-12">
                <DialogHeader className="gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={project.status} />
                    <span className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
                      {frameLabel}
                    </span>
                  </div>
                  <DialogTitle className="text-xl font-medium tracking-tight">
                    {project.name}
                  </DialogTitle>
                  <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6">
                  <h4 className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
                    Technical breakdown
                  </h4>
                  <ul className="mt-3 flex flex-col gap-3">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-relaxed text-foreground/85"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1 shrink-0 rounded-full bg-signal"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
                    Stack
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded border border-hairline px-2 py-1 font-mono text-[0.68rem] text-muted-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-5">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
                    >
                      Visit live site
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  ) : null}

                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-hairline px-3.5 text-sm text-foreground transition-colors hover:border-muted-foreground/40 hover:bg-surface-2"
                    >
                      <GitHubIcon className="size-3.5" />
                      Repository
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </article>
  );
}
