# Digital Marketing Service Page Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox syntax.

**Goal:** Ship `/services/digital-marketing` as a catalog-backed OPOPA service page.

**Architecture:** Catalog + EN/ZH copy + dedicated page component branched from `[slug]/page.tsx`.

**Tech Stack:** Next.js App Router, existing Section/Button/FinalCta/JsonLd patterns.

## Global Constraints

- Slug `digital-marketing`; group `access`; after `sales-ai-automation`
- Claim-safe copy; no ONSPRY; EN + ZH required
- Reuse design system; no new visual direction

---

### Task 1: Catalog + media

- [ ] Add slug, group order, homeServiceOrder secondary, serviceMeta, complementary links
- [ ] Add media entry (reuse existing photography)

### Task 2: EN + ZH copy

- [ ] Leaf + hub card + detail sections + mediaAlt

### Task 3: Page component + route branch

- [ ] Create `DigitalMarketingPage.tsx`
- [ ] Branch in `[slug]/page.tsx`

### Task 4: Verify

- [ ] Typecheck/lint/build
- [ ] Browser desktop + mobile smoke check
