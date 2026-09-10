# OPOPA Partners — Technical SEO + GEO Audit

**Date:** 10 September 2026  
**Site:** https://www.opopa-partners.com  
**Stack:** Next.js 16.3.4 App Router, React 19, TypeScript, Tailwind CSS 4  
**Locales:** English (unprefixed) and Simplified Chinese (`/zh/…`)

This audit is based on the repository as it exists today. No company facts were invented.

---

## 1. What already exists

The site already has a substantial SEO foundation. It is not a greenfield SEO project.

### Architecture

| Area | Implementation |
|---|---|
| Framework | Next.js App Router (`src/app`), locale segment `[locale]` |
| Routing | `src/middleware.ts` rewrites English to `/en/…` internally and redirects `/en/…` to unprefixed URLs. Chinese is public at `/zh/…`. |
| Canonical domain | `NEXT_PUBLIC_SITE_URL` with fallback `https://www.opopa-partners.com` (`src/lib/site.ts`) |
| Metadata helper | `createMetadata()` in `src/lib/seo.ts` — title, description, canonical, hreflang, Open Graph, Twitter, robots |
| Per-page metadata | Every indexable `page.tsx` exports `generateMetadata()` |
| Sitemap | Framework-native `src/app/sitemap.ts` — home, core pages, services, industries, insights, both locales, hreflang alternates |
| Robots | Framework-native `src/app/robots.ts` — allow `/`, sitemap URL, host |
| JSON-LD | Organization (all pages via locale layout), BreadcrumbList, Service, Article |
| Visible breadcrumbs | All pages below home except 404 |
| Insights | MDX in `content/insights/{en,zh}/` with dates, author, related services/industries |
| Images | `next/image` via `MediaImage`; AVIF/WebP configured; width/height/alt in `src/content/media.ts` |
| Fonts | `next/font` (Inter, Inter Tight, Noto Sans SC) with `display: swap` |
| Analytics | `@vercel/analytics` mounted in root layout |
| Search Console | Google site verification meta already in `src/app/layout.tsx` |
| Favicons | `/brand/favicon.ico`, 16/32/PNG, apple-touch-icon |
| `llms.txt` | Present at `public/llms.txt` (stale — see §4) |
| Legacy redirects | `/expertise` → `/services` (and slug mappings) in `next.config.ts` |
| `metadataBase` | Set from `siteConfig.url` |

### Indexable routes

English (canonical, no prefix) and Chinese (`/zh` prefix):

- `/`
- `/services`, `/services/{sales-enablement,expert-partner-sourcing,outsourced-sales,sales-ai-automation}`
- `/industries`, `/industries/{industrial-equipment,advanced-manufacturing,green-technology,mobility-infrastructure}`
- `/insights`, `/insights/{three article slugs}`
- `/about`
- `/contact`
- `/legal`, `/privacy`

### Current title map (English, after `createMetadata` suffix)

| Page | Title |
|---|---|
| Home | OPOPA — European Market Entry & Commercial Partner |
| Services index | Services \| OPOPA |
| Sales Enablement | Sales Enablement for European B2B Markets \| OPOPA |
| Expert & Partner Sourcing | Expert & Partner Sourcing in Europe \| OPOPA |
| Outsourced Sales | Outsourced Sales Representation in Europe \| OPOPA |
| Sales AI & Automation | Sales AI & Automation for Commercial Operations \| OPOPA |
| Industries index | Industries \| OPOPA |
| Industry detail | Unique per industry \| OPOPA |
| Insights index | Insights \| OPOPA |
| Insight articles | Unique `seoTitle` from MDX |
| About | About \| OPOPA |
| Contact | Contact \| OPOPA |
| Legal | Legal Notice \| OPOPA |
| Privacy | Privacy Policy \| OPOPA |

Descriptions are unique per template. Service/industry/article descriptions are context-specific.

---

## 2. What is correct

