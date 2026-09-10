# OPOPA Partners — SEO + GEO validation

**Date:** 10 September 2026  
**Method:** `npx tsc --noEmit`, `npm run lint`, `npm run build`, then `next start` and HTML inspection of representative URLs. No browser automation tools were available in this session.

---

## Completed changes

### P0 — indexation safety

- Preview / Vercel `development` deployments send `X-Robots-Tag: noindex, nofollow` (Next config headers + middleware) and emit a disallow-all `robots.txt`.
- Page metadata `robots` is forced `noindex` on those deployments. Production stays `index, follow`.
- Canonicals always resolve to `https://www.opopa-partners.com`. Localhost and `*.vercel.app` values in `NEXT_PUBLIC_SITE_URL` are ignored.
- Homepage canonical has no trailing slash; other URLs have none.
- Root and locale 404 pages are `noindex` with title `Page not found | OPOPA`.

### P1 — metadata, sitemap, schema, linking, analytics

- Unique titles for services, industries, insights, about and contact (EN + ZH). Titles use `absolute` so the root template cannot double-suffix `| OPOPA`.
- Sitemap: 38 canonical URLs (EN + ZH). No `priority` / `changefreq`. `lastmod` only on the 6 insight URLs (3 articles × 2 locales).
- `robots.txt` (production): `Allow: /`, host + sitemap `https://www.opopa-partners.com/sitemap.xml`.
- Organization JSON-LD: name, alternateName, url, description, slogan, logo, public email contactPoint. **No `sameAs`** (no company social profile in the repo).
- Homepage `WebSite` JSON-LD. About page `Person` JSON-LD for both founders. Service `areaServed` = Europe.
- Service and industry pages link to related insights. About links to the four services. Insight breadcrumbs use the article title.
- About developer `TODO —` note is not rendered. Honest proof placeholder body remains.
- Optional GA4 via `NEXT_PUBLIC_GA_MEASUREMENT_ID` (inactive when unset). Events: contact CTA, service CTA, form submit, LinkedIn, email. No form field values.
- Vercel Analytics only mounts when `isProductionDeployment()` is true.
- `public/llms.txt` updated to current services, industries and canonical URLs.
- Footer copyright uses **OPOPA Partners**. `.env.example` CIVEP comments removed.

---

## Files changed

**New**

- `docs/SEO-GEO-AUDIT.md`
- `docs/SEO-GEO-VALIDATION.md`
- `src/app/not-found.tsx`
- `src/components/analytics/GoogleAnalytics.tsx`
- `src/components/analytics/TrackedButton.tsx`
- `src/components/analytics/EmailLink.tsx`

**Updated (implementation)**

- `src/lib/site.ts`, `src/lib/seo.ts`, `src/lib/analytics.ts`
- `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`
- `src/app/[locale]/layout.tsx`, `page.tsx`, `not-found.tsx`
- `src/app/[locale]/services/page.tsx`, `services/[slug]/page.tsx`
- `src/app/[locale]/industries/page.tsx`, `industries/[slug]/page.tsx`
- `src/app/[locale]/insights/page.tsx`, `insights/[slug]/page.tsx`
- `src/app/[locale]/about/page.tsx`, `contact/page.tsx`, `legal/page.tsx`, `privacy/page.tsx`
- `src/middleware.ts`, `next.config.ts`
- `src/content/locales/en.ts`, `zh.ts`
- `src/content/insights/load.ts`
- `src/components/seo/JsonLd.tsx`, `ui/Button.tsx`, `ui/Breadcrumbs.tsx`, `ui/Logo.tsx`, `ui/LinkedInLink.tsx`
- `src/components/home/HomeHero.tsx`, `layout/FinalCta.tsx`, `layout/SiteFooter.tsx`, `contact/ContactForm.tsx`
- `public/llms.txt`, `.env.example`, `README.md`, `docs/LEGAL-LAUNCH-TODOS.md`

---

## Tests run

| Command | Result |
|---|---|
| `npx tsc --noEmit` | Pass |
| `npm run lint` | Pass |
| `npm run build` | Pass (Next.js 16.3.4, 42 static pages generated) |
| HTML inspection via `next start` | Pass after title `absolute` fix |

