# OPOPA — Services Architecture & UX Audit

**Status:** Audit only — no implementation  
**Date:** 2026-10-15  
**Scope:** Information architecture, service hierarchy, navigation, conversion, SEO constraints  
**Code inspected:** `src/content/catalog.ts`, `src/content/localized.ts`, `src/content/locales/en.ts` + `zh.ts`, `src/app/[locale]/services/**`, `src/components/services/**`, `src/components/layout/SiteHeader.tsx`, `ServicesMegaMenu.tsx`, `HomeServices.tsx`, `next.config.ts`, `src/app/sitemap.ts`, `src/lib/seo.ts`, `src/middleware.ts`  
**Benchmarks referenced (UX clarity, not visual copy):** Kearney, BCG, Roland Berger, Sia Partners  

---

## A. Current complete service tree with all routes

### Structural source of truth

| Layer | Source | Notes |
| --- | --- | --- |
| Slugs, groups, numbers, complementary links | `src/content/catalog.ts` | Structural only |
| EN/ZH copy | `src/content/locales/en.ts`, `zh.ts` | Parallel keys under `services`, `servicesPage`, `nav.megaMenu`, `home.services` |
| Runtime assembly | `src/content/localized.ts` (`getServices`, `getServiceGroups`, `getHomePillars`) | Merges catalog + dictionary + media |

### Hierarchy tree (as implemented)

```text
Services (hub)
├── [CATEGORY] Market access          id: access     ← NO dedicated page (hub section #group-access only)
│   ├── European Market Entry         /services/european-market-entry          (01)  [custom: MarketEntryPage]
│   ├── European Sales Representation /services/european-sales-representation  (05)  [generic template]
│   └── Sales AI and Automation       /services/sales-ai-automation            (06)  [generic template]
│
└── [CATEGORY] Local support          id: support    ← NO dedicated page (hub section #group-support only)
    ├── European Experts and Partners /services/european-experts-and-partners  (02)  [generic template]
    ├── Legal and Regulatory Support  /services/legal-and-regulatory-support   (03)  [generic template]
    └── European After-Sales & Maintenance /services/after-sales-maintenance   (04)  [custom: AfterSalesPage]
```

### Category names (exact)

| Internal id | EN (nav / hub / home) | ZH |
| --- | --- | --- |
| `access` | Market access | 市场准入 |
| `support` | Local support | 本地支持 |

### Individual services (exact display names)

| Slug | Number | Group | EN `name` | ZH `name` | EN `shortName` |
| --- | --- | --- | --- | --- | --- |
| `european-market-entry` | 01 | access | European Market Entry | 欧洲市场进入 | European Market Entry |
| `european-experts-and-partners` | 02 | support | European Experts and Partners | 欧洲专家与合作伙伴 | same |
| `legal-and-regulatory-support` | 03 | support | Legal and Regulatory Support | 法律与合规支持 | same |
| `after-sales-maintenance` | 04 | support | European After-Sales & Maintenance | 欧洲售后与维保 | After-Sales & Maintenance / 售后与维保 |
| `european-sales-representation` | 05 | access | European Sales Representation | 欧洲销售代表 | same |
| `sales-ai-automation` | 06 | access | Sales AI and Automation | 销售 AI 与自动化 | same |

### Indexable routes (EN unprefixed; ZH under `/zh`)

| Role | EN | ZH |
| --- | --- | --- |
| Hub | `/services` | `/zh/services` |
| Leaf | `/services/{slug}` × 6 | `/zh/services/{slug}` × 6 |

### Non-indexable “category destinations” (fragments only)

| Destination | EN | ZH | Reality |
| --- | --- | --- | --- |
| Market access section | `/services#group-access` | `/zh/services#group-access` | Same hub document; `id="group-access"` |
| Local support section | `/services#group-support` | `/zh/services#group-support` | Same hub document; `id="group-support"` |
| Per-service anchors on hub | `/services#european-market-entry` etc. | `/zh/services#…` | Duplicate `id` on `<li>` and `ServiceHubCard` |