- Production base URL defaults to `https://www.opopa-partners.com` (HTTPS, www).
- Self-referencing canonicals per locale; English and Chinese are not collapsed onto one URL.
- `hreflang` includes `en`, `zh-Hans`, and `x-default` (English).
- Open Graph `url` matches the canonical. `locale` / `alternateLocale` are set.
- Twitter `summary_large_image` is set.
- Sitemap is generated from the real catalog + insight files, not a handmade list of stale paths.
- Legacy `/expertise` URLs 301 to current `/services` URLs.
- Organization name/alternateName (`OPOPA Partners` / `OPOPA`) match brand rules.
- Service JSON-LD is only on service detail pages and uses on-page names/summaries.
- Article JSON-LD is only on genuine insight pages, with real `date` / `updatedAt` / `author` from frontmatter.
- Breadcrumb JSON-LD and visible breadcrumbs exist on hierarchical pages; homepage has none.
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>` on listing cards.
- One H1 per page; H2/H3 follow section structure (`SectionHeading`).
- Primary navigation uses real `<a>`/`Link` hrefs (including mega-menu items). Not JS-only.
- Buttons vs links: `Button` renders `<Link>` when `href` is present, `<button>` for submit.
- Internal linking: home → services/industries/insights/contact; industry pages → all services; insights → related services and industries; footer lists services, industries, company, legal.
- `next/image` with dimensions; hero uses `priority`; below-fold listing images do not.
- Alt text describes the photograph, not a keyword list.
- `poweredByHeader: false`.
- Contact form is a Server Action (no public `/api` indexable route).
- Reduced-motion CSS is present. Focus-visible outline is global.

---

## 3. What is missing

- Preview/staging `noindex` (Vercel preview URLs can be indexed if discovered).
- Production-safe URL guard against `*.vercel.app` leaking into canonicals if env is mis-set.
- Homepage `WebSite` JSON-LD (name/disambiguation; no SearchAction — there is no site search).
- `Person` JSON-LD for founders on `/about` (names, roles and LinkedIn URLs are on the page).
- GA4 support gated on `NEXT_PUBLIC_GA_MEASUREMENT_ID` (inactive when unset).
- Business event tracking (CTA, form submit, LinkedIn, email) that no-ops without GA.
- Related insights on service/industry pages (insights already point to services; the reverse is missing).
- About page HTML link into `/services` (copy mentions services; no in-body link).
- 404 `noindex` metadata.
- Default root `title` / `description` fallback.
- Realistic sitemap `lastModified` (insights have dates; marketing pages currently stamp `new Date()`).
- Dedicated 1200×630 social-sharing asset (see §16).
- Cookie/consent architecture for GA4 **if** a Measurement ID is later added (legal TODO).
- Company LinkedIn Page URL (only personal founder profiles exist — do not put those on `Organization.sameAs`).

---

## 4. What is incorrectly implemented

1. **`Organization.sameAs` includes founder personal LinkedIn URLs.** Google `sameAs` is for official profiles of the *organization*. Raphael’s and Max’s personal profiles are not an OPOPA company page. Site LinkedIn in `siteConfig` is itself Raphael’s personal URL (`README` calls it temporary).
2. **Sitemap emits `changefrequency` and `priority`.** These are not based on crawl data; they are decorative SEO values.
3. **Sitemap `lastModified: new Date()`** on every marketing URL. That claims every page changed at build time.
4. **Listing titles are generic** (`Services`, `About`, `Contact`) and rely on a `| OPOPA` suffix. Unique enough to avoid duplicates, but weak in SERPs.
5. **Insight visible breadcrumb last item is the category**, not the article title. JSON-LD uses the title. They should match.
6. **`public/llms.txt` is stale:** `/expertise` (redirected), old service labels (“European Partner Network”, “Market Entry Advisory”), audience size “60–500 employees” that is not a confirmed on-page claim in current copy.
7. **`.env.example` and Resend comments still say CIVEP / civep.com.**
8. **`src/lib/analytics.ts` and `README` say Search Console / analytics are not configured.** Search Console verification *is* in root metadata; Vercel Analytics *is* mounted.
9. **Privacy policy says no third-party analytics requiring consent**, while `@vercel/analytics` loads on every request. Vercel Web Analytics is cookieless, but the legal docs are out of date (`docs/LEGAL-LAUNCH-TODOS.md` still says analytics is not active).
10. **About page renders an internal `TODO —` developer note** (`dict.about.proof.todoNote`) in public HTML.
11. **`createMetadata` homepage canonical** becomes `https://www.opopa-partners.com/` (trailing slash) while other URLs have none.
12. **Organization JSON-LD `inLanguage` on every page** is a weak fit (language belongs on WebSite/WebPage). Harmless but imprecise.
13. **Legal/privacy pages have visible breadcrumbs but no BreadcrumbList JSON-LD.**

