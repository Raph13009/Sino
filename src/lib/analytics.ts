/**
 * Analytics & Search Console readiness
 * ------------------------------------
 * Do NOT load third-party analytics scripts or tracking IDs yet.
 *
 * When ready to integrate later:
 * 1. Set env vars (see .env.example) — never commit secrets or IDs into source.
 * 2. Add a privacy-appropriate provider in this module only.
 * 3. Mount a single client/server component from the root layout.
 * 4. Update privacy / cookie notices after legal review.
 *
 * Search Console: verify ownership via DNS or HTML meta once the production
 * domain is live — no site tags are embedded now.
 */

export const analyticsConfig = {
  enabled: false,
  // Future: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  // Future: process.env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION
} as const;

export function isAnalyticsEnabled() {
  return analyticsConfig.enabled;
}
