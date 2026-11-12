import { existsSync } from "node:fs";
import path from "node:path";
import { projects, type Project } from "@/data/projects";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";

function frameLabel(project: Project): string {
  const raw = project.liveUrl ?? project.repoUrl;
  if (!raw) return `/${project.slug}`;
  try {
    const url = new URL(raw);
    return `${url.host}${url.pathname}`;
  } catch {
    return `/${project.slug}`;
  }
}

function resolvePreview(project: Project): string | undefined {
  if (project.previewImage) return project.previewImage;

  const candidate = path.join(
    process.cwd(),
    "public",
    "projects",
    `${project.slug}.png`
  );

  return existsSync(candidate) ? `/projects/${project.slug}.png` : undefined;
}

export function WorkSection() {
  return (
    <section
      id="work"
      className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:py-20"
    >
      <SectionHeading
        index="/01 — Selected work"
        title="Things I have built"
        description="Two projects shipped against real Nigerian payment and healthcare workflows. Open a card for the technical breakdown."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal
            key={project.slug}
            delay={index * 0.07}
            className={index === 0 ? "md:col-span-2" : "md:col-span-1"}
          >
            <ProjectCard
              project={project}
              previewSrc={resolvePreview(project)}
              frameLabel={frameLabel(project)}
              className="h-full"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