---

## 5. Recommendations (ranked)

### P0 — Critical

| ID | Item | Why |
|---|---|---|
| P0.1 | Noindex Vercel preview and `VERCEL_ENV=development` deployments (`X-Robots-Tag` + metadata robots + preview `robots.txt`) | Prevent duplicate/preview URLs from being indexed. Must not noindex production. |
| P0.2 | Keep canonicals on the production www host; never emit `vercel.app` / localhost | `metadataBase` and `absoluteUrl()` must ignore preview hostnames. |
| P0.3 | 404 responses `noindex, nofollow` | Error pages must not compete with real URLs. |

### P1 — High impact

| ID | Item | Why |
|---|---|---|
| P1.1 | Unique, descriptive titles for index/about/contact pages (EN + ZH) | Stronger SERP snippet without stuffing. |
| P1.2 | Sitemap: drop fake priority/changefreq; keep insight `lastModified`; omit fake dates on static pages | Matches Google guidance. |
| P1.3 | Organization JSON-LD: omit `sameAs` until a company profile exists; keep only facts on the site (name, url, logo, description, public email contactPoint, slogan). | Entity disambiguation without false social graph. |
| P1.4 | `WebSite` JSON-LD on the homepage. `Person` JSON-LD on About for both founders. | Matches visible content; helps GEO/entity understanding. |
| P1.5 | Service `areaServed` = “Europe” (copy says European markets, not only “European Union”). | Schema must match visible wording. |
| P1.6 | Reverse internal links: service/industry pages → related insights; About → Services. | Crawl paths and topical connections. |
| P1.7 | Align insight breadcrumb (visible last crumb = title). | Consistency with JSON-LD. |
| P1.8 | Optional GA4 via `NEXT_PUBLIC_GA_MEASUREMENT_ID`; events for contact CTA, form submit, LinkedIn, email. Inactive when unset. Production-only. | Ready without inventing a Measurement ID. |
| P1.9 | Load Vercel Analytics in production only. Document the privacy-policy gap (do not invent legal copy). | Avoid preview noise; flag legal update. |
| P1.10 | Root fallback title/description; OG image alt from page title; homepage canonical without mixed slash. | Completeness. |
| P1.11 | Stop rendering About `TODO —` developer note. Keep the honest “will be published when approved” body. | Do not index internal scaffolding. |
| P1.12 | Legal/privacy BreadcrumbList JSON-LD. JSON-LD script escaping. | Completeness + safety. |
| P1.13 | Refresh `llms.txt` with current canonical paths and on-page facts only. | P3 in the brief; implemented after P0/P1 because the file is already live and currently wrong. |
| P1.14 | Footer copyright uses **OPOPA Partners**. Fix CIVEP leftovers in `.env.example` / README analytics claims. | Brand + docs accuracy. |

### P2 — Useful

| ID | Item | Why |
|---|---|---|
| P2.1 | Dedicated 1200×630 OG/share image (designer asset). Architecture already points at a default image. | Current default is the hero photograph, not a composed share card. |
| P2.2 | Localize breadcrumb `aria-label`. | Minor a11y. |
| P2.3 | Compress or stop shipping unused 1.7MB founder PNGs (WebP is what the site uses). | Weight, not LCP-critical. |
| P2.4 | Replace placeholder photography (`status: "placeholder"` in `media.ts`). | Visual quality / LCP source quality. |
| P2.5 | www ↔ apex redirect at the Vercel domain layer (cannot be fully guaranteed in-app). | Canonical host. |
| P2.6 | `CollectionPage` / `ItemList` on services, industries, insights indexes. | Optional; listing pages are already clear. |
| P2.7 | FAQ schema only if/when `InsightFaq` is used in MDX (component exists, unused). | Do not add empty FAQ markup. |
| P2.8 | Rename `middleware.ts` → `proxy.ts` (Next.js 16). | Framework hygiene, not SEO. |

### P3 — Optional

| ID | Item | Why |
|---|---|---|
| P3.1 | Company LinkedIn Page (when it exists) added to `sameAs`. | Needs a real org profile. |
| P3.2 | Production inbox replacing the personal Gmail in schema + footer. | Temporary contact is already public. |
| P3.3 | Legal operator name, address, hosting legal entity. | Blocked on human/legal input. |
| P3.4 | Client proof, testimonials, metrics. | Explicitly not to be invented. |
| P3.5 | GA4 consent banner if/when GA is enabled and counsel requires it. | Legal, not technical SEO. |

