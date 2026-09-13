import { z } from "zod";

export const cmsLanguages = ["en", "zh-CN"] as const;
export const cmsStatuses = ["Draft", "Review", "Published", "Archived"] as const;
export const cmsCtaServices = [
  "Market Entry",
  "Sales Outsourcing",
  "Sales Coaching",
  "AI Sales Automation",
  "None",
] as const;

export type CmsLanguage = (typeof cmsLanguages)[number];
export type CmsStatus = (typeof cmsStatuses)[number];
export type CmsCtaService = (typeof cmsCtaServices)[number];

const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case");

function optionalString(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

export const cmsRowSchema = z.object({
  status: z.string(),
  language: z.string(),
  translation_group: z.string().min(1),
  title: z.string().min(1),
  slug: slugSchema,
  seo_title: z.string(),
  seo_description: z.string(),
  category: z.string(),
  author: z.string(),
  published_at: z.string(),
  updated_at: z.string(),
  target_keyword: z.string(),
  doc_url: z.string(),
  cover_image_url: z.string(),
  cta_service: z.string(),
  featured: z.string(),
});

export type CmsRowInput = z.infer<typeof cmsRowSchema>;

export function normalizeStatus(value: string): CmsStatus | null {
  const normalized = value.trim().toLowerCase();
  const match = cmsStatuses.find((status) => status.toLowerCase() === normalized);
  return match ?? null;
}

export function normalizeLanguage(value: string): CmsLanguage | null {
  const normalized = value.trim().toLowerCase();
  if (normalized === "en" || normalized === "en-us" || normalized === "en-gb") {
    return "en";
  }
  if (
    normalized === "zh-cn" ||
    normalized === "zh" ||
    normalized === "zh-hans" ||
    normalized === "zh_cn"
  ) {
    return "zh-CN";
  }
  return null;
}

export function normalizeCtaService(value: string): CmsCtaService {
  const trimmed = value.trim();
  const match = cmsCtaServices.find(
    (item) => item.toLowerCase() === trimmed.toLowerCase(),
  );
  return match ?? "None";
}

export function isFeaturedValue(value: string) {
  const normalized = value.trim().toLowerCase();
  return (
    normalized === "true" ||
    normalized === "yes" ||
    normalized === "1" ||
    normalized === "featured" ||
    normalized === "y"
  );
}

export function parseCmsDate(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;

  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    const serial = Number(trimmed);
    if (Number.isFinite(serial) && serial > 20000) {
      const utc = Date.UTC(1899, 11, 30) + serial * 86400000;
      return new Date(utc).toISOString().slice(0, 10);
    }
  }

  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }
  return null;
}

export function parseCmsRow(
  raw: Record<string, string>,
  rowNumber: number,
): { ok: true; data: CmsRowInput } | { ok: false; error: string } {
  const result = cmsRowSchema.safeParse({
    status: optionalString(raw.status),
    language: optionalString(raw.language),
    translation_group: optionalString(raw.translation_group),
    title: optionalString(raw.title),
    slug: optionalString(raw.slug),
    seo_title: optionalString(raw.seo_title),
    seo_description: optionalString(raw.seo_description),
    category: optionalString(raw.category),
    author: optionalString(raw.author),
    published_at: optionalString(raw.published_at),
    updated_at: optionalString(raw.updated_at),
    target_keyword: optionalString(raw.target_keyword),
    doc_url: optionalString(raw.doc_url),
    cover_image_url: optionalString(raw.cover_image_url),
    cta_service: optionalString(raw.cta_service),
    featured: optionalString(raw.featured),
  });

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join(".") || "row"}: ${issue.message}`)
      .join("; ");
    return { ok: false, error: `Row ${rowNumber}: ${details}` };
  }

  return { ok: true, data: result.data };
}
