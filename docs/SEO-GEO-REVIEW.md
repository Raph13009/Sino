# Executive verdict

**PASS WITH FIXES**

The first implementation had a real SEO foundation (unique titles, self-canonicals, hreflang, sitemap, Organization/Service/Article JSON-LD). It also had high-risk holes: canonicals could follow a non-www or arbitrary `NEXT_PUBLIC_SITE_URL`, `/en` used a temporary redirect, and unused GA4 event wrappers turned several links into client islands before any Measurement ID existed.

Those issues are fixed. Production remains `index, follow`. Preview/development remain noindex. A local production HTML pass after the fixes matches the expected www host.

---

# What the first implementation got right

- Framework-native metadata via `createMetadata()`, with `title.absolute` after the double `| OPOPA | OPOPA` bug was caught in their own validation.
- English unprefixed vs `/zh` hreflang (`en`, `zh-Hans`, `x-default` → English).
- Sitemap generated from catalog + insight files: 38 URLs, 19 EN / 19 ZH, no `/en`, no `/expertise`, no fake priority/changefreq, `lastmod` only on insights.
- Production `robots.txt` allows `/` and points at `https://www.opopa-partners.com/sitemap.xml`.
- Preview noindex uses **three** layers (metadata robots, `X-Robots-Tag`, preview `robots.txt` disallow). `VERCEL_ENV=production` is not treated as preview.
- Organization JSON-LD does not put founder LinkedIn URLs on `sameAs`.
- Service JSON-LD matches on-page names/summaries; `areaServed` = Europe matches copy; no Offer/price/rating.
- Article JSON-LD only on Insights; dates come from frontmatter (`2026-03-12` on the sampled article, not “now”).
- Person JSON-LD on About is justified: both founders are on the page with real names, “Co-founder”, portraits, and LinkedIn URLs; `worksFor` points at the Organization `@id`.
- Related insights are reverse-lookups from existing frontmatter, hidden when empty — not dumped on every page.
- About service links reuse existing tertiary buttons after the execution section.
- 404 is `noindex` with a dedicated title.
- CIVEP remains only in the historical `CIVEP_Website_Brief/` folder, not in runtime UI, metadata, sitemap, robots, or `llms.txt`.
- Search Console HTML token was left untouched.

---

# Problems found and fixed

### 1. Canonical host not actually locked to www

- **Severity:** High
- **File:** `src/lib/site.ts`
- **Problem:** `resolveSiteUrl()` only rejected localhost / `*.vercel.app`. `https://opopa-partners.com` (apex), `http://…`, or any other host in `NEXT_PUBLIC_SITE_URL` would have become `metadataBase`, canonicals, OG URLs, sitemap, robots host, and JSON-LD.
- **Fix:** Canonical origin is hardcoded to `https://www.opopa-partners.com`. Env can no longer override it.
- **Validation:** `absoluteUrl("/")` → `https://www.opopa-partners.com`. Rendered canonicals/og:url/sitemap/JSON-LD on sampled EN/ZH pages all use that host. No non-www, no `localhost`, no `vercel.app`.

### 2. `/en` redirects were 307 (temporary)

- **Severity:** High
- **File:** `src/middleware.ts`
- **Problem:** `NextResponse.redirect(url)` defaults to 307. `/en` and `/en/services` would not be treated as a stable consolidation to unprefixed canonicals.
- **Fix:** Permanent redirect `308`.
- **Validation:** `curl`-equivalent without following: `/en` → `308 Location: /`; `/en/services` → `308 Location: /services`; insight `/en/insights/…` → unprefixed path. No sitemap `/en` entries. No JSON-LD `/en` URLs.

### 3. Preview noindex condition duplicated (drift risk)

- **Severity:** Low
- **File:** `next.config.ts`
- **Problem:** `isPreviewDeployment` in `next.config.ts` duplicated `shouldNoIndexDeployment()` and could diverge.
- **Fix:** `next.config.ts` imports `shouldNoIndexDeployment`.
- **Validation:** Env matrix (see below) — production never noindex; preview/development do.

**Env matrix (`shouldNoIndexDeployment` / `isProductionDeployment`):**

| VERCEL_ENV | NODE_ENV | noindex | isProd |
|---|---|---|---|
| production | production | false | true |
| preview | production | true | false |
| development | development | true | false |
| missing | production | false | true |
| missing | development | false | false |
| Production (wrong case) | production | false | true |

Wrong-case `Production` stays **indexable** (safer than accidentally noindexing). Vercel sets lowercase `production`.

Production HTML: `robots=index, follow`, no `X-Robots-Tag`. Production `robots.txt` is `Allow: /` plus sitemap.

### 4. GA4 event layer shipped with no Measurement ID