No automated test suite exists in the project.

### Inspected HTML (production server)

| URL | Title | Canonical | JSON-LD | H1 |
|---|---|---|---|---|
| `/` | OPOPA — European Market Entry & Commercial Partner | `https://www.opopa-partners.com` | Organization, WebSite | Turning Chinese industrial ambition… |
| `/services` | Services for European Market Entry \| OPOPA | `…/services` | Organization, BreadcrumbList | Commercial services for European market entry. |
| `/services/sales-enablement` | Sales Enablement for European B2B Markets \| OPOPA | self | Organization, BreadcrumbList, Service | Sales Enablement |
| `/insights/european-market-entry-…` | … \| OPOPA Insights | self | Organization, BreadcrumbList, Article | What European market entry requires… |
| `/about` | About OPOPA Partners | self | Organization, BreadcrumbList, Person × 2 | Built between China and Europe. |
| `/contact` | Contact OPOPA Partners | self | Organization, BreadcrumbList | Discuss your European expansion. |
| `/zh/services` | 欧洲市场进入服务 \| OPOPA | `…/zh/services` | Organization, BreadcrumbList | (ZH H1) |
| `/legal` | Legal Notice \| OPOPA | self | Organization, BreadcrumbList | Legal Notice |
| `/does-not-exist` | Page not found \| OPOPA | — | — | Page not found (`noindex`) |

Also confirmed:

- `robots.txt` allows `/` and points at the production sitemap
- Sitemap: 38 URLs, hreflang pairs, no fake priority/changefreq
- Landmarks: `header` / `nav` / `main` / `footer` on sampled pages
- GA snippet absent without a Measurement ID
- Related insights on Sales Enablement; service names linked from About
- Visible About copy does not include the developer TODO string

---

## Unresolved issues

1. **Next.js 16 `middleware.ts` deprecation.** Build warns to migrate to `proxy.ts`. Left as P2 — behaviour is correct; renaming is unrelated to this SEO pass.
2. **Many App Router pages are dynamic (`ƒ`)** because the root layout reads `headers()` for `html lang`. Not introduced here. Could later pass locale without `headers()` to improve static HTML.
3. **Default OG image is still the hero photograph**, not a designed 1200×630 card. Path/architecture is ready (`siteConfig.ogImage`).
4. **Vercel Web Analytics vs privacy copy.** Analytics is cookieless and production-only; the privacy policy still says third-party analytics requiring consent are not used. Counsel should update `/privacy` if they want this named.
5. **Founder PNG originals (~1.7MB)** remain in `public/images/team/` unused (WebP is referenced). P2 cleanup.
6. **No in-browser visual pass** (mobile/desktop, keyboard, CLS). Semantics and metadata were validated from HTML.

---

## Items requiring human / business input

- Production inbox replacing `raphaellevy027@gmail.com`
- Company LinkedIn Page URL (then add to `Organization.sameAs`)
- Legal operator full name, professional address, publication director, hosting legal entity (`docs/LEGAL-LAUNCH-TODOS.md`)
- Whether to publish the acronym expansion “Optimizers of Operations and Partnerships” on-page (not currently in the live dictionary — not added)
- Client proof, testimonials, credentials for the About proof section
- Designer OG image 1200×630 (see `docs/SEO-GEO-AUDIT.md` §13)
- Decision to enable GA4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`) **after** privacy-policy update
- Apex → www DNS/domain redirect on Vercel

---

## External manual steps

Search Console:

- [ ] Verify domain property `opopa-partners.com`
- [ ] Confirm apex redirects to `https://www.opopa-partners.com`
- [ ] Submit `https://www.opopa-partners.com/sitemap.xml`
- [ ] Inspect homepage, `/services`, each service URL, `/about`, one insight
- [ ] Confirm Google-selected canonical
- [ ] Monitor Page Indexing (previews should stay excluded)
- [ ] Monitor Core Web Vitals after the next production deploy

Vercel:

- [ ] Set `NEXT_PUBLIC_SITE_URL=https://www.opopa-partners.com` on Production
- [ ] Do **not** set a GA ID on Preview
- [ ] Confirm Preview deployments are not indexed (header + robots)