**There are no routes** such as `/services/market-access`, `/services/access`, `/services/local-support`, or nested `/services/{category}/{slug}`.

### App Router pages

| File | Role |
| --- | --- |
| `src/app/[locale]/services/page.tsx` | Hub |
| `src/app/[locale]/services/[slug]/page.tsx` | Dynamic detail; branches to custom pages for 2 slugs |

### Reusable / service-related components

| Component | Path | Used by |
| --- | --- | --- |
| `ServiceHubCard` | `src/components/services/ServiceHubCard.tsx` | Hub only |
| `ServiceCard` | `src/components/services/ServiceCard.tsx` | Via `RelatedServiceCards` |
| `RelatedServiceCards` | `src/components/services/RelatedServiceCards.tsx` | Generic detail, Market Entry, After-Sales |
| `MarketEntryPage` | `src/components/services/MarketEntryPage.tsx` | `european-market-entry` only |
| `AfterSalesPage` | `src/components/services/AfterSalesPage.tsx` | `after-sales-maintenance` only |
| `ServicesMegaMenu` | `src/components/layout/ServicesMegaMenu.tsx` | Desktop header |
| `HomeServices` | `src/components/home/HomeServices.tsx` | Homepage pillars → hub hashes |
| `HomeServicesCarousel` | `src/components/home/HomeServicesCarousel.tsx` | **Unused** (not imported) |
| `FinalCta` | `src/components/layout/FinalCta.tsx` | Generic service pages only (not Market Entry / After-Sales) |

### Parent–child relationships (actual vs implied)

| Relationship | In content model | In URLs | In UI |
| --- | --- | --- | --- |
| Category → service | Yes (`serviceMeta.group`, `serviceGroups`) | No | Hub sections + mega menu columns |
| Hub → category page | Implied by pillar CTAs | No (hash only) | Scroll within hub |
| Category → category page | — | Missing | Mega menu group labels are **not links** |
| Service → related services | Yes (`complementary` / locale `followOn` / `related`) | Peer links | Related cards |

### Permanent redirects already in place (`next.config.ts`)

| From | To |
| --- | --- |
| `/expertise`, `/zh/expertise` | `/services`, `/zh/services` |
| `/expertise/market-entry-advisory` (+ zh) | `/services/european-market-entry` |
| `/expertise/european-partner-network` (+ zh) | `/services/european-experts-and-partners` |
| `/expertise/sales-enablement`, `/expertise/outsourced-sales` (+ zh) | `/services/european-sales-representation` |
| `/services/sales-enablement`, `/services/outsourced-sales` (+ zh) | `/services/european-sales-representation` |
| `/services/expert-partner-sourcing` (+ zh) | `/services/european-experts-and-partners` |

---

## B. Page-by-page inventory table

| Page | Route(s) | Template | Primary H1 (EN) | Stated purpose | Distinct from siblings? | Conversion | Role clarity |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Services hub | `/services` | `services/page.tsx` | “Our services” (`servicesPage.title`) | Orient on two pillars, then list 6 services | N/A | Hero + closing → `/contact` | **Clear as catalogue** |
| Market access (category) | `#group-access` only | Hub section | H2 “Market access” | Group three access services | Not a page | Cards → leaf URLs | **Weak as destination** (home/hub promise a “view” that is only a scroll) |
| Local support (category) | `#group-support` only | Hub section | H2 “Local support” | Group three support services | Not a page | Cards → leaf URLs | Same as above |
| European Market Entry | `/services/european-market-entry` | `MarketEntryPage` | “OPOPA connects Chinese companies to Europe” (`detail.headline`) | Firm/connector story + table of **all six** services | Overlaps hub + category + brand story | Closing CTA → contact | **Ambiguous:** leaf URL, category/meta content |
| European Sales Representation | `/services/european-sales-representation` | Generic | Service `name` | Representation as a service | Clear leaf | Mid + FinalCta → contact | Clear |
| Sales AI and Automation | `/services/sales-ai-automation` | Generic | Service `name` | Bounded AI/process consulting | Clear leaf | Mid + FinalCta → contact | Clear; weakest fit to “Market access” mental model |
| European Experts and Partners | `/services/european-experts-and-partners` | Generic | Service `name` | Specialist coordination | Clear leaf | Mid + FinalCta → contact | Clear |
| Legal and Regulatory Support | `/services/legal-and-regulatory-support` | Generic | Service `name` | Legal/compliance coordination | Clear leaf | Mid + FinalCta → contact | Clear |
| After-Sales & Maintenance | `/services/after-sales-maintenance` | `AfterSalesPage` | Custom detail H1 | Deep after-sales offer + FAQ | Strongly distinct (depth) | Multiple CTAs + FAQ schema | Clear as flagship leaf |

