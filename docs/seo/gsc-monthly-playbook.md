# GSC monthly review playbook (Composio / free)

Property: `sc-domain:opopa-partners.com`  
Mode: **read-only** unless the user explicitly asks to change GSC settings.

## When

Once per month (align with calendar W4 / W8 / W12).

## Prompt to run in Cursor

> Using Composio Google Search Console for `sc-domain:opopa-partners.com`, pull the last 28 days and last 90 days: top queries, top pages, and page×query for non-brand rows. Do not change any GSC settings. Summarize: (1) CTR opportunities position 4–15, (2) impression growth without clicks, (3) legacy URLs still getting impressions, (4) next Insight topics.

## Steps

1. **Queries** — dimensions `query`, web, `final` data, row_limit 100  
2. **Pages** — dimensions `page`  
3. **Page × query** — dimensions `page`,`query` (spot wrong landing pages)  
4. **Sitemaps** — list only; note errors/warnings; do not resubmit unless asked  
5. **Compare** to previous month notes in this folder (add a dated note below)

## Decision rules

| Signal | Action |
| --- | --- |
| Pos. 4–15, CTR low, relevant query | Improve title/meta or opening H2; consider dedicated Insight |
| Impressions, pos. >30, buyer intent | New Insight or strengthen service page section |
| Brand-only growth | Continue LinkedIn; do not force non-brand keywords into homepage |
| Legacy URL impressions | Verify 308 redirect still live; update internal links/CMS if any still point to old slug |
| Spam / irrelevant queries | Ignore (e.g. retail RPA) |

## Cost

GSC via Composio: free for this workflow. No Ahrefs/Semrush.

## Review log

<!-- Append dated summaries under here -->

### 2026-10-18 — baseline

- Brand dominates clicks; non-brand impressions exist with 0 clicks.
- Priority query: EU–China market entry agencies (pos. ~5).
- Legacy `/services/european-market-entry` still appears for that query (redirect target = sales representation).

### 2026-10-22 — 28d / 90d refresh

- Brand still drives almost all clicks (`opopa` ~219 impr / 5 clicks in 28d). Non-brand CTR still ~0.
- Priority CTR gap: `which agencies specialize in eu–china market entry?` — pos ~4.1, 9 impr, 0 clicks (legacy service + Insight).
- Volume gap: `european sales representation for foreign companies` — 23 impr, pos ~52 → new Insight published + ESR meta tightened.
- Secondary: `best greentech outsourcing companies in europe` — 10 impr, pos ~49 → greentech industry SEO title aligned.
- ChatGPT / AI discovery reported qualitatively (CN + EU visitors); reinforce clear Q&A Insights for GEO as well as Google.

### 2026-11-01 — 14d GSC + GA check

- **GA is live** (Home UI lagged): ~16 sessions (22 Oct–1 Nov), 71 `page_view`, 3 `contact_cta_click`, 1 `ai_referral` (`chatgpt.com` / AI Assistant channel). Mostly Direct + some Organic.
- GSC (18–30 Oct): brand still drives clicks (`opopa`); non-brand impressions with 0 CTR.
- CTR gaps: `which agencies specialize in eu–china market entry?` (17 impr, pos ~1) → Insight SEO title tightened; `best greentech outsourcing companies in europe` (20 impr, pos ~8) → greentech industry meta + new Insight published; ESR query still strong on dedicated Insight (pos ~1) while service page ~pos 24.
- Ignore: RPA/sales-automation spam on `/services/sales-ai-automation` (high impr, deep positions).

### 2026-11-03 — Insight from data (theme A)

- Skill run: GSC/GA → themes A/B/C; user picked **A** (European after-sales for Chinese industrial manufacturers).
- Published EN+ZH Insight `european-after-sales-chinese-manufacturers` (`translation_group` european-after-sales-008), CTA Market Entry, cover Unsplash spare-parts workshop.
- Target intent: `manufacturing after sales service` / after-sales page impressions without a dedicated Insight.
- Themes B (why agencies) and C (manufacturing expansion services) left for a later run.

