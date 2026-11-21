import { z } from "zod";
import type { Dictionary } from "@/content/locales";

export type NewsletterFormValues = {
  email: string;
};

export function readNewsletterValues(formData: FormData): NewsletterFormValues {
  return {
    email: String(formData.get("email") ?? "").trim(),
  };
}

export function createNewsletterSchema(dict: Dictionary) {
  return z.object({
    email: z
      .string()
      .trim()
      .email({ message: dict.newsletter.errors.email }),
  });
}

export type BroadcastPayload = {
  enTitle: string;
  seoDescription: string;
  angle: string;
  enUrl: string;
  zhUrl: string;
  coverUrl?: string;
  ctaService: string;
  publishedAt: string;
  bullets?: string[];
};

export function parseBroadcastPayload(body: unknown): BroadcastPayload | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;

  const enTitle = String(data.enTitle ?? "").trim();
  const seoDescription = String(data.seoDescription ?? "").trim();
  const angle = String(data.angle ?? "").trim();
  const enUrl = String(data.enUrl ?? "").trim();
  const zhUrl = String(data.zhUrl ?? "").trim();
  const ctaService = String(data.ctaService ?? "None").trim() || "None";
  const publishedAt = String(data.publishedAt ?? "").trim();
  const coverUrl = String(data.coverUrl ?? "").trim() || undefined;
  const bullets = Array.isArray(data.bullets)
    ? data.bullets.map((item) => String(item).trim()).filter(Boolean)
    : [];

  if (!enTitle || !enUrl || !zhUrl || !publishedAt) return null;

  return {
    enTitle,
    seoDescription,
    angle,
    enUrl,
    zhUrl,
    coverUrl,
    ctaService,
    publishedAt,
    bullets,
  };
}