### Content depth tiers (uneven)

1. **Flagship custom:** After-Sales (longest, FAQ JSON-LD, multi-section).  
2. **Custom meta-page:** Market Entry (brand rhythm + full catalogue table; not a classic “situation / scope / receives” leaf).  
3. **Generic leaf × 4:** Shared section pattern (`situation` → `coordinates` + `scope` → `receives` + `starts` → related → `FinalCta`).

### EN/ZH parity

- Both locales define the same six `services.*` keys and `servicesPage` structure.  
- Custom `detail` blocks exist for Market Entry and After-Sales in both locales.  
- Naming inconsistency: After-Sales EN full name includes “European”; shortName omits it; ZH shortName drops “欧洲”.

---

## C. Current navigation and user journey

### How a Chinese industrial manufacturer discovers the two categories

1. **Homepage** (`HomeServices`): two large pillar cards → `/services#group-access` or `#group-support`.  
2. **Desktop mega menu** (`ServicesMegaMenu`): two columns labelled Market access / Local support; **only leaf services are clickable**.  
3. **Services hub**: ink “Two ways we work with you” pillar cards → same-page hashes; then two grouped card grids.  
4. **Footer**: flat list of **all six services** (no category grouping).  
5. **About / industry pages**: flat service lists (no category framing).

### Journey critique (first visit)

```text
Home
  → sees two pillars (good)
  → clicks “Market access”
  → lands mid-hub at #group-access (not a category landing)
  → must scan three image cards to choose a leaf
  → OR opens mega menu and jumps straight to a leaf (skips category framing)
  → OR opens “European Market Entry” and sees a page that again lists all six services
     (cognitive loop: hub → leaf → hub-like catalogue)
```

### Journey questions answered

| Question | Finding |
| --- | --- |
| Are the two categories discoverable? | Yes on home, hub, mega menu. |
| Is the distinction immediately clear? | Partially. Labels are clear; **destinations are not equal** (no category pages). Mega menu notes help, but labels are not navigational. |
| Can user pick a specific service without heavy reading? | **Yes in mega menu** (title + short megaDescription). Hub cards need more scanning (image + tag + description). |
| Are clickables obvious? | Hub service cards: yes (full-card links). Pillar cards: yes. Mega menu group headers: **look like structure, are not links** — can feel inert or broken. |
| Category → individual service? | Only inside hub (scroll + card). No category URL. |
| Between related services? | Yes via `RelatedServiceCards` / complementary lists; Market Entry follow-on omits Sales AI. |
| Path to contact? | Strong: hub hero, hub closing, every detail page CTA(s), site-wide FinalCta on generic pages, header CTA. |

### Confusing / dead-end patterns

1. **Pillar CTA copy implies a category view** (“View market access services”) but only scrolls.  
2. **Market Entry page re-lists Local support services** in “Our services for market entry” table — blurs the two-pillar model.  
3. **Numbering (01–06) does not follow category order** (access leaves are 01, 05, 06; support is 02–04), so “01 Market access” eyebrow on Market Entry conflicts with hub numbering as a sequence.  
4. **Click Services in nav** goes to hub; chevron/hover opens menu — two behaviours on one control (acceptable if learned; easy to miss menu).  
5. **Unused** `HomeServicesCarousel` suggests abandoned alternate journey.

