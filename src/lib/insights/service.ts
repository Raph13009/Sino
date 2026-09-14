import "server-only";
import { unstable_cache } from "next/cache";
import readingTime from "reading-time";
import type { IndustrySlug, ServiceSlug } from "@/content/catalog";
import { localePath, type Locale } from "@/i18n/config";
import {
  CMS_CACHE_TAG,
  CMS_DOC_CACHE_TAG,
  CMS_REVALIDATE_SECONDS,
} from "@/lib/cms/config";
import { fetchGoogleDoc } from "@/lib/cms/docs";
import { parseGoogleDocId, parseGoogleDriveFileId } from "@/lib/cms/ids";
import { cmsError, cmsWarn } from "@/lib/cms/log";
import { fetchBlogIndexRows } from "@/lib/cms/sheets";
import { siteConfig } from "@/lib/site";
import { serviceSlugForCta } from "./cta";
import {
  isFeaturedValue,
  normalizeCtaService,
  normalizeLanguage,
  normalizeStatus,
  parseCmsDate,
  parseCmsRow,
  type CmsLanguage,
} from "./schema";
import type { InsightArticle, InsightImage, InsightSummary } from "./types";

type ValidatedRecord = {
  language: Locale;
  cmsLanguage: CmsLanguage;
  translationGroup: string;
  title: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  docId: string;
  coverFileId: string | null;
  ctaService: ReturnType<typeof normalizeCtaService>;
  featured: boolean;
  rowNumber: number;
};

const FALLBACK_IMAGE: InsightImage = {
  src: siteConfig.ogImage,
  alt: siteConfig.legalName,
  width: 1600,
  height: 900,
  fileId: null,
};

function cmsLanguageToLocale(language: CmsLanguage): Locale {
  return language === "zh-CN" ? "zh" : "en";
}

function formatReadingTime(minutes: number, locale: Locale) {
  const rounded = Math.max(1, Math.ceil(minutes));
  return locale === "zh" ? `${rounded} 分钟` : `${rounded} min`;
}

function insightHref(locale: Locale, slug: string) {
  return localePath(locale, `/insights/${slug}`);
}

function coverSrc(fileId: string | null): string {
  if (!fileId) return FALLBACK_IMAGE.src;
  return `/media/insights/${fileId}`;
}

async function loadValidatedPublishedRecords(): Promise<ValidatedRecord[]> {
  const rows = await fetchBlogIndexRows();
  const parsed: ValidatedRecord[] = [];
  const seenSlugLocale = new Map<string, ValidatedRecord>();
  const seenGroupLocale = new Map<string, ValidatedRecord>();

  rows.forEach((row, index) => {
    const rowNumber = index + 2;
    try {
    const parsedRow = parseCmsRow(row, rowNumber);
    if (!parsedRow.ok) {
      cmsWarn(parsedRow.error);
      return;
    }

    const data = parsedRow.data;
    const status = normalizeStatus(data.status);
    if (status !== "Published") return;

    const cmsLanguage = normalizeLanguage(data.language);
    if (!cmsLanguage) {
      cmsWarn(`Row ${rowNumber}: unsupported language "${data.language}".`);
      return;
    }

    const publishedAt = parseCmsDate(data.published_at);
    if (!publishedAt) {
      cmsWarn(`Row ${rowNumber}: invalid published_at "${data.published_at}".`);
      return;
    }

    const docId = parseGoogleDocId(data.doc_url);
    if (!docId) {
      cmsWarn(`Row ${rowNumber}: invalid doc_url for "${data.title}".`);
      return;
    }

    const coverFileId = data.cover_image_url
      ? parseGoogleDriveFileId(data.cover_image_url)
      : null;
    if (data.cover_image_url && !coverFileId) {
      cmsWarn(`Row ${rowNumber}: invalid cover_image_url for "${data.title}".`);
    }

    const record: ValidatedRecord = {
      language: cmsLanguageToLocale(cmsLanguage),
      cmsLanguage,
      translationGroup: data.translation_group,
      title: data.title,
      slug: data.slug,
      seoTitle: data.seo_title || data.title,
      seoDescription: data.seo_description,
      category: data.category || (cmsLanguage === "zh-CN" ? "洞察" : "Insights"),
      author: data.author || siteConfig.name,
      publishedAt,
      updatedAt: parseCmsDate(data.updated_at) || publishedAt,
      docId,
      coverFileId,
      ctaService: normalizeCtaService(data.cta_service),
      featured: isFeaturedValue(data.featured),
      rowNumber,
    };

    if (!record.seoDescription) {
      cmsWarn(`Row ${rowNumber}: missing seo_description for "${record.title}".`);
    }

    const slugKey = `${record.language}:${record.slug}`;
    const groupKey = `${record.language}:${record.translationGroup}`;
    const existingSlug = seenSlugLocale.get(slugKey);

    if (existingSlug) {
      cmsError(
        `Duplicate published slug "${record.slug}" in locale "${record.language}" (rows ${existingSlug.rowNumber} and ${record.rowNumber}). Keeping the newest published_at.`,
      );
      if (record.publishedAt < existingSlug.publishedAt) return;
      parsed.splice(parsed.indexOf(existingSlug), 1);
      seenGroupLocale.delete(`${existingSlug.language}:${existingSlug.translationGroup}`);
    }

    const currentGroup = seenGroupLocale.get(groupKey);
    if (currentGroup && currentGroup !== existingSlug) {
      cmsError(
        `Duplicate translation_group "${record.translationGroup}" in locale "${record.language}" (rows ${currentGroup.rowNumber} and ${record.rowNumber}). Keeping the newest published_at.`,
      );
      if (record.publishedAt < currentGroup.publishedAt) return;
      parsed.splice(parsed.indexOf(currentGroup), 1);
      seenSlugLocale.delete(`${currentGroup.language}:${currentGroup.slug}`);
    }

    seenSlugLocale.set(slugKey, record);
    seenGroupLocale.set(groupKey, record);
    parsed.push(record);
    } catch (error) {
      cmsWarn(`Row ${rowNumber}: skipped because it could not be parsed.`, error);
    }
  });

  parsed.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return parsed;
}

