# OPOPA SEO strategy design — 2026-10-18

## Goal

Grow non-brand organic visibility and brand presence for OPOPA Partners (`www.opopa-partners.com`) over 90 days, without paid SEO tools or paid link building.

## Constraints

- Copy on core pages is considered correct — no wholesale rewrite.
- Stack: **free only** (GSC + Autocomplete + optional Trends / Keyword Planner).
- Content: AI drafts → human validation → publish (Insights CMS + LinkedIn manual).
- GSC connected via Composio (read-first; no settings changes unless asked).

## Diagnosis

Technical SEO is already strong (metadata, hreflang, sitemap, JSON-LD, preview noindex). Traffic is almost entirely branded. Non-brand queries show impressions with zero clicks. Legacy service URLs still appear in GSC for some queries (redirects exist).

## System design

```
GSC + autocomplete → topic queue → Insights EN/ZH → site index
                              ↘ LinkedIn posts → referral + brand
Monthly GSC review → refine titles / next topics
```

## Components

1. **Keyword audit** — [`docs/seo/keyword-audit-2026-10-18.md`](../../seo/keyword-audit-2026-10-18.md)
2. **90-day calendar** — [`docs/seo/calendar-90d.md`](../../seo/calendar-90d.md)
3. **GSC playbook** — [`docs/seo/gsc-monthly-playbook.md`](../../seo/gsc-monthly-playbook.md)
4. **Tech quick wins** — Organization `sameAs` (company LinkedIn); dedicated OG image route
5. **Insights pipeline** — existing Google Sheets / Drive workflow

## Success metrics (90 days)

- Non-brand impressions ×3 vs baseline window
- ≥1 non-brand query in top 20 with clicks
- ≥8 Insights published EN (+ ZH pairs)
- LinkedIn: ≥2 posts/week

## Out of scope

Ahrefs/Semrush, paid backlinks, Baidu, GA4, global copy rewrite.