---

## D. The 10 most important problems (by severity)

| # | Severity | Problem | Evidence |
| --- | --- | --- | --- |
| 1 | **Critical** | **Two categories exist in content model but not as first-class destinations.** Home and hub sell “Market access / Local support”; URLs and breadcrumbs only know Hub → Service. | `getHomePillars` → `#group-*`; no `[group]` route; breadcrumbs skip categories |
| 2 | **Critical** | **`european-market-entry` behaves like a firm/meta catalogue, not a peer leaf.** H1 is brand-level; table lists all six services including Local support; competes with `/services`. | `MarketEntryPage` + `detail.work.rows` |
| 3 | **High** | **Navigation hierarchy ≠ content hierarchy.** Mega menu shows categories as non-linked labels; footer flattens services; industry/about ignore categories. | `ServicesMegaMenu` `GroupLabel`; `SiteFooter` `getServices()` |
| 4 | **High** | **Uneven page depth and templates undermine a consulting-style practice map.** Two custom flagships vs four generic templates vs one meta-page create inconsistent “what am I reading?” | Branching in `[slug]/page.tsx` |
| 5 | **High** | **Market access vs Local support boundary leaks.** Market Entry coordinates mention local support; Market Entry work table includes support services; Sales AI tagged Market access may confuse buyers seeking “entry” vs “tools”. | `en.ts` market-entry `detail.work` + `coordinates` |
| 6 | **Medium–High** | **Hash-based category UX is fragile** (shareability, SEO, scroll-margin, mobile header offset, duplicate IDs on hub cards). | `#group-access`; `id` on both `<li>` and `ServiceHubCard` |
| 7 | **Medium** | **Service numbering communicates a single linear catalogue, not two practices.** | `serviceMeta.number` 01–06 across groups |
| 8 | **Medium** | **Related-service graphs are inconsistent** (catalog `complementary` vs Market Entry `followOn` vs After-Sales `related`; Sales AI often orphaned). | `catalog.ts` vs locale `detail.*.links` |
| 9 | **Medium** | **Generic pages share identical section grammar**, so sibling services feel interchangeable after the hero; harder to scan for “the one that fits me”. | Shared template in `[slug]/page.tsx` |
| 10 | **Medium** | **Conversion CTA pattern inconsistent** (generic → FinalCta; Market Entry / After-Sales → custom ink closing only). Not fatal, but weakens a single “always one next step” system. | Presence/absence of `FinalCta` |

---

## E. Content duplication and overlap analysis

*(Descriptive only — no wording recommendations.)*

| Overlap | Where it appears | Risk |
| --- | --- | --- |
| Two-pillar story | Home pillars, hub pillars, mega menu notes, `servicesPage.pillars`, brand/CTA copy | Healthy if destinations match; currently repeated without a category landing |
| “Connect → experts → execute → you sell” rhythm | Home hero, Market Entry `detail.lead`/`intro`, Market Entry coordinates, services hub pillar for access | Market Entry page absorbs homepage messaging |
| Full service catalogue | Hub card grids; Market Entry `work.rows` (all 6); Market Entry follow-on (4 of 6); footer (6) | User sees the same inventory three times in one path |
| Market entry vs sales representation | Both about European commercial reach; related cards cross-link | Need sharp role split (strategy/coverage vs people-on-ground) — currently adjacent but not architecturally separated |
| Experts/partners vs legal | Both “coordinate specialists”; legal is a specialised case | Boundary relies on page copy, not IA |
| After-sales vs “local support” pillar | After-sales is the concrete proof of Local support; Experts/Legal are more abstract | Pillar may read as “after-sales only” if imagery/CTA overweight warehouse/field |
| Hub card copy vs service `summary`/`megaDescription` | `servicesPage.cards.*` vs `services[slug].*` | Three parallel short descriptions per service (card / mega / summary) |

