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
