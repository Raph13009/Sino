/**
 * Analytics
 * ---------
 * - Vercel Web Analytics: cookieless, production-only (root layout).
 * - GA4: optional via NEXT_PUBLIC_GA_MEASUREMENT_ID (Production only).
 *   Loaded with Consent Mode v2 (analytics_storage denied by default).
 *   App Router page_view on pathname change. No form field values.
 */

import { isProductionDeployment } from "./site";

export const GA_CONSENT_STORAGE_KEY = "opopa_analytics_consent";

export type AnalyticsConsent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

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
