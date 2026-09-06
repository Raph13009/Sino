"use server";

import { headers } from "next/headers";
import { getDictionary } from "@/content/locales";
import { isLocale, type Locale } from "@/i18n/config";
import { sendContactEmails } from "@/lib/contact/email";
import {
  allowContactAttempt,
  beginSubmission,
  endSubmission,
  getClientIp,
  markSubmitted,
  submissionKey,
  wasRecentlySubmitted,
} from "@/lib/contact/rate-limit";
import {
  createContactSchema,
  readContactValues,
  type ContactFieldName,
  type ContactFormValues,
} from "@/lib/contact/schema";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactFieldName, string>>;
  values?: ContactFormValues;
  revision?: number;
};

function failedState(
  message: string,
  values: ContactFormValues,
  errors?: ContactFormState["errors"],
): ContactFormState {
  return {
    status: "error",
    message,
    errors,
    values,
    revision: Date.now(),
  };
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const localeRaw = String(formData.get("locale") ?? "en");
  const locale: Locale = isLocale(localeRaw) ? localeRaw : "en";
  const dict = getDictionary(locale);
  const values = readContactValues(formData);
  const honeypot = String(formData.get("website") ?? "").trim();

  const headerList = await headers();
  const ip = getClientIp(headerList);

  if (!allowContactAttempt(ip)) {
    return failedState(dict.form.errors.generic, values);
  }

  if (honeypot) {
    return { status: "success" };
  }

  const parsed = createContactSchema(dict).safeParse(values);
  if (!parsed.success) {
    const errors: ContactFormState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key as ContactFieldName]) {
        errors[key as ContactFieldName] = issue.message;
      }
    }
    return failedState(dict.form.errors.generic, values, errors);
  }

  const key = submissionKey(ip, parsed.data.email);
  if (wasRecentlySubmitted(key)) {
    return { status: "success" };
  }

  if (!beginSubmission(key)) {
    return failedState(dict.form.errors.generic, values);
  }

  try {
    const result = await sendContactEmails(parsed.data, locale);
    if (!result.ok) {
      return failedState(dict.form.errors.generic, values);
    }

    markSubmitted(key);
    return { status: "success" };
  } catch (error) {
    console.error("[contact] unexpected delivery failure", {
      name: error instanceof Error ? error.name : "Error",
    });
    return failedState(dict.form.errors.generic, values);
  } finally {
    endSubmission(key);
  }
}
