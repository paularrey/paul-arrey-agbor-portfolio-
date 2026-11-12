import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const paragraphs = [
  "I am a full-stack web developer based in Makurdi, Benue State, Nigeria. I build web applications end to end: interface, API, and database.",
  "My work so far has concentrated on two areas that matter locally \u2014 payments and healthcare access. Ravecard models Nigerian utility, airtime, and bill payment flows. DexMedix lets patients at a diagnostics laboratory in Makurdi book a collection slot online.",
  "I read Computer Science, and I care about the unglamorous parts: validation that runs before money moves, layouts that hold up on a 360px screen, and code the next person can read.",
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl scroll-mt-28 border-t border-hairline px-4 py-16 sm:py-20"
    >
      <SectionHeading
        index="/03 — Education and background"
        title="Where I come from"
      />

      <div className="grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="flex h-full flex-col gap-4">
            <div className="overflow-hidden rounded-xl border border-hairline bg-surface p-4">
              <div className="relative mx-auto w-full max-w-[220px] overflow-hidden rounded-lg border border-hairline">
                <Image
                  src="/paul.jpg"
                  alt="Paul Arrey Agbor, Full-Stack Web Developer"
                  width={288}
                  height={480}
                  className="h-auto w-full grayscale-[35%] transition-[filter] duration-500 hover:grayscale-0"
                />
              </div>
              <p className="mt-4 text-center font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
                {site.name}
              </p>
            </div>

            <div className="rounded-xl border border-hairline bg-surface p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap aria-hidden="true" className="size-4" />
                <span className="font-mono text-[0.7rem] tracking-widest uppercase">
                  Education
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">
                {site.education.degree}
              </p>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted-foreground">
                {site.education.school} ({site.education.abbreviation})
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-8">
          <div className="flex h-full flex-col gap-5 rounded-xl border border-hairline bg-surface p-5 sm:p-7">
            <div className="flex flex-col gap-4">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-[0.95rem] leading-relaxed text-foreground/85"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-auto border-t border-hairline pt-5">
              <h3 className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
                Core stack
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {site.coreStack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded border border-hairline px-2.5 py-1.5 font-mono text-[0.7rem] text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