---

## F. SEO and technical constraints

### Canonicals & hreflang

- `createMetadata` (`src/lib/seo.ts`) sets canonical + `en` / `zh-Hans` / `x-default` alternates per path.  
- EN URLs unprefixed; ZH under `/zh` (`localePath` + middleware rewrite of `/en/*` → unprefixed).

### Metadata & H1

| Page type | Title source | H1 |
| --- | --- | --- |
| Hub | `servicesPage.meta` | `servicesPage.title` |
| Generic leaf | `services[slug].seoTitle` | `services[slug].name` |
| Market Entry | `seoTitle` | **`detail.headline`** (not `name`) |
| After-Sales | `seoTitle` | Custom detail headline |

**SEO risk:** Market Entry H1 ≠ service name / title theme (brand headline vs “European Market Entry”).

### Structured data

| Page | JSON-LD |
| --- | --- |
| Hub | `BreadcrumbList` |
| Generic leaf | `BreadcrumbList` + `Service` |
| Market Entry | `BreadcrumbList` + `Service` (name from headline) |
| After-Sales | `BreadcrumbList` + `Service` + `FAQPage` |
| Site-wide | `Organization` in locale layout |

No `ItemList` of services on the hub. No category-level schema (no category URLs).

### Sitemap (`src/app/sitemap.ts`)

- Includes `/services` and each `/services/{slug}` for EN + ZH.  
- Does **not** include hash destinations (correct).  
- Any future category URLs would need explicit sitemap + metadata + hreflang.

### Internal linking

- Strong leaf ↔ leaf via complementary.  
- Strong hub ↔ leaf.  
- Weak category as node (hash only; not crawlable as separate docs).  
- Industries/about link to leaves, not categories.

### Restructure risks (do not assume deletion/rename)

| Change | Risk | Mitigation if pursued later |
| --- | --- | --- |
| Rename any current slug | Breaks indexed URLs + existing redirects map | 301 + update `retiredServiceMap` |
| Nest under `/services/{category}/{slug}` | Changes all six leaf URLs | Preserve old URLs with permanent redirects; update sitemap |
| Promote `#group-*` to pages | Low risk if **additive** (`/services/market-access` new) | Keep hub; decide canonical between hub section vs category page |
| Demote Market Entry from leaf | High — currently a primary SEO landing (`seoTitle` targets “EU–China Market Entry Agency…”) | Keep URL; change page role carefully |
| Merge Sales AI elsewhere | Medium — has dedicated URL + redirects history none for this slug | Keep URL or 301 |

**Existing redirect debt** already maps legacy `/expertise/*` and retired service slugs — any IA change must extend, not discard, that table.

---

## G. Recommended target information architecture

> **Separated from current implementation.** This is a proposed end-state for discussion, not a build plan.

### Design principles (consulting-firm clarity)

1. **Two practices, then offerings** — user always knows which practice they are in.  
2. **Every named level has a URL** (or is explicitly non-navigational).  
3. **One page = one job** — hub orients; category frames; leaf sells a specific engagement.  
4. **No leaf re-hosts the full catalogue** unless it is the hub.  
5. **Nav, breadcrumbs, and URLs tell the same story.**

### Recommended tree (additive, URL-preserving for leaves)

```text
/services                              Hub: choose a practice + scan all offerings
├── /services/market-access            NEW category landing (access)
│   ├── /services/european-market-entry              KEEP URL — redefine as leaf (or rename role in content later)
│   ├── /services/european-sales-representation      KEEP
│   └── /services/sales-ai-automation                KEEP (or move under “enablement” if business agrees)
└── /services/local-support            NEW category landing (support)
    ├── /services/european-experts-and-partners      KEEP
    ├── /services/legal-and-regulatory-support       KEEP
    └── /services/after-sales-maintenance            KEEP
```

### Alternative (stronger nesting — higher SEO migration cost)

```text
/services
├── /services/market-access
│   ├── /services/market-access/european-market-entry     (301 from flat slug)
│   └── …
└── /services/local-support
    └── …
```

