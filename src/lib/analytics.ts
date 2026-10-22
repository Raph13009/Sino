/**
 * Analytics
 * ---------
 * - Vercel Web Analytics: cookieless, production-only.
 * - GA4: NEXT_PUBLIC_GA_MEASUREMENT_ID (Production only) + Consent Mode v2.
 *
 * Event params (register as custom dimensions in GA Admin — see docs/ANALYTICS.md):
 *   page_type, site_locale, content_group, traffic_channel, ai_referrer,
 *   referrer_host, cta_location, outbound_destination
 *
 * Never send form field values, emails, or message text.
 */

import { getLocaleFromPathname, stripLocale } from "@/i18n/config";
import { isProductionDeployment } from "./site";

export const GA_CONSENT_STORAGE_KEY = "opopa_analytics_consent";

const AI_REFERRAL_SESSION_KEY = "opopa_ai_referral_logged";

export type AnalyticsConsent = "granted" | "denied";

export type TrafficChannel =
  | "direct"
  | "organic_google"
  | "organic_bing"
  | "organic_other"
  | "ai_chatgpt"
  | "ai_perplexity"
  | "ai_claude"
  | "ai_gemini"
  | "ai_copilot"
  | "ai_other"
  | "social_linkedin"
  | "social_other"
  | "referral"
  | "email"
  | "paid"
  | "internal";

export type PageType =
  | "home"
  | "services"
  | "service"
  | "industries"
  | "industry"
  | "insights"
  | "insight"
  | "our_work"
  | "about"
  | "contact"
  | "privacy"
  | "legal"
  | "other";

export type ContentGroup =
  | "marketing"
  | "expertise"
  | "insights"
  | "company"
  | "conversion"
  | "legal"
  | "other";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!id || !/^G-[A-Z0-9]+$/i.test(id)) return undefined;
  return id;
}

export function isVercelAnalyticsEnabled() {
  return isProductionDeployment();
}

export function isGaEnabled() {
  return isProductionDeployment() && Boolean(getGaMeasurementId());
}

export function readStoredAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(GA_CONSENT_STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    /* private mode / blocked storage */
  }
  return null;
}

export function storeAnalyticsConsent(value: AnalyticsConsent) {
  try {
    window.localStorage.setItem(GA_CONSENT_STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
}

export function updateGaConsent(value: AnalyticsConsent) {
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: value,
  });
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (!isGaEnabled() || typeof window.gtag !== "function") return;
  const cleaned: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    cleaned[key] = value;
  }
  window.gtag("event", name, cleaned);
}

/** Classify pathname into page_type + content_group for low-traffic rollups. */
export function classifyPath(pathname: string): {
  page_type: PageType;
  content_group: ContentGroup;
  site_locale: "en" | "zh";
  route_path: string;
} {
  const site_locale = getLocaleFromPathname(pathname);
  const route_path = stripLocale(pathname);

  if (route_path === "/") {
    return {
      page_type: "home",
      content_group: "marketing",
      site_locale,
      route_path,
    };
  }
  if (route_path === "/services") {
    return {
      page_type: "services",
      content_group: "expertise",
      site_locale,
      route_path,
    };
  }
  if (route_path.startsWith("/services/")) {
    return {
      page_type: "service",
      content_group: "expertise",
      site_locale,
      route_path,
    };
  }
  if (route_path === "/industries") {
    return {
      page_type: "industries",
      content_group: "expertise",
      site_locale,
      route_path,
    };
  }
  if (route_path.startsWith("/industries/")) {
    return {
      page_type: "industry",
      content_group: "expertise",
      site_locale,
      route_path,
    };
  }
  if (route_path === "/insights") {
    return {
      page_type: "insights",
      content_group: "insights",
      site_locale,
      route_path,
    };
  }
  if (route_path.startsWith("/insights/")) {
    return {
      page_type: "insight",
      content_group: "insights",
      site_locale,
      route_path,
    };
  }
  if (route_path === "/our-work" || route_path.startsWith("/our-work/")) {
    return {
      page_type: "our_work",
      content_group: "company",
      site_locale,
      route_path,
    };
  }
  if (route_path === "/about") {
    return {
      page_type: "about",
      content_group: "company",
      site_locale,
      route_path,
    };
  }
  if (route_path === "/contact") {
    return {
      page_type: "contact",
      content_group: "conversion",
      site_locale,
      route_path,
    };
  }
  if (route_path === "/privacy") {
    return {
      page_type: "privacy",
      content_group: "legal",
      site_locale,
      route_path,
    };
  }
  if (route_path === "/legal") {
    return {
      page_type: "legal",
      content_group: "legal",
      site_locale,
      route_path,
    };
  }
  return {
    page_type: "other",
    content_group: "other",
    site_locale,
    route_path,
  };
}