- **Severity:** Medium
- **Files:** `src/lib/analytics.ts`, deleted `src/components/analytics/*`, plus call sites
- **Problem:** Client wrappers (`TrackedButton`, `EmailLink`, `OutboundLink`), `LinkedInLink` converted to `"use client"`, ContactForm `useEffect`, and a naive `gtag('config')` snippet. No ID in the repo. App Router client navigations would not send `page_view`. Events were dead code that still added JS and hydration surface. Honeypot “success” would have fired `contact_form_submit` if GA were later enabled.
- **Fix:** Removed the snippet and all event wrappers. Restored server `LinkedInLink` and plain `<a>`/`Button` links. `analytics.ts` only gates Vercel Analytics to production and documents how to add GA4 later (privacy first, App Router pageviews, no form fields).
- **Validation:** Rendered HTML has no `gtag/js`. `tsc` / lint / build pass. Contact/footer links are normal accessible anchors.

### 5. `llms.txt` homepage URL disagreed with canonical slash

- **Severity:** Low
- **File:** `public/llms.txt`
- **Problem:** Preferred-sources homepage used a trailing slash; canonical homepage does not.
- **Fix:** `https://www.opopa-partners.com` without trailing slash. Content otherwise factual (current service names, no `/expertise`, no headcount claim).
- **Validation:** `GET /llms.txt` — no `/expertise`, no `60–500`, homepage matches canonical.

### 6. Docs overstated GA readiness / Search Console domain verification

- **Severity:** Low
- **Files:** `README.md`, `.env.example`, `docs/LEGAL-LAUNCH-TODOS.md`
- **Problem:** README treated `NEXT_PUBLIC_GA_MEASUREMENT_ID` as a live opt-in. Legal TODOs said GA4 activates when that env is set. HTML meta verification was not clearly distinguished from DNS Domain-property verification in README.
- **Fix:** README/legal notes now state GA4 is **not shipped**; HTML meta verifies a **URL-prefix** property; Domain property is DNS.
- **Validation:** Grep of runtime `src/` — no GA Measurement ID reader.

---

# Changes deliberately reverted or simplified

- **Removed GA4:** `GoogleAnalytics.tsx`, `TrackedButton.tsx`, `EmailLink.tsx`, `trackEvent` / `analyticsEvents`, ContactForm success tracking, client conversion of `LinkedInLink`, extra `Button` `onClick` for links.
- **Kept:** Vercel Web Analytics, production-only (`isProductionDeployment()`). One mount in root layout.
- **Kept Person JSON-LD** after review — visible, factual, `worksFor` → Organization `@id`.
- **Kept related-insight links** — they follow existing MDX `relatedServices` / `relatedIndustries`.
- **Did not add** more schema types, SEO packages, or tracking.

---

# Human actions still required

These are not code defects to invent around:

1. **Search Console Domain property** — verify `opopa-partners.com` via **DNS**. The HTML token in `src/app/layout.tsx` can only verify a URL-prefix property.
2. **Apex → www** — `https://opopa-partners.com` → `https://www.opopa-partners.com` at the Vercel domain layer. App canonicals are www; the redirect is DNS/hosting.
3. **Submit sitemap** `https://www.opopa-partners.com/sitemap.xml`.
4. **Legal / privacy TODOs** still render on `/legal` and `/privacy` (operator name, address, publication director, hosting legal entity). Intentional until counsel fills them.
5. **Privacy vs Vercel Analytics** — policy still says no third-party analytics requiring consent; Vercel Web Analytics loads in production (cookieless). Do not invent legal copy; counsel should name it or not.
6. Production inbox vs personal Gmail (also in Organization `contactPoint`, because it is the public contact).
7. Company LinkedIn Page, if/when it exists, before adding `Organization.sameAs`.
8. Designed 1200×630 OG image (hero photo is still the default).
9. About proof media (honest empty state remains).
10. GA4 only after privacy update and an App Router-aware loader — not by flipping an env var today.

---

# Final production checklist

- [ ] Vercel Production: `VERCEL_ENV` is `production` (platform default). Do not set it to `preview`.
- [ ] Confirm Preview deployments send `X-Robots-Tag: noindex, nofollow` and a disallow-all `robots.txt`.
- [ ] Apex host redirects to `https://www.opopa-partners.com`.
- [ ] Search Console: Domain property (DNS) + URL-prefix www if used.
- [ ] Submit `https://www.opopa-partners.com/sitemap.xml`.
- [ ] Inspect `/`, `/services`, one service, `/about`, one insight, `/zh/services`.
- [ ] Confirm Google-selected canonical is the www self-canonical.
- [ ] Monitor Page Indexing for leftover `/en` and `/expertise` (should be redirects).
- [ ] Counsel: legal TODOs + whether to disclose Vercel Analytics on `/privacy`.
- [ ] Do not set a GA Measurement ID until the loader and privacy text exist.
