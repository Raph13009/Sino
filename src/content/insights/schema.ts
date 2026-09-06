import { z } from "zod";
import {
  industrySlugs,
  serviceSlugs,
  type IndustrySlug,
  type ServiceSlug,
} from "@/content/catalog";
import { media } from "@/content/media";

const insightImageKeys = [
  "marketEntry",
  "europeanSales",
  "distributorStrategy",
] as const satisfies ReadonlyArray<keyof typeof media.insights>;

const serviceSlugSchema = z.enum(
  serviceSlugs as unknown as [ServiceSlug, ...ServiceSlug[]],
);
const industrySlugSchema = z.enum(
  industrySlugs as unknown as [IndustrySlug, ...IndustrySlug[]],
);

export const insightFrontmatterSchema = z.object({
  title: z.string().min(1),
  seoTitle: z.string().min(1),
  description: z.string().min(1),
  excerpt: z.string().min(1).optional(),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  updatedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "updatedAt must be YYYY-MM-DD"),
  author: z.string().min(1),
  category: z.string().min(1),
  image: z.enum(insightImageKeys),
  relatedServices: z.array(serviceSlugSchema).min(1),
  relatedIndustries: z.array(industrySlugSchema).min(1),
});

export type InsightFrontmatter = z.infer<typeof insightFrontmatterSchema>;
export type InsightImageKey = (typeof insightImageKeys)[number];

export function parseInsightFrontmatter(
  raw: unknown,
  filePath: string,
): InsightFrontmatter {
  const result = insightFrontmatterSchema.safeParse(raw);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `Invalid insight frontmatter in ${filePath}:\n${details}`,
    );
  }
  return result.data;
}