const AI_HOSTS: { match: RegExp; channel: TrafficChannel; label: string }[] = [
  { match: /(^|\.)chatgpt\.com$/i, channel: "ai_chatgpt", label: "chatgpt" },
  {
    match: /(^|\.)chat\.openai\.com$/i,
    channel: "ai_chatgpt",
    label: "chatgpt",
  },
  {
    match: /(^|\.)perplexity\.ai$/i,
    channel: "ai_perplexity",
    label: "perplexity",
  },
  { match: /(^|\.)claude\.ai$/i, channel: "ai_claude", label: "claude" },
  {
    match: /(^|\.)gemini\.google\.com$/i,
    channel: "ai_gemini",
    label: "gemini",
  },
  {
    match: /(^|\.)copilot\.microsoft\.com$/i,
    channel: "ai_copilot",
    label: "copilot",
  },
  { match: /(^|\.)you\.com$/i, channel: "ai_other", label: "you" },
  { match: /(^|\.)phind\.com$/i, channel: "ai_other", label: "phind" },
  {
    match: /(^|\.)poe\.com$/i,
    channel: "ai_other",
    label: "poe",
  },
  {
    match: /(^|\.)deepseek\.com$/i,
    channel: "ai_other",
    label: "deepseek",
  },
];

function hostFromUrl(value: string | null | undefined): string {
  if (!value) return "";
  try {
    return new URL(value).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return "";
  }
}

/**
 * Classify acquisition. Prefer UTM when present; else document.referrer.
 * Note: ChatGPT / AI assistants do NOT pass the user prompt — only the referrer host.
 * Google organic queries live in Search Console, not GA4.
 */
