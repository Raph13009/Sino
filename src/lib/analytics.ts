/**
 * Analytics
 * ---------
 * Vercel Web Analytics is mounted from the root layout in production only.
 *
 * GA4 is not shipped. The previous event-wrapper implementation was removed
 * because no Measurement ID exists and App Router client navigations were
 * not tracked. To add GA4 later:
 * 1. Update the privacy policy (and consent, if counsel requires it).
 * 2. Set NEXT_PUBLIC_GA_MEASUREMENT_ID on the Production environment only.
 * 3. Use an App Router-aware loader (page_view on pathname change).
 * 4. Do not send form field values, emails, or message text.
 */

import { isProductionDeployment } from "./site";

export function isVercelAnalyticsEnabled() {
  return isProductionDeployment();
}
