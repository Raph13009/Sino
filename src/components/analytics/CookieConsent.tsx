"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import {
  isGaEnabled,
  readStoredAnalyticsConsent,
  storeAnalyticsConsent,
  updateGaConsent,
  type AnalyticsConsent,
} from "@/lib/analytics";

export function CookieConsent() {
  const { dict, path } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isGaEnabled()) return;
    if (readStoredAnalyticsConsent()) return;
    setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (value: AnalyticsConsent) => {
    storeAnalyticsConsent(value);
    updateGaConsent(value);
    setVisible(false);
  };

  const copy = dict.cookieConsent;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-ink/10 bg-ivory/95 px-4 py-4 shadow-[0_-8px_32px_rgba(12,35,60,0.08)] backdrop-blur-sm sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p
            id="cookie-consent-title"
            className="font-display text-[0.9375rem] font-medium tracking-[-0.01em] text-ink"
          >
            {copy.title}
          </p>
          <p
            id="cookie-consent-desc"
            className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink/70"
          >
            {copy.description}{" "}
            <a
              href={path("/privacy")}
              className="underline decoration-ink/25 underline-offset-2 hover:text-ink hover:decoration-ink/50"
            >
              {copy.privacyLink}
            </a>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            showArrow={false}
            className="min-h-10 h-10 px-4 text-[0.75rem]"
            onClick={() => choose("denied")}
          >
            {copy.reject}
          </Button>
          <Button
            type="button"
            variant="primary"
            showArrow={false}
            className="min-h-10 h-10 px-4 text-[0.75rem]"
            onClick={() => choose("granted")}
          >
            {copy.accept}
          </Button>
        </div>
      </div>
    </div>
  );
}
