"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  getGaMeasurementId,
  isGaEnabled,
  readStoredAnalyticsConsent,
} from "@/lib/analytics";

/**
 * Consent defaults must run before gtag/js. Mount only from the root layout
 * (beforeInteractive requirement).
 */
export function GoogleAnalyticsConsentDefaults() {
  if (!isGaEnabled()) return null;

  return (
    <Script id="ga-consent-default" strategy="beforeInteractive">{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var stored = null;
try { stored = localStorage.getItem("opopa_analytics_consent"); } catch (e) {}
gtag("consent", "default", {
  analytics_storage: stored === "granted" ? "granted" : "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  wait_for_update: 500
});
`}</Script>
  );
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const measurementId = getGaMeasurementId();
  const enabled = isGaEnabled() && Boolean(measurementId);

  useEffect(() => {
    if (!enabled || !measurementId || typeof window.gtag !== "function") return;
    // Consent Mode still receives the hit; cookies only when granted.
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [enabled, measurementId, pathname]);

  if (!enabled || !measurementId) return null;

  // Re-apply stored choice after gtag loads (banner may have set it earlier).
  const onReady = () => {
    const stored = readStoredAnalyticsConsent();
    if (stored && typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: stored });
    }
  };

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onReady={onReady}
      />
      <Script id="ga-config" strategy="afterInteractive">{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag("js", new Date());
gtag("config", ${JSON.stringify(measurementId)}, {
  anonymize_ip: true,
  send_page_view: false,
  allow_google_signals: false,
  allow_ad_personalization_signals: false
});
`}</Script>
    </>
  );
}
