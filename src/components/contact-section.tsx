"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Check, Copy, Info, LoaderCircle, Mail, Send } from "lucide-react";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { site } from "@/data/site";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GitHubIcon, WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Outcome = "idle" | "success" | "error" | "fallback";

function celebrate() {
  confetti({
    particleCount: 42,
    spread: 52,
    startVelocity: 26,
    ticks: 150,
    gravity: 1.1,
    origin: { x: 0.5, y: 0.75 },
    colors: ["#10b981", "#ededf0", "#6ee7b7"],
    disableForReducedMotion: true,
  });
}

const fieldClass =
  "h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/70";

export function ContactSection() {
  const [outcome, setOutcome] = useState<Outcome>("idle");
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValidating, isSubmitting },
  } = useForm<ContactValues, unknown, ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  const clearOutcome = () =>
    setOutcome((current) => (current === "idle" ? current : "idle"));

  const busy = isValidating || isSubmitting;
  const showDirect = outcome === "error" || outcome === "fallback";

  const submitLabel = isValidating
    ? "Checking..."
    : isSubmitting
      ? "Sending..."
      : outcome === "success"
        ? "Sent"
        : "Send message";

  async function onSubmit(values: ContactValues) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.status === 503) {
        const data = (await response.json().catch(() => null)) as {
          fallback?: boolean;
        } | null;
        if (data?.fallback) {
          setOutcome("fallback");
          toast.info("No mail server is configured yet. Use email or WhatsApp.");
          return;
        }
      }

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setOutcome("error");
        toast.error(data?.error ?? "The message could not be sent.");
        return;
      }

      setOutcome("success");
      reset();
      toast.success("Message sent. I will get back to you.");
      celebrate();
    } catch {
      setOutcome("error");
      toast.error("Network error. Please try again.");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
      toast.success("Email address copied.");
    } catch {
      toast.error("Could not copy. Select the address instead.");
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-28 border-t border-hairline px-4 py-16 sm:py-20"
    >
      <div className="mb-8 flex flex-col gap-3 border-b border-hairline pb-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            /04 — Contact
          </span>
          <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            Start a conversation
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-right">
          Tell me what you are building. Messages go straight to my inbox.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-xl border border-hairline bg-surface p-5 sm:p-6"
          >
            {/* Honeypot: hidden from humans, tempting to bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name" className="text-xs text-muted-foreground">
                  Name
                </Label>
                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  className={cn(fieldClass, errors.name && "border-destructive")}
                  {...register("name", { onChange: clearOutcome })}
                />
                <FieldError message={errors.name?.message} />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-xs text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  className={cn(fieldClass, errors.email && "border-destructive")}
                  {...register("email", { onChange: clearOutcome })}
                />
                <FieldError message={errors.email?.message} />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-1.5">
              <Label htmlFor="subject" className="text-xs text-muted-foreground">
                Subject
              </Label>
              <Input
                id="subject"
                placeholder="What is this about?"
                aria-invalid={Boolean(errors.subject)}
                className={cn(
                  fieldClass,
                  errors.subject && "border-destructive"
                )}
                {...register("subject", { onChange: clearOutcome })}
              />
              <FieldError message={errors.subject?.message} />
            </div>

            <div className="mt-4 flex flex-col gap-1.5">
              <Label htmlFor="message" className="text-xs text-muted-foreground">
                Message
              </Label>
              <Textarea
                id="message"
                rows={6}
                placeholder="A few sentences about the project, timeline, and budget if you have one."
                aria-invalid={Boolean(errors.message)}
                className={cn(
                  "min-h-[9rem] rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70",
                  errors.message && "border-destructive"
                )}
                {...register("message", { onChange: clearOutcome })}
              />
              <FieldError message={errors.message?.message} />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-hairline pt-5">
              <button
                type="submit"
                disabled={busy}
                className="inline-flex h-11 min-w-[10.5rem] items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 disabled:pointer-events-none disabled:opacity-60"
              >
                {busy ? (
                  <LoaderCircle
                    aria-hidden="true"
                    className="size-4 animate-spin"
                  />
                ) : outcome === "success" ? (
                  <Check aria-hidden="true" className="size-4" />
                ) : (
                  <Send aria-hidden="true" className="size-4" />
                )}
                {submitLabel}
              </button>

              <span className="font-mono text-[0.7rem] tracking-wider text-muted-foreground uppercase">
                Reply within 48h
              </span>
            </div>

            {outcome === "success" ? (
              <p
                role="status"
                className="mt-4 flex items-start gap-2 rounded-lg border border-signal/30 bg-signal/10 px-3.5 py-3 text-sm text-signal"
              >
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                Your message has been sent. I will reply by email.
              </p>
            ) : null}

            {showDirect ? (
              <div
                role="alert"
                className="mt-4 rounded-lg border border-hairline bg-background p-4"
              >
                <p className="flex items-start gap-2 text-sm text-foreground">
                  <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  {outcome === "fallback"
                    ? "The mail service is not configured on this deployment yet. Reach me directly instead."
                    : "Sending failed. Reach me directly instead."}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
                  >
                    <Mail aria-hidden="true" className="size-4" />
                    Email me
                  </a>
                  <a
                    href={site.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-hairline px-4 text-sm text-foreground transition-colors hover:border-muted-foreground/40 hover:bg-surface-2"
                  >
                    <WhatsAppIcon className="size-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            ) : null}
          </form>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="rounded-xl border border-hairline bg-surface p-5">
            <h3 className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
              Direct
            </h3>

            <div className="mt-4 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={copyEmail}
                className="group flex h-11 items-center gap-3 rounded-lg border border-hairline px-3.5 text-left transition-colors hover:border-muted-foreground/40 hover:bg-surface-2"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
                <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                  {site.email}
                </span>
                {copied ? (
                  <Check aria-hidden="true" className="size-4 shrink-0 text-signal" />
                ) : (
                  <Copy
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground"
                  />
                )}
                <span className="sr-only">Copy email address</span>
              </button>

              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center gap-3 rounded-lg border border-hairline px-3.5 text-sm text-foreground transition-colors hover:border-muted-foreground/40 hover:bg-surface-2"
              >
                <WhatsAppIcon className="size-4 shrink-0 text-muted-foreground" />
                <span className="flex-1">{site.whatsapp.display}</span>
                <span className="sr-only"> (opens in new tab)</span>
              </a>

              <a
                href={site.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center gap-3 rounded-lg border border-hairline px-3.5 text-sm text-foreground transition-colors hover:border-muted-foreground/40 hover:bg-surface-2"
              >
                <GitHubIcon className="size-4 shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate">{site.github.display}</span>
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-hairline bg-surface p-5">
            <h3 className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
              Location
            </h3>
            <p className="mt-3 text-sm text-foreground">{site.location}</p>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-muted-foreground">
              Working hours follow West Africa Time (UTC+1). Remote projects
              accepted worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-xs text-destructive">
      {message}
    </p>
  );
}