### 2026-11-06 — Insight from data (theme B) + home Asia wording

- Skill run: fresh GSC/GA; user picked **B** (manufacturing expansion services in Europe).
- Published EN+ZH Insight `manufacturing-expansion-services-europe` (`translation_group` manufacturing-expansion-009), CTA Market Entry.
- Target intent: `manufacturing expansion services` (impr on advanced-manufacturing, deep position, 0 clicks).
- Home wordings broadened China→Asia (landing only); themes A (why agencies) and C (manufacturer representation) still open.
- Skill updated: post-publish team HTML email (raphael@ + max@); Gmail Composio connect required before first send.

### 2026-11-09 — Insight from data (theme A: European industrial buyers)

- Skill run: GSC 14d/28d + GA; inventory avoided duplicates (ESR, greentech, after-sales, manufacturing expansion, agencies, etc.).
- User picked **A** — buyer-side expectations for Chinese suppliers.
- Published EN+ZH Insight `european-industrial-buyers-chinese-suppliers` (`translation_group` european-industrial-buyers-010), CTA Sales Outsourcing.
- Cover: real Pexels photo (engineer with tablet in industrial factory), shared with CMS SA.
- Live EN+ZH + cover verified; team email sent to raphael@ + max@.
- Themes B (relocation vs plant) and C (keep control / operating partner) left for a later run.

### 2026-11-15 — Insight from data (theme B: Machinery Regulation 2027)

- Skill run: GSC 14d/28d + GA4; top non-brand CTR gaps already covered (agencies, greentech, ESR); AI Assistant 4 sessions / 4 `ai_referral`.
- User picked **B** — EU Machinery Regulation 2027 readiness for Chinese manufacturers (GEO + industrial-equipment page fit; no duplicate Insight).
- Published EN+ZH Insight `eu-machinery-regulation-2027-chinese-manufacturers` (`translation_group` machinery-regulation-2027-011), CTA Market Entry.
- Cover: Unsplash industrial technicians photo, shared with CMS SA; industrial-equipment SEO description tightened for 2027 readiness.
- Themes A (advanced manufacturing relocation) and C (AI sales automation consulting) left for a later run.
- Team email sent to raphael@ + max@.

### 2026-11-25 — Autonomous Insight (theme A: AI sales process consulting)

- Windows: GSC and GA4 for 2026-10-27 to 2026-11-23 (28d) and 2026-11-10 to 2026-11-23 (14d), web, final data. GA 28d: 64 sessions, 273 page views, Direct 44, Organic Search 5, AI Assistant 4 (`chatgpt.com`, 4 `ai_referral`), LinkedIn 2. 14d: 23 sessions, 1 `ai_referral`. `contact_cta_click` 3 in 28d. No `generate_lead`.
- Ranked themes. **A (selected):** what AI-driven sales process automation consulting includes. 14d query: 9 impressions, position 1.0, 0 clicks, all on `/services/sales-ai-automation`. 28d: 19 impressions, position 8.6, 0 clicks. Not a duplicate of the RPA Insight or the “how AI can support B2B sales teams” Insight.
- **B:** why hire a China market-entry agency (28d: 3 impressions, position 6.0, 0 clicks, already on the agency Insight). **C:** China market entry consulting as a workplan (13 impressions, position ~71, on the existing partners Insight). Relocation and generics already published.
- Shipped EN+ZH `ai-driven-sales-process-automation-consulting` (`translation_group` ai-sales-consulting-014), CTA AI Sales Automation. Cover: Unsplash assembly-line laptop photo on Drive `1qkjPEa-Wp6fIwZUXL69NIro0Q9LKdHRX`. CMS service account already has reader via the Articles folder.
- Live EN+ZH verified (200, H1, body, cover). Team email sent to raphael@ + max@. Newsletter blast skipped: `NEWSLETTER_BROADCAST_SECRET` is not in this environment.
