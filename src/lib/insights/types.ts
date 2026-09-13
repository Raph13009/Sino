import type { ParsedDoc } from "@/lib/cms/docs-ast";
import type { Locale } from "@/i18n/config";
import type { CmsCtaService } from "./schema";

export type InsightImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fileId: string | null;
};

export type InsightSummary = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  date: string;
  updatedAt: string;
  author: string;
  category: string;
  href: string;
  image: InsightImage;
  readingTime: string;
  locale: Locale;
  featured: boolean;
  ctaService: CmsCtaService;
  translationGroup: string;
  docId: string;
  relatedServices: string[];
  relatedIndustries: string[];
};

export type InsightArticle = InsightSummary & {
  body: ParsedDoc;
};