---

## 6. Page-by-page metadata notes

All indexable pages already have unique descriptions. P1 title rewrites (implemented) keep the same meaning as on-page H1/leads:

| URL | Issue | Action |
|---|---|---|
| `/` | Strong title/description already | Keep |
| `/services` | Title too generic | More specific title |
| `/services/*` | Good | Keep |
| `/industries` | Generic title | More specific title |
| `/industries/*` | Good | Keep |
| `/insights` | Generic title | More specific title |
| `/insights/*` | Good (`seoTitle` + article OG type + dates) | Keep; fix breadcrumb |
| `/about` | Generic title | “About OPOPA Partners” |
| `/contact` | Generic title | “Contact OPOPA Partners” |
| `/legal`, `/privacy` | Adequate; incomplete legal TODOs visible | Keep indexable; human must finish legal copy |
| 404 | No metadata robots | noindex |

No page canonicalizes to the homepage incorrectly.

---

## 7. Structured data — accuracy rules used

**Included (facts in the repo):**

- Organization: OPOPA Partners, OPOPA, site URL, description, logo, slogan “Markets in Sync”, public email, available languages English/Chinese
- Service: name, description, URL, provider, area served Europe, audience as on-page
- Article: headline, description, URL, dates, author “OPOPA”, publisher, image
- BreadcrumbList: Home → section → page
- Person (About): name, role Co-founder, worksFor OPOPA Partners, LinkedIn `sameAs`, portrait image

**Excluded (not in the project as verified org facts):**

- Postal address, telephone, founding date, VAT (beyond published SIRET on legal page — SIRET is not added to Organization schema because Organization here is the brand, and legal operator identity still contains TODOs)
- Company social profiles
- Offers, prices, aggregate ratings, reviews
- FAQPage
- SearchAction
- Article schema on marketing pages

---

## 8. Images / Core Web Vitals (likely)

**LCP:** Homepage hero `/images/hero/hero-industrial-port.jpg` (~589KB source, 2400×1600). Served via `next/image` with `priority`. Likely LCP element is the H1 or the hero image depending on viewport. Fonts are self-hosted via `next/font` (good for CLS).

**CLS:** Image width/height provided; aspect-ratio frames on MediaImage. Logo has intrinsic size. Low risk except webfont swap (`display: swap` — acceptable).

**INP:** Header is a client component with mega-menu and mobile drawer. Motion is present as a dependency; homepage sections inspected are mostly server components. Mega-menu hover is the main interaction surface.

**Trade-offs (do not strip):** editorial hover on images, sticky header blur, mega-menu. These are brand, not SEO hacks.

**Oversized sources:** founder PNGs 1.7–1.8MB sit beside 57–61KB WebP actually referenced. Unused PNG weight is a P2 cleanup.

**OG default:** `siteConfig.ogImage` = hero JPEG. Not a designed 1200×630 card. See designer spec below.

---

## 9. GEO / content architecture

Service pages already state, in visible copy:

- What the service is (`name`, `summary`/`purpose`)
- Who it is for (Chinese industrial / green-tech companies; European B2B buyers)
- Geography (Europe / European markets)
- Problem (`clientProblem`)
- What OPOPA does (`scope`)
- Outcome is implied (readiness, local specialists, representation, workflows) but **not quantified** — correctly, because no metrics exist

**Do not invent:** win rates, client names, office locations, “Optimizers of Operations and Partnerships” as on-page copy unless it is already published (the acronym expansion is in this audit brief, **not** currently in the live dictionary — left as a human TODO rather than added as SEO copy).

**Vague / incomplete public content (human input):**

- About “Proof” section is an honest empty state
- Legal operator full name, address, publication director, hosting legal entity
- Production contact inbox vs personal Gmail
- Company LinkedIn Page
- Dedicated OG share image
- Whether GA4 will be used (privacy policy must be updated first)

No hidden SEO text. No keyword stuffing in metadata.

---

## 10. Brand consistency — outdated names

