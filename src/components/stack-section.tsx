import { stackGroups } from "@/data/stack";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function StackSection() {
  return (
    <section
      id="stack"
      className="mx-auto max-w-6xl scroll-mt-28 border-t border-hairline px-4 py-16 sm:py-20"
    >
      <SectionHeading
        index="/02 — Stack and capabilities"
        title="What I work with"
        description="No progress bars. Each tool is listed with the job it actually does."
      />

      <div className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-3">
        {stackGroups.map((group, index) => (
          <Reveal
            key={group.id}
            delay={index * 0.07}
            className="flex flex-col bg-surface"
          >
            <div className="border-b border-hairline p-5">
              <h3 className="text-base font-medium tracking-tight text-foreground">
                {group.title}
              </h3>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-muted-foreground">
                {group.description}
              </p>
            </div>

            <ul className="flex flex-col p-5">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="border-t border-hairline py-3.5 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <p className="text-sm font-medium text-foreground">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[0.82rem] leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
