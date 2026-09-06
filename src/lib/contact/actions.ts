"use server";

import { z } from "zod";
import { getDictionary } from "@/content/locales";
import { isLocale, type Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<
    Record<
      "name" | "company" | "email" | "country" | "industry" | "phone" | "message",
      string
    >
  >;
};

/**
 * Contact form server action.
 *
 * Temporary contact destination/reference: siteConfig.email
 *
 * TODO — Email delivery:
 * Wire submission to a transactional provider using environment variables only.
 */
export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const localeRaw = String(formData.get("locale") ?? "en");
  const locale: Locale = isLocale(localeRaw) ? localeRaw : "en";
  const dict = getDictionary(locale);

  const raw = {
    name: String(formData.get("name") ?? ""),
    company: String(formData.get("company") ?? ""),
    email: String(formData.get("email") ?? ""),
    country: String(formData.get("country") ?? ""),
    industry: String(formData.get("industry") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  if (raw.website) {
    return { status: "success" };
  }

  const contactSchema = z.object({
    name: z.string().trim().min(2, dict.form.errors.required),
    company: z.string().trim().min(2, dict.form.errors.required),
    email: z.string().trim().email(dict.form.errors.email),
    country: z.string().trim().min(2, dict.form.errors.required),
    industry: z.string().trim().min(2, dict.form.errors.required),
    phone: z.string().trim().optional(),
    message: z.string().trim().min(20, dict.form.errors.required),
  });

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: ContactFormState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key as keyof typeof errors]) {
        errors[key as keyof typeof errors] = issue.message;
      }
    }
    return {
      status: "error",
      message: dict.form.errors.generic,
      errors,
    };
  }

  console.info("[contact] submission (delivery not configured)", {
    to: siteConfig.email,
    locale,
    ...parsed.data,
    phone: parsed.data.phone || undefined,
    receivedAt: new Date().toISOString(),
  });

  return { status: "success" };
}
