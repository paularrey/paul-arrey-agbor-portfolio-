import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import {
  contactSchema,
  DEFAULT_CONTACT_FROM,
  DEFAULT_CONTACT_TO,
  type ContactValues,
} from "@/lib/contact-schema";

const RATE_LIMIT_MAX = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const rateBuckets = new Map<string, number[]>();

function clientIp(headerStore: Headers): string {
  const forwarded = headerStore.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || headerStore.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  if (rateBuckets.size > 2000) {
    const cutoff = Date.now() - RATE_WINDOW_MS;
    for (const [key, times] of rateBuckets) {
      const kept = times.filter((time) => time > cutoff);
      if (kept.length === 0) rateBuckets.delete(key);
      else rateBuckets.set(key, kept);
    }
  }

  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const previous = rateBuckets.get(ip)?.filter((time) => time > cutoff) ?? [];

  if (previous.length >= RATE_LIMIT_MAX) {
    rateBuckets.set(ip, previous);
    return true;
  }

  previous.push(now);
  rateBuckets.set(ip, previous);
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(values: ContactValues) {
  const name = escapeHtml(values.name);
  const email = escapeHtml(values.email);
  const subject = escapeHtml(values.subject);
  const message = escapeHtml(values.message).replace(/\r?\n/g, "<br />");

  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Subject: ${values.subject}`,
    "",
    values.message,
  ].join("\n");

  const html = [
    '<div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#111">',
    `<p style="margin:0 0 16px"><strong>Subject:</strong> ${subject}</p>`,
    `<p style="margin:0 0 4px"><strong>From:</strong> ${name} &lt;${email}&gt;</p>`,
    '<hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />',
    `<p style="margin:0;white-space:pre-wrap">${message}</p>`,
    "</div>",
  ].join("");

  return { text, html };
}

async function deliver(
  values: ContactValues
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const { text, html } = buildEmail(values);
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_CONTACT_TO;
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_CONTACT_FROM;
  const replyTo = values.email;

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo,
      subject: `[Portfolio] ${values.subject}`,
      text,
      html,
    });
    if (error) return { ok: false, reason: error.message };
    return { ok: true };
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpHost && smtpUser && smtpPass) {
    const port = Number(process.env.SMTP_PORT ?? 587);
    const transport = nodemailer.createTransport({
      host: smtpHost,
      port,
      secure: port === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });
    try {
      await transport.sendMail({
        from,
        to,
        replyTo,
        subject: `[Portfolio] ${values.subject}`,
        text,
        html,
      });
      return { ok: true };
    } finally {
      transport.close?.();
    }
  }

  return { ok: false, reason: "no transport configured" };
}

export async function POST(request: Request) {
  const headerStore = await headers();

  if (isRateLimited(clientIp(headerStore))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please correct the highlighted fields.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const values = parsed.data;

  // Honeypot filled in => almost certainly a bot. Acknowledge and stop.
  if (values.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }
  if (!process.env.RESEND_API_KEY && !process.env.SMTP_HOST) {
    return NextResponse.json({ fallback: true }, { status: 503 });
  }

  try {
    const result = await deliver(values);
    if (!result.ok) {
      if (result.reason === "no transport configured") {
        return NextResponse.json({ fallback: true }, { status: 503 });
      }
      console.error("[contact] delivery failed:", result.reason);
      return NextResponse.json(
        { error: "The message could not be sent." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[contact] delivery threw:", error);
    return NextResponse.json(
      { error: "The message could not be sent." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
