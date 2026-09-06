export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  zh: "zh-Hans",
};

export const localeOgLocale: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
};

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Public pathname for a locale (English has no prefix). */
export function localePath(locale: Locale, path = "/"): string {
  const normalized =
    !path || path === "/"
      ? "/"
      : path.startsWith("/")
        ? path
        : `/${path}`;

  if (locale === defaultLocale) return normalized;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

/** Strip `/zh` prefix to get the shared route path. */
export function stripLocale(pathname: string): string {
  if (pathname === "/zh") return "/";
  if (pathname.startsWith("/zh/")) {
    return pathname.slice(3) || "/";
  }
  return pathname || "/";
}

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return "zh";
  return "en";
}

/** Map current URL to the equivalent path in another language. */
export function getAlternatePath(pathname: string, targetLocale: Locale): string {
  return localePath(targetLocale, stripLocale(pathname));
}

export function getLocaleFromParams(locale: string | undefined): Locale {
  if (locale && isLocale(locale)) return locale;
  return defaultLocale;
}
