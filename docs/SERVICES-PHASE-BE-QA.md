# Services restructuring — Phase B–E + editorial QA

**Branch:** `design/premium-homepage-poc`  
**Date:** 2026-10-15  
**Production publish:** No (held for visual approval)

---

## Editorial (approved pass)

| Item | Status |
| --- | --- |
| Market Entry A1–A5 (focused assignments) | Applied EN/ZH |
| Sales Rep B1 hero (in-house sales dept framing; no subsidiary legal-obligations claim) | Applied EN/ZH |
| Category C1 / C2 | Applied; single source `servicesPage.pillars` via `getHomePillars` |
| Orphan Market Entry keys / six-service catalogue | Removed from locales + page |
| Unused mega menu notes | Removed (`nav.megaMenu.groups.*.note`) |
| SEO titles / descriptions / six URLs | Preserved |

---

## Route QA

| Route | HTTP | Copy / SEO notes |
| --- | --- | --- |
| `/services` | 200 | C1/C2 pillars; catalogue only here |
| `/zh/services` | 200 | Matching ZH C1/C2 |
| `/services/european-market-entry` | 200 | New intro; title kept; no catalogue |
| `/zh/services/european-market-entry` | 200 | ZH intro applied; SEO title kept |
| `/services/european-sales-representation` | 200 | New B1 summary; SEO title kept |
| `/zh/services/european-sales-representation` | 200 | Matching ZH B1 |
| Other four service URLs (EN + ZH) | 200 | Intact |
| Legacy redirects (`/expertise/*`, retired slugs) | Untouched in config | Preserve |

---

## Anti-duplication

| Check | Result |
| --- | --- |
| Obsolete “You get the clients” / “他们分析机会…” | Gone from locales |
| Hero subsidiary “further legal obligations” claim | Gone from Sales Rep hero + aligned marketing lines |
| Home + hub category bodies dual keys | Home pillars: title/cta only; body from hub pillars |
| Market Entry six-service table | Not rendered; keys deleted |
| Extra CTAs / parallel old+new sections | Not present |

---

## Build

`npm run build` — succeeded (41 routes generated).

---

## File summary

### Modified
- `src/content/locales/en.ts`
- `src/content/locales/zh.ts`
- `src/content/localized.ts`
- `src/content/catalog.ts`
- `src/app/[locale]/services/page.tsx`
- `src/app/[locale]/services/[slug]/page.tsx`
- `src/components/services/MarketEntryPage.tsx`
- `src/components/services/AfterSalesPage.tsx`
- `src/components/services/ServiceHubCard.tsx`
- `src/components/layout/ServicesMegaMenu.tsx`
- `src/components/layout/SiteFooter.tsx`
- `src/components/layout/SiteHeader.tsx`

### Deleted
- `src/components/home/HomeServicesCarousel.tsx`
- `src/components/home/serviceMarks.tsx`

### Docs (untracked)
- `docs/SERVICES-ARCHITECTURE-AUDIT.md`
- `docs/SERVICES-RESTRUCTURING-PLAN.md`
- `docs/SERVICES-PHASE-A-APPROVAL.md`
- `docs/SERVICES-COPY-BEFORE-AFTER.md`
- `docs/SERVICES-PHASE-BE-QA.md`
