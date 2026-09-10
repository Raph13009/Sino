import fs from "node:fs";
import path from "node:path";
import "server-only";
import matter from "gray-matter";
import readingTime from "reading-time";
import { media } from "@/content/media";
import {
  parseInsightFrontmatter,
  type InsightFrontmatter,
} from "@/content/insights/schema";
import type { IndustrySlug, ServiceSlug } from "@/content/catalog";
import { localePath, type Locale } from "@/i18n/config";

const insightsRoot = path.join(process.cwd(), "content", "insights");

export type InsightSummary = Omit<InsightFrontmatter, "image"> & {
  excerpt: string;
  readingTime: string;
  href: string;
  imageKey: InsightFrontmatter["image"];
  image: (typeof media.insights)[InsightFrontmatter["image"]];
  locale: Locale;
  filePath: string;
};

export type InsightArticle = InsightSummary & {
  body: string;
};

function localeDir(locale: Locale) {
  return path.join(insightsRoot, locale);
}

function listMdxFiles(locale: Locale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) {
    throw new Error(`Insights content directory missing: ${dir}`);
  }
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(dir, file));
}

function formatReadingTime(minutes: number, locale: Locale) {
  const rounded = Math.max(1, Math.ceil(minutes));
  return locale === "zh" ? `${rounded} 分钟` : `${rounded} min`;
}

function toSummary(
  frontmatter: InsightFrontmatter,
  body: string,
  locale: Locale,
  filePath: string,
): InsightSummary {
  const stats = readingTime(body);
  const { image: imageKey, ...meta } = frontmatter;
  return {
    ...meta,
    excerpt: frontmatter.excerpt ?? frontmatter.description,
    readingTime: formatReadingTime(stats.minutes, locale),
    href: localePath(locale, `/insights/${frontmatter.slug}`),
    imageKey,
    image: media.insights[imageKey],
    locale,
    filePath,
  };
}

function readInsightFile(filePath: string, locale: Locale): InsightArticle {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = parseInsightFrontmatter(data, filePath);
  const fileSlug = path.basename(filePath, ".mdx");

  if (frontmatter.slug !== fileSlug) {
    throw new Error(
      `Insight slug mismatch in ${filePath}: frontmatter.slug="${frontmatter.slug}" but filename="${fileSlug}"`,
    );
  }

  return {
    ...toSummary(frontmatter, content, locale, filePath),
    body: content.trim(),
  };
}

export function getInsightSummaries(locale: Locale): InsightSummary[] {
  const articles = listMdxFiles(locale).map((filePath) =>
    readInsightFile(filePath, locale),
  );

  const slugs = new Set<string>();
  for (const article of articles) {
    if (slugs.has(article.slug)) {
      throw new Error(
        `Duplicate insight slug "${article.slug}" in locale "${locale}"`,
      );
    }
    slugs.add(article.slug);
  }

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getInsightBySlug(
  locale: Locale,
  slug: string,
): InsightArticle | undefined {
  const filePath = path.join(localeDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  return readInsightFile(filePath, locale);
}

export function getInsightSlugs(locale: Locale = "en"): string[] {
  return getInsightSummaries(locale).map((article) => article.slug);
}

export function getInsightsForService(locale: Locale, slug: ServiceSlug) {
  return getInsightSummaries(locale).filter((insight) =>
    insight.relatedServices.includes(slug),
  );
}

export function getInsightsForIndustry(locale: Locale, slug: IndustrySlug) {
  return getInsightSummaries(locale).filter((insight) =>
    insight.relatedIndustries.includes(slug),
  );
}

/** Ensures EN and ZH slug sets match at build time. */
export function assertInsightLocalesAligned() {
  const en = new Set(getInsightSlugs("en"));
  const zh = new Set(getInsightSlugs("zh"));

  for (const slug of en) {
    if (!zh.has(slug)) {
      throw new Error(`Missing ZH insight for EN slug "${slug}"`);
    }
  }
  for (const slug of zh) {
    if (!en.has(slug)) {
      throw new Error(`Missing EN insight for ZH slug "${slug}"`);
    }
  }
}