export function classifyTraffic(input?: {
  referrer?: string;
  search?: string;
  locationHref?: string;
}): {
  traffic_channel: TrafficChannel;
  ai_referrer: string;
  referrer_host: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
} {
  const search =
    input?.search ??
    (typeof window !== "undefined" ? window.location.search : "");
  const params = new URLSearchParams(search);
  const utm_source = (params.get("utm_source") || "").toLowerCase();
  const utm_medium = (params.get("utm_medium") || "").toLowerCase();
  const utm_campaign = params.get("utm_campaign") || "";

  const referrerRaw =
    input?.referrer ??
    (typeof document !== "undefined" ? document.referrer : "");
  const referrer_host = hostFromUrl(referrerRaw);
  const selfHost = hostFromUrl(
    input?.locationHref ??
      (typeof window !== "undefined" ? window.location.href : ""),
  );

  if (utm_medium === "cpc" || utm_medium === "ppc" || utm_medium === "paid") {
    return {
      traffic_channel: "paid",
      ai_referrer: "",
      referrer_host,
      utm_source,
      utm_medium,
      utm_campaign,
    };
  }
  if (utm_medium === "email" || utm_source === "newsletter") {
    return {
      traffic_channel: "email",
      ai_referrer: "",
      referrer_host,
      utm_source,
      utm_medium,
      utm_campaign,
    };
  }
  if (utm_source.includes("chatgpt") || utm_medium === "ai") {
    return {
      traffic_channel: "ai_chatgpt",
      ai_referrer: utm_source || "utm_ai",
      referrer_host,
      utm_source,
      utm_medium,
      utm_campaign,
    };
  }

  if (!referrer_host || (selfHost && referrer_host === selfHost)) {
    return {
      traffic_channel: referrer_host === selfHost ? "internal" : "direct",
      ai_referrer: "",
      referrer_host: referrer_host === selfHost ? "" : referrer_host,
      utm_source,
      utm_medium,
      utm_campaign,
    };
  }

  for (const entry of AI_HOSTS) {
    if (entry.match.test(referrer_host)) {
      return {
        traffic_channel: entry.channel,
        ai_referrer: entry.label,
        referrer_host,
        utm_source,
        utm_medium,
        utm_campaign,
      };
    }
  }

  if (
    /(^|\.)google\./i.test(referrer_host) ||
    referrer_host === "google.com"
  ) {
    return {
      traffic_channel: "organic_google",
      ai_referrer: "",
      referrer_host,
      utm_source,
      utm_medium,
      utm_campaign,
    };
  }
  if (/(^|\.)bing\.com$/i.test(referrer_host)) {
    return {
      traffic_channel: "organic_bing",
      ai_referrer: "",
      referrer_host,
      utm_source,
      utm_medium,
      utm_campaign,
    };
  }
  if (
    /(^|\.)duckduckgo\.com$/i.test(referrer_host) ||
    /(^|\.)yahoo\./i.test(referrer_host) ||
    /(^|\.)baidu\.com$/i.test(referrer_host)
  ) {
    return {
      traffic_channel: "organic_other",
      ai_referrer: "",
      referrer_host,
      utm_source,
      utm_medium,
      utm_campaign,
    };
  }
  if (/(^|\.)linkedin\.com$/i.test(referrer_host)) {
    return {
      traffic_channel: "social_linkedin",
      ai_referrer: "",
      referrer_host,
      utm_source,
      utm_medium,
      utm_campaign,
    };
  }
  if (
    /(^|\.)(twitter|x|facebook|instagram|threads)\./i.test(referrer_host)
  ) {
    return {
      traffic_channel: "social_other",
      ai_referrer: "",
      referrer_host,
      utm_source,
      utm_medium,
      utm_campaign,
    };
  }

  return {
    traffic_channel: "referral",
    ai_referrer: "",
    referrer_host,
    utm_source,
    utm_medium,
    utm_campaign,
  };
}

export function buildPageViewParams(pathname: string): EventParams {
  const path = classifyPath(pathname);
  const traffic = classifyTraffic();
  return {
    page_path: pathname,
    page_location:
      typeof window !== "undefined" ? window.location.href : undefined,
    page_title: typeof document !== "undefined" ? document.title : undefined,
    page_type: path.page_type,
    site_locale: path.site_locale,
    content_group: path.content_group,
    route_path: path.route_path,
    traffic_channel: traffic.traffic_channel,
    ai_referrer: traffic.ai_referrer || undefined,
    referrer_host: traffic.referrer_host || undefined,
    utm_source: traffic.utm_source || undefined,
    utm_medium: traffic.utm_medium || undefined,
    utm_campaign: traffic.utm_campaign || undefined,
  };
}

/** Fire once per browser session when the landing referrer is an AI assistant. */
export function trackAiReferralLanding(pathname: string) {
  if (typeof window === "undefined") return;
  const traffic = classifyTraffic();
  if (!traffic.ai_referrer && !traffic.traffic_channel.startsWith("ai_")) {
    return;
  }
  try {
    if (sessionStorage.getItem(AI_REFERRAL_SESSION_KEY)) return;
    sessionStorage.setItem(AI_REFERRAL_SESSION_KEY, "1");
  } catch {
    /* continue without dedupe */
  }
  const path = classifyPath(pathname);
  trackEvent("ai_referral", {
    ai_referrer: traffic.ai_referrer || traffic.traffic_channel,
    traffic_channel: traffic.traffic_channel,
    referrer_host: traffic.referrer_host,
    landing_page: pathname,
    page_type: path.page_type,
    site_locale: path.site_locale,
    content_group: path.content_group,
  });
}

export function inferCtaLocation(anchor: HTMLAnchorElement): string {
  const explicit = anchor.getAttribute("data-cta");
  if (explicit) return explicit;
  const section = anchor.closest("section[id], header, footer, main");
  if (section?.id) return section.id;
  if (section?.tagName === "HEADER") return "header";
  if (section?.tagName === "FOOTER") return "footer";
  return "page";
}

export function isContactPath(pathname: string): boolean {
  const route = stripLocale(pathname);
  return route === "/contact";
}
