"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  buildPageViewParams,
  getGaMeasurementId,
  isContactPath,
  isGaEnabled,
  inferCtaLocation,
  readStoredAnalyticsConsent,
  trackAiReferralLanding,
  trackEvent,
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
    trackEvent("page_view", buildPageViewParams(pathname));
    trackAiReferralLanding(pathname);
  }, [enabled, measurementId, pathname]);

  useEffect(() => {
    if (!enabled) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      if (isContactPath(url.pathname)) {
        trackEvent("contact_cta_click", {
          ...buildPageViewParams(pathname),
          cta_location: inferCtaLocation(anchor),
          link_url: url.pathname,
        });
        return;
      }

      if (url.protocol === "mailto:") {
        trackEvent("outbound_click", {
          ...buildPageViewParams(pathname),
          outbound_destination: "email",
          // Host only — never the full address path/query.
          link_url: "mailto",
        });
        return;
      }

      if (/(^|\.)linkedin\.com$/i.test(url.hostname)) {
        trackEvent("outbound_click", {
          ...buildPageViewParams(pathname),
          outbound_destination: "linkedin",
          link_url: url.hostname,
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled, pathname]);

  if (!enabled || !measurementId) return null;

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
