import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "Name must be 120 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(254, "Email must be 254 characters or fewer.")
    .refine(
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Please enter a valid email address."
    ),
  subject: z
    .string()
    .trim()
    .min(2, "Please enter a subject.")
    .max(160, "Subject must be 160 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(5000, "Message must be 5000 characters or fewer."),
  /** Honeypot. Humans never see this field. */
  website: z.string().max(200),
});

export type ContactValues = z.output<typeof contactSchema>;

export const DEFAULT_CONTACT_TO = "paulmichaelomega@gmail.com";
export const DEFAULT_CONTACT_FROM = "onboarding@resend.dev";