| Name | Where | Action |
|---|---|---|
| **CIVEP** | `CIVEP_Website_Brief/` (entire historical brief) | Keep. Historical source folder, not rendered. |
| **CIVEP** | `.env.example` Resend comments (`civep.com`, `CIVEP <…>`) | Fix comments. |
| **SIECOQ / SIECOY / SIECOOP** | Not found in the repository | None |
| **OPOPA / OPOPA Partners** | Live UI, metadata, legal | Correct. Footer copyright used short name only — use legal name. |
| `/expertise` | Redirects + stale `llms.txt` | Redirects stay; llms.txt updated. |

---

## 11. Search Console — website side

Already present:

```
verification.google = rHUUJuvSKCCa1p4kSs-iUNEvARFWVFWBPalDjZgo-4M
```

in `src/app/layout.tsx`. No DNS records are in this repo (as expected).

### Manual actions (human)

- [ ] Verify the **Domain** property for `opopa-partners.com` (DNS) in Search Console, not only the URL-prefix www property
- [ ] Confirm www is the canonical host and apex redirects to `https://www.opopa-partners.com`
- [ ] Submit `https://www.opopa-partners.com/sitemap.xml`
- [ ] Inspect homepage, `/services`, each service URL, `/about`, one insight
- [ ] Confirm Google-selected canonical matches the self-referencing canonical
- [ ] Monitor **Page Indexing** (excluded preview URLs, 404s, redirects from `/expertise`)
- [ ] Monitor **Core Web Vitals** (mobile + desktop) after the next production deploy
- [ ] If hreflang issues appear, inspect `/` vs `/zh` pairing

Do not commit new verification tokens unless replacing the existing one.

---

## 12. Analytics setup instructions

**Current**

- Vercel Web Analytics: `@vercel/analytics` in the root layout (cookieless). After this work: production only.
- GA4: **not configured**. No Measurement ID is in the repo.

**To enable GA4 later**

1. Create a GA4 property. Copy the Measurement ID (`G-…`).
2. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX` on the **production** Vercel project only (not Preview).
3. Update Privacy Policy “Analytics and cookies” (`src/content/locales/en.ts` / `zh.ts`) and `docs/LEGAL-LAUNCH-TODOS.md` **before** going live with GA. Counsel should decide if a consent banner is required.
4. Redeploy production. If the env var is absent, the GA snippet must not load.
5. Events (no form field values): `contact_cta_click`, `service_cta_click`, `contact_form_submit`, `outbound_linkedin`, `email_click`.

---

## 13. Social / Open Graph image — designer spec

**Current default:** `https://www.opopa-partners.com/images/hero/hero-industrial-port.jpg` (absolute via `metadataBase`). Service, industry and insight pages already override with their own images.

**Recommended dedicated asset (not generated in this pass):**

- Path: `/brand/og-default.jpg` (or `.png`)
- Size: **1200 × 630 px** (1.91:1), sRGB, < 300 KB
- Safe zone: keep type/logo inside 1080 × 560 (avoid edge crop on some networks)
- Content: OPOPA Partners wordmark + short line matching the homepage proposition, e.g. “European market entry for Chinese industrial companies”
- Variants (optional): EN and ZH
- Do not put small body copy or fake metrics on the card

Wire-up after the file exists: set `siteConfig.ogImage` to that path.

---

## 14. Indexation safety

| Surface | Before | After (P0) |
|---|---|---|
| Production www | index, follow | unchanged |
| Vercel Preview | indexable HTML | `noindex, nofollow` header + robots + metadata |
| `not-found` | no robots | noindex |
| API | none | n/a |
| `/expertise` | 301 | unchanged |
| `/en/…` | 302/308 to unprefixed | unchanged (middleware redirect) |

---

## 15. Implementation plan (Phase 2)

1. Harden `site.ts` URL + `shouldNoIndexDeployment()`.
2. Preview noindex: `next.config.ts` headers, `robots.ts`, `createMetadata`, middleware.
3. Metadata titles, canonical slash, 404 robots, root fallback.
4. Sitemap cleanup.
5. JSON-LD helpers + page wiring (WebSite, Person, Organization, Service areaServed).
6. Internal linking + breadcrumb fix + About TODO removal.
7. Analytics module + optional GA4 + events.
8. `llms.txt`, `.env.example`, README, legal TODO note.
9. Build, lint, HTML inspection, `docs/SEO-GEO-VALIDATION.md`.

No new SEO npm packages. No visual redesign. No invented claims.