**Audit recommendation:** prefer **additive category landings + keep flat leaf slugs** unless there is a strong SEO reason to nest. Matches “do not assume we should delete/rename/merge existing URLs.”

### Page jobs in the target IA

| Page | Job |
| --- | --- |
| Hub | Answer: “What does OPOPA do?” in two practices; link to category landings and/or leaves |
| Category landing | Answer: “Is this practice for us?”; list 3 offerings with sharp differences; CTA |
| Leaf | Answer: “What exactly is this engagement?”; proof, scope, next step |
| Market Entry leaf | Must stop acting as second hub — either become a true leaf or become the Market access category page (business choice) |

### Navigation target

- Mega menu: category label **links to category landing**; leaves listed under it.  
- Breadcrumbs: Home → Services → {Category} → {Service}.  
- Footer: optionally two columns matching practices.  
- Home pillars: link to **category landings**, not hashes.

---

## H. Questions requiring business decisions before implementation

1. **Is “European Market Entry” a peer service or the Market access practice itself?** Today the URL is a peer; the page content is practice/meta. Pick one.  
2. **Should Market access and Local support have dedicated indexable pages?** (Audit recommendation: yes.) Exact slugs/labels?  
3. **Does Sales AI belong under Market access**, under a third “Enablement” practice, or as a module inside Sales Representation?  
4. **Should Legal sit under Local support or be positioned as a specialist track** of Experts & Partners?  
5. **What is the primary conversion action on category pages** — contact, or choose a leaf?  
6. **Must all six leaf URLs remain forever** even if IA nests later? (Assume yes unless marketing confirms otherwise.)  
7. **Should After-Sales remain the only FAQ/schema-heavy page**, or is that the template for all flagships?  
8. **Chinese naming:** keep “市场准入 / 本地支持” as the durable practice names for ZH SEO?  
9. **Is the intended buyer journey “practice first” or “problem first”** (e.g. “I need spare parts” → After-Sales without seeing Local support)?  
10. **Do we want equal visual weight for all six services**, or intentional flagships (Market Entry + After-Sales) with supporting leaves?

---

## I. Suggested implementation sequence

> Wait for approval. Sequence assumes additive category pages + leaf URL stability.

1. **Decide** answers to H1–H3 and H10 (Market Entry role, category pages, Sales AI).  
2. **IA freeze:** document final tree + breadcrumb rules + mega menu rules (no copy rewrite yet).  
3. **Additive routes:** introduce category landings; point home pillars + hub pillar CTAs + mega menu group labels at them; keep `#group-*` as optional aliases or remove later.  
4. **Repurpose Market Entry page** according to decision (true leaf vs redirect/role swap with category). Preserve `/services/european-market-entry` with 301 only if role moves.  
5. **Align related graphs** (`complementary` vs locale follow-on lists) so every leaf has a coherent “next services” set.  
6. **Unify conversion chrome** (FinalCta vs custom closing) without changing offer copy.  
7. **SEO pass:** metadata/H1 alignment, sitemap for new category URLs, breadcrumbs JSON-LD depth, validate redirects.  
8. **Only then** consider visual polish of category/leaf templates to match consulting benchmarks.

---

## Appendix: File reference map

```text
catalog.ts                 → slugs, groups, numbers, complementary
localized.ts               → getServices / getServiceGroups / getHomePillars
locales/en.ts|zh.ts        → services.*, servicesPage.*, nav.megaMenu.*, home.services.*
app/[locale]/services/page.tsx
app/[locale]/services/[slug]/page.tsx
components/services/*
components/layout/ServicesMegaMenu.tsx
components/layout/SiteHeader.tsx
components/home/HomeServices.tsx
next.config.ts             → legacy redirects
app/sitemap.ts
lib/seo.ts
middleware.ts              → locale routing (not service-specific)
```

---

**End of audit.** No application code was modified for this document beyond creating this file under `docs/`.
