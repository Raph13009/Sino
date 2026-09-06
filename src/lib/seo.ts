import type { Metadata } from "next";
import {
  defaultLocale,
  localeOgLocale,
  localePath,
  type Locale,
} from "@/i18n/config";
import { absoluteUrl, siteConfig } from "./site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Locale-neutral path, e.g. `/services` or `/` */
  path: string;
  locale: Locale;
  ogImage?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

export function createMetadata({
  title,
  description,
  path,
  locale,
  ogImage = siteConfig.ogImage,
  noIndex = false,
  type = "website",
}: PageMetadataInput): Metadata {
  const localizedPath = localePath(locale, path);
  const url = absoluteUrl(localizedPath);
  const enUrl = absoluteUrl(localePath("en", path));
  const zhUrl = absoluteUrl(localePath("zh", path));
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: enUrl,
        "zh-Hans": zhUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: localeOgLocale[locale],
      alternateLocale:
        locale === "en" ? [localeOgLocale.zh] : [localeOgLocale.en],
      type,
      images: [
        {
          url: absoluteUrl(ogImage),
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(ogImage)],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function organizationJsonLd(locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: absoluteUrl("/brand/civep-logo-light.png"),
    sameAs: [
      siteConfig.linkedIn,
      siteConfig.founders.maxMarchesseauLaskar.linkedIn,
      siteConfig.founders.raphaelLevy.linkedIn,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      availableLanguage: ["English", "Chinese"],
    },
    inLanguage: locale === "zh" ? "zh-Hans" : "en",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath(locale, item.path)),
    })),
  };
}

export function serviceJsonLd(
  input: {
    name: string;
    description: string;
    path: string;
  },
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(localePath(locale, input.path)),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Place",
      name: "European Union",
    },
    audience: {
      "@type": "Audience",
      audienceType:
        locale === "zh"
          ? "中国工业与绿色技术企业"
          : "Chinese industrial and green-tech companies",
    },
    inLanguage: locale === "zh" ? "zh-Hans" : "en",
  };
}

export function articleJsonLd(
  input: {
    title: string;
    description: string;
    path: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
  },
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(localePath(locale, input.path)),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    image: absoluteUrl(input.image ?? siteConfig.ogImage),
    inLanguage: locale === "zh" ? "zh-Hans" : "en",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/civep-logo-light.png"),
      },
    },
    mainEntityOfPage: absoluteUrl(localePath(locale, input.path)),
  };
}
