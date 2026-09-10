import type { Metadata } from "next";
import {
  defaultLocale,
  localeOgLocale,
  localePath,
  type Locale,
} from "@/i18n/config";
import {
  absoluteUrl,
  shouldNoIndexDeployment,
  siteConfig,
} from "./site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Locale-neutral path, e.g. `/services` or `/` */
  path: string;
  locale: Locale;
  ogImage?: string;
  ogImageAlt?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function createMetadata({
  title,
  description,
  path,
  locale,
  ogImage = siteConfig.ogImage,
  ogImageAlt,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: PageMetadataInput): Metadata {
  const localizedPath = localePath(locale, path);
  const url = absoluteUrl(localizedPath);
  const enUrl = absoluteUrl(localePath("en", path));
  const zhUrl = absoluteUrl(localePath("zh", path));
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;
  const imageAlt = ogImageAlt ?? fullTitle;
  const preventIndex = noIndex || shouldNoIndexDeployment();

  return {
    title: {
      absolute: fullTitle,
    },
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
      siteName: siteConfig.legalName,
      locale: localeOgLocale[locale],
      alternateLocale:
        locale === "en" ? [localeOgLocale.zh] : [localeOgLocale.en],
      type,
      images: [
        {
          url: absoluteUrl(ogImage),
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(ogImage)],
    },
    robots: preventIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url.replace(/\/$/, "")}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url.replace(/\/$/, ""),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/logo-light.png"),
    },
    image: absoluteUrl("/brand/logo-light.png"),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      availableLanguage: ["English", "Chinese"],
    },
  };
}

export function websiteJsonLd(locale: Locale = defaultLocale) {
  const url = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url,
    description: siteConfig.description,
    inLanguage: locale === "zh" ? "zh-Hans" : "en",
    publisher: {
      "@id": `${url}/#organization`,
    },
  };
}

export function personJsonLd(input: {
  name: string;
  jobTitle: string;
  linkedIn?: string;
  image?: string;
}) {
  const url = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.jobTitle,
    worksFor: {
      "@id": `${url}/#organization`,
    },
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(input.linkedIn ? { sameAs: [input.linkedIn] } : {}),
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
      "@id": `${siteConfig.url.replace(/\/$/, "")}/#organization`,
    },
    areaServed: {
      "@type": "Place",
      name: "Europe",
    },
    audience: {
      "@type": "Audience",
      audienceType:
        locale === "zh"
          ? "中国工业与绿色技术企业"
          : "Chinese industrial and green-tech companies",
    },
  };
}

export function articleJsonLd(
  input: {
    title: string;
    description: string;
    path: string;
    datePublished: string;
    dateModified?: string;
    author: string;
    image?: string;
  },
  locale: Locale,
) {
  const url = absoluteUrl(localePath(locale, input.path));
  const orgId = `${siteConfig.url.replace(/\/$/, "")}/#organization`;
  const isOrgAuthor =
    input.author === siteConfig.name || input.author === siteConfig.legalName;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    image: absoluteUrl(input.image ?? siteConfig.ogImage),
    inLanguage: locale === "zh" ? "zh-Hans" : "en",
    author: isOrgAuthor
      ? { "@id": orgId }
      : {
          "@type": "Person",
          name: input.author,
        },
    publisher: {
      "@id": orgId,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
