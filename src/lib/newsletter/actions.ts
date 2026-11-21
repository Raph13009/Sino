"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { getDictionary } from "@/content/locales";
import { isLocale, type Locale } from "@/i18n/config";
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
  createNewsletterSchema,
  readNewsletterValues,
  type NewsletterFormValues,
} from "./schema";
import {
  appendSubscriber,
  findSubscriberByEmail,
  findSubscriberByToken,
  reactivateSubscriber,
  updateSubscriberStatus,
} from "./sheets";

export type NewsletterFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: { email?: string };
  values?: NewsletterFormValues;
  revision?: number;
};

function failedState(
  message: string,
  values: NewsletterFormValues,
  errors?: NewsletterFormState["errors"],
): NewsletterFormState {
  return {
    status: "error",
    message,
    errors,
    values,
    revision: Date.now(),
  };
}

export async function subscribeNewsletter(
  _prev: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const localeRaw = String(formData.get("locale") ?? "en");
  const locale: Locale = isLocale(localeRaw) ? localeRaw : "en";
  const dict = getDictionary(locale);
  const values = readNewsletterValues(formData);
  const honeypot = String(formData.get("website") ?? "").trim();

  const headerList = await headers();
  const ip = getClientIp(headerList);

  if (!allowContactAttempt(ip)) {
    return failedState(dict.newsletter.errors.generic, values);
  }

  if (honeypot) {
    return { status: "success", message: dict.newsletter.successBody };
  }

  const parsed = createNewsletterSchema(dict).safeParse(values);
  if (!parsed.success) {
    return failedState(dict.newsletter.errors.generic, values, {
      email: parsed.error.issues[0]?.message ?? dict.newsletter.errors.email,
    });
  }

  const key = submissionKey(ip, parsed.data.email);
  if (wasRecentlySubmitted(key)) {
    return { status: "success", message: dict.newsletter.successBody };
  }

  if (!beginSubmission(key)) {
    return failedState(dict.newsletter.errors.generic, values);
  }

  try {
    const lookup = await findSubscriberByEmail(parsed.data.email);
    if (!lookup.ok) {
      return failedState(dict.newsletter.errors.generic, values);
    }

    const existing = lookup.subscriber;
    if (existing) {
      if (existing.status === "active") {
        markSubmitted(key);
        return { status: "success", message: dict.newsletter.successBody };
      }

      const token = existing.unsubToken || randomUUID();
      const ok = await reactivateSubscriber(existing.rowNumber, locale, token);
      if (!ok) {
        return failedState(dict.newsletter.errors.generic, values);
      }
      markSubmitted(key);
      return { status: "success", message: dict.newsletter.successBody };
    }

    const result = await appendSubscriber({
      email: parsed.data.email,
      locale,
      source: "footer",
      unsubToken: randomUUID(),
    });

    if (!result.ok) {
      return failedState(dict.newsletter.errors.generic, values);
    }

    markSubmitted(key);
    return { status: "success", message: dict.newsletter.successBody };
  } catch (error) {
    console.error("[newsletter] unexpected subscribe failure", {
      name: error instanceof Error ? error.name : "Error",
    });
    return failedState(dict.newsletter.errors.generic, values);
  } finally {
    endSubmission(key);
  }
}

export async function unsubscribeNewsletter(
  token: string,
): Promise<{ ok: true; already?: boolean } | { ok: false }> {
  const normalized = token.trim();
  if (!normalized) return { ok: false };

  const lookup = await findSubscriberByToken(normalized);
  if (!lookup.ok || !lookup.subscriber) return { ok: false };

  if (lookup.subscriber.status === "unsubscribed") {
    return { ok: true, already: true };
  }

  const ok = await updateSubscriberStatus(
    lookup.subscriber.rowNumber,
    "unsubscribed",
  );
  return ok ? { ok: true } : { ok: false };
}