const getValidatedPublishedRecords = unstable_cache(
  loadValidatedPublishedRecords,
  ["insights-published-index"],
  { revalidate: CMS_REVALIDATE_SECONDS, tags: [CMS_CACHE_TAG] },
);

const getCachedDoc = (documentId: string) =>
  unstable_cache(
    async () => fetchGoogleDoc(documentId),
    ["insights-doc", documentId],
    { revalidate: CMS_REVALIDATE_SECONDS, tags: [CMS_CACHE_TAG, CMS_DOC_CACHE_TAG] },
  )();

function toSummary(record: ValidatedRecord): InsightSummary {
  const relatedService = serviceSlugForCta(record.ctaService);

  return {
    slug: record.slug,
    title: record.title,
    seoTitle: record.seoTitle,
    description: record.seoDescription || record.title,
    excerpt: record.seoDescription || record.title,
    date: record.publishedAt,
    updatedAt: record.updatedAt,
    author: record.author,
    category: record.category,
    href: insightHref(record.language, record.slug),
    image: {
      src: coverSrc(record.coverFileId),
      alt: record.title,
      width: FALLBACK_IMAGE.width,
      height: FALLBACK_IMAGE.height,
      fileId: record.coverFileId,
    },
    readingTime: formatReadingTime(4, record.language),
    locale: record.language,
    featured: record.featured,
    ctaService: record.ctaService,
    translationGroup: record.translationGroup,
    docId: record.docId,
    relatedServices: relatedService ? [relatedService] : [],
    relatedIndustries: [],
  };
}

export async function getInsightSummaries(locale: Locale): Promise<InsightSummary[]> {
  try {
    const records = await getValidatedPublishedRecords();
    const localized = records.filter((record) => record.language === locale);
    return localized.map(toSummary);
  } catch (error) {
    cmsError("Failed to load insight summaries.", error);
    return [];
  }
}

export async function getAllPublishedInsights(): Promise<InsightSummary[]> {
  try {
    const records = await getValidatedPublishedRecords();
    return records.map(toSummary);
  } catch (error) {
    cmsError("Failed to load published insights.", error);
    return [];
  }
}

export async function getInsightBySlug(
  locale: Locale,
  slug: string,
): Promise<InsightArticle | undefined> {
  try {
    const records = await getValidatedPublishedRecords();
    const record = records.find(
      (item) => item.language === locale && item.slug === slug,
    );
    if (!record) return undefined;

    const summary = toSummary(record);
    const parsed = await getCachedDoc(record.docId);
    const body = parsed ?? {
      title: record.title,
      blocks: [
        {
          type: "p" as const,
          children: [{ type: "text" as const, text: summary.excerpt }],
        },
      ],
      plainText: summary.excerpt,
    };

    if (!parsed) {
      cmsError(`Missing Google Doc for published article "${record.slug}" (${record.docId}).`);
    }

    const stats = readingTime(body.plainText || summary.excerpt);

    return {
      ...summary,
      readingTime: formatReadingTime(stats.minutes, locale),
      body,
    };
  } catch (error) {
    cmsError(`Failed to load insight "${slug}".`, error);
    return undefined;
  }
}

export async function getInsightSlugs(locale: Locale = "en"): Promise<string[]> {
  const articles = await getInsightSummaries(locale);
  return articles.map((article) => article.slug);
}

export async function getInsightsForService(locale: Locale, slug: ServiceSlug) {
  const articles = await getInsightSummaries(locale);
  return articles.filter((insight) => insight.relatedServices.includes(slug));
}

export async function getInsightsForIndustry(
  locale: Locale,
  slug: IndustrySlug,
) {
  void locale;
  void slug;
  return [] as InsightSummary[];
}

export async function getRelatedInsights(
  locale: Locale,
  article: Pick<InsightSummary, "slug" | "category">,
  limit = 3,
) {
  const articles = await getInsightSummaries(locale);
  const sameCategory = articles.filter(
    (item) => item.slug !== article.slug && item.category === article.category,
  );
  const rest = articles.filter(
    (item) => item.slug !== article.slug && item.category !== article.category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export async function getTranslation(
  article: Pick<InsightSummary, "translationGroup" | "locale">,
  targetLocale: Locale,
) {
  try {
    const records = await getValidatedPublishedRecords();
    const match = records.find(
      (item) =>
        item.translationGroup === article.translationGroup &&
        item.language === targetLocale,
    );
    return match ? toSummary(match) : undefined;
  } catch (error) {
    cmsError("Failed to resolve insight translation.", error);
    return undefined;
  }
}

export async function getInsightLanguageAlternates(): Promise<
  Record<string, string>
> {
  try {
    const records = await getValidatedPublishedRecords();
    const map: Record<string, string> = {};

    for (const record of records) {
      const counterpart = records.find(
        (item) =>
          item.translationGroup === record.translationGroup &&
          item.language !== record.language,
      );
      const from = insightHref(record.language, record.slug);
      const to = counterpart
        ? insightHref(counterpart.language, counterpart.slug)
        : localePath(record.language === "en" ? "zh" : "en", "/insights");
      map[from] = to;
    }

    return map;
  } catch (error) {
    cmsError("Failed to build insight language alternates.", error);
    return {};
  }
}

export async function assertInsightLocalesAligned() {
  // Translations are optional in the CMS. Conflicts are logged while parsing.
}
