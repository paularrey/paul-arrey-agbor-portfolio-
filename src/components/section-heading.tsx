import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  title,
  description,
  className,
}: {
  index: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-3 border-b border-hairline pb-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-8",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {index}
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-right">
          {description}
        </p>
      ) : null}
    </div>
  );
}
