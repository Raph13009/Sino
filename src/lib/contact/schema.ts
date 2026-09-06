import { z } from "zod";
import { en, type Dictionary } from "@/content/locales/en";
import { zh } from "@/content/locales/zh";

const allowedIndustries = new Set([
  ...en.form.industryOptions,
  ...zh.form.industryOptions,
]);

export const contactFieldNames = [
  "name",
  "company",
  "email",
  "country",
  "industry",
  "phone",
  "message",
] as const;

export type ContactFieldName = (typeof contactFieldNames)[number];

export type ContactFormValues = Record<ContactFieldName, string>;

export function createContactSchema(dict: Dictionary) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(2, dict.form.errors.required)
      .max(120, dict.form.errors.required),
    company: z
      .string()
      .trim()
      .min(2, dict.form.errors.required)
      .max(160, dict.form.errors.required),
    email: z
      .string()
      .trim()
      .max(254, dict.form.errors.email)
      .email(dict.form.errors.email)
      .refine((value) => !value.includes(" "), dict.form.errors.email),
    country: z
      .string()
      .trim()
      .min(2, dict.form.errors.required)
      .max(80, dict.form.errors.required),
    industry: z
      .string()
      .trim()
      .refine((value) => allowedIndustries.has(value), dict.form.errors.required),
    phone: z
      .string()
      .trim()
      .max(80, dict.form.errors.phone)
      .refine(
        (value) => value.length === 0 || isValidPhoneOrWeChat(value),
        dict.form.errors.phone,
      ),
    message: z
      .string()
      .trim()
      .min(20, dict.form.errors.required)
      .max(5000, dict.form.errors.required),
  });
}

export type ContactPayload = z.infer<ReturnType<typeof createContactSchema>>;

function isValidPhoneOrWeChat(value: string) {
  if (value.length < 2) return false;
  if (/https?:\/\//i.test(value) || /<[^>]+>/.test(value)) return false;
  return /[\p{L}\p{N}]/u.test(value);
}

export function readContactValues(formData: FormData): ContactFormValues {
  return {
    name: String(formData.get("name") ?? ""),
    company: String(formData.get("company") ?? ""),
    email: String(formData.get("email") ?? ""),
    country: String(formData.get("country") ?? ""),
    industry: String(formData.get("industry") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
}
