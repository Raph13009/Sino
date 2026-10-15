# OPOPA — Services Restructuring & Content Consolidation Plan

**Status:** Superseded for decisions by `docs/SERVICES-PHASE-A-APPROVAL.md` (Phase A freeze).  
**Date:** 2026-10-15 (updated after positioning lock)  
**Inputs:**
1. `docs/SERVICES-ARCHITECTURE-AUDIT.md`
2. Approved implementation brief (D1–D4, hub-centric, anti-duplication)
3. Positioning Draft v1 — Positioning description (operating partner + two offers)
4. `OPOPA_Website_Brief/` — historical only where it conflicts with (2)/(3)

**Phase A pack:** See `docs/SERVICES-PHASE-A-APPROVAL.md` for the frozen migration matrix, Entry vs Sales Rep overlap, proposed EN/ZH copy, and SEO mapping awaiting approval before Phases B–E.

---

## 0. Sources review & conflicts

### 0.1 What is settled (from this brief + live site)

| Topic | Decision in force |
| --- | --- |
| Visual design direction | Approved (Kearney/BCG-inspired premium language) |
| Two primary categories | **Market Access** and **Local Support** |
| Preserve leaf URLs where possible | Yes |
| No competing old+new sections | Hard rule for implementation |
| No fabricated proof / legal guarantees | Hard rule |
| Preserve SEO metadata, hreflang, redirects | Yes |

### 0.2 Conflicts / unresolved positioning

| Topic | Live site / recent copy | Original brief (`OPOPA_Website_Brief`) | This restructuring brief | Status |
| --- | --- | --- | --- | --- |
| Nav taxonomy | Market access / Local support | Plan entry / Build local / Grow sales | Market Access / Local Support | **Live = restructuring brief.** Brief docs are stale. |
| Market Entry role | Meta page + full 6-service table | Lead offer (diagnose / route / plan) | Evaluate overlap with Sales Representation; stop catalogue-on-leaf | **Needs approval** (see §6) |
| Category URLs | Hash sections only | Hub + 6 leaves; no category pages | “Category experiences” but **not** pages for their own sake | **Resolved in this plan as hub-centric** (§1) |
| Sales AI | Standalone leaf under Market access | Standalone page; coaching is under Sales Rep | Evaluate standalone vs capability | **Needs approval** |
| Experts vs Legal | Two peer leaves under Local support | Legal = focused counsel track; Experts = broader coordination | Evaluate distinct roles | **Needs approval** |
| Hub narrative | Two pillars + equal card grids | Hub features Market Entry, then groups others | Two clear categories + services under each | Align hub to **two equal practices**, flagships optional inside each |
| Specific partner wording edits | — | — | **Not received** | **PENDING PARTNER PASTE** |

### 0.3 Claims not to treat as verified

Do not implement or amplify without evidence / legal review:

- Retention / “95% see results” style stats (already on home credibility — keep only if partners re-approve)
- Time-to-first-sale / €250k office comparisons (use-case section)
- Any implied employment of specialists or OPOPA-as-law-firm
- Guaranteed SLAs, coverage, or certification outcomes

---

## 1. Final proposed information architecture

### 1.1 Design principle (pages must earn their existence)

> **Do not add category URLs unless the hub cannot deliver a distinct “choose a practice” experience.**

Recommended end-state: **hub-centric two-category IA** + **leaf pages only where the engagement is distinct**.

```text
/services                              ← Overview + BOTH category experiences (one page, two clear destinations)
│
├── [Category experience A] Market Access     (section #market-access — same document)
│   ├── /services/european-market-entry                 KEEP URL → true LEAF (strategy / framing)
│   ├── /services/european-sales-representation         KEEP URL → true LEAF (people / representation)
│   └── /services/sales-ai-automation                   KEEP URL for now → LEAF or demoted capability (*)
│
└── [Category experience B] Local Support     (section #local-support — same document)
    ├── /services/european-experts-and-partners         KEEP URL → LEAF (specialist coordination)
    ├── /services/legal-and-regulatory-support          KEEP URL → LEAF (**) or fold into Experts
    └── /services/after-sales-maintenance               KEEP URL → LEAF (flagship depth OK)
```

(\*) Sales AI: see §6 decision D3.  
(\*\*) Legal: see §6 decision D4.

### 1.2 Why not dedicated `/services/market-access` pages (default)

| Criterion | Hub section as category experience | Separate category page |
| --- | --- | --- |
| Distinct user need | “Which practice fits?” answered on hub | Only if SEO/partners need dedicated landings for those keywords |
| Extra click | No | Yes (hub → category → leaf) |
| Catalogue duplication risk | Controllable if hub is the **only** full catalogue | High if category + hub both list everything |
| Matches “no pages for their own sake” | Yes | Only with proven need |

**Optional later upgrade (not default):** add `/services/market-access` and `/services/local-support` **only if** Search Console / partners require keyword landings. Then hub becomes a thin chooser linking to those two — never three full catalogues.

### 1.3 Role of each URL

| URL | Job (one sentence) | Must NOT do |
| --- | --- | --- |
| `/` home services band | Introduce the two practices; deep-link into hub sections | List all six services in detail |
| `/services` | Orient + present both categories + discoverable leaves | Repeat the homepage brand rhythm as a second hero story |
| `/services/european-market-entry` | Sell **entry framing**: diagnose product/market, route, plan | Re-list all six services; act as second hub |
| `/services/european-sales-representation` | Sell **representation**: people who sell under client identity | Absorb Market Entry strategy narrative |
| `/services/sales-ai-automation` | Sell **bounded commercial tooling** (if kept) | Present as equal “entry” offer |
| `/services/european-experts-and-partners` | Sell **specialist coordination** for a defined need | Imply OPOPA employs all specialists |
| `/services/legal-and-regulatory-support` | Sell **scoped legal/compliance coordination** (if kept) | Duplicate Experts page with a narrower list |
| `/services/after-sales-maintenance` | Sell **spare parts / maintenance partnership setup** | Promise SLAs without agreements |

### 1.4 Evaluations requested

#### Market Entry vs Sales Representation

| | European Market Entry | European Sales Representation |
| --- | --- | --- |
| Question answered | Where / how do we enter? | Who sells for us on the ground? |
| Output | Priority markets, route, commercial mandate framing | Mandated reps, account development, reporting |
| Overlap today | Both talk “Europe + clients + experts” | Same |
| Fix | Market Entry = **framing & coverage design**; Sales Rep = **human commercial capacity** | Cross-link as sequence, not twins |

**Recommendation:** Keep both URLs. Rewrite Market Entry page role (REMOVE catalogue table). No merge.

#### Sales AI & Automation

| Option | Pros | Cons |
| --- | --- | --- |
| **A. Keep standalone leaf** (URL stays) | SEO URL exists; clear for buyers seeking AI | Clutters Market Access as equal peer |
| **B. Capability of Sales Representation** | Cleaner commercial story; matches original brief (coaching as module) | Need redirect or thin page that points into Sales Rep |
| **C. Module block on Sales Rep + thin keep URL** | Preserves SEO; demotes in nav | Two places to maintain unless single source |

**Recommendation (pending approval):** **C** — keep `/services/sales-ai-automation` for SEO, treat as supporting capability in mega menu (secondary under Market Access or nested under Sales Rep), do not give equal visual weight to Market Entry / Sales Rep on the hub.

#### Experts & Partners vs Legal & Regulatory

| | Experts & Partners | Legal & Regulatory |
| --- | --- | --- |
| Scope | Any independent specialist for a defined need | Counsel / compliance / setup / trade law track |
| Distinct enough? | Yes **if** Legal page stays “when the need is legal/regulatory” | Risk of being a subset list of Experts |

**Recommendation (pending approval):** Keep both URLs if Legal page opens with a **trigger** (“incorporation, contracts, product compliance…”) and Experts stays **need-agnostic coordination**. If partners want fewer leaves: fold Legal into Experts as an on-page module + 301 Legal → Experts (higher SEO cost).

#### Avoiding catalogue-on-leaf

**Rule:** Only `/services` may present the full six-service inventory.  
Leaves may link to **at most 2–3 complementary** peers (not a table of all services).  
Market Entry `detail.work.rows` (all 6) → **REMOVE**.  
Market Entry `detail.followOn` → **REPLACE** with 2–3 related only (Sales Rep + one Local Support peer).

### 1.5 Navigation & breadcrumbs (target)

| Surface | Behaviour |
| --- | --- |
| Mega menu | Two columns: Market Access / Local Support. Group labels link to `/services#market-access` / `#local-support`. Leaves under each. |
| Mobile nav | Same grouping; labels expand or jump to hub sections. |
| Breadcrumbs (leaves) | Home → Services → {Service name}. *(No fake category crumb without a category URL.)* |
| Footer | Prefer **two grouped columns** matching categories (not a flat six). |
| Home pillars | Link to hub sections (hashes), not to Market Entry. |
| CTAs | Single primary: Discuss / Contact. No second competing “explore everything” band on the same leaf. |

### 1.6 ZH labels

Keep: **市场准入** / **本地支持** (aligned with live site). Native review still required for service names (flagged in original brief).

---

## 2. Full content duplication inventory

Legend: **Harmful** = competing or stacked same purpose · **Intentional** = shared CTA label / brand name OK · **Orphan** = unused keys/components.

### A. Exact repeated paragraphs (EN)

| Copy | Locations | Verdict |
| --- | --- | --- |
| Market access pillar body (“local sales experts… You get the clients.”) | `home.services.pillars.access.description` = `servicesPage.pillars[access].description` = `services.european-market-entry.detail.intro` | **Harmful** — three surfaces |
| Local support pillar body | `home.services.pillars.support.description` = `servicesPage.pillars[support].description` | **Intentional reuse OK** if single source key; today duplicated literals |
| Rhythm line | `home.hero.rhythm` = `services.european-market-entry.detail.lead` | **Harmful** on Market Entry |
| Hero title ≈ Market Entry headline | `home.hero.title` ≈ `detail.headline` | **Harmful** — leaf steals homepage H1 job |

### B. Near-duplicate paragraphs (same idea)

| Idea | Where | Verdict |
| --- | --- | --- |
| Connect Chinese industrial… to Europe | `home.meta`, `about.lead`, `footer.description`, Market Entry `summary`, brand/siteConfig | **Intentional brand line** — keep one canonical short + one meta; trim page-level repeats |
| Group notes access/support | `nav.megaMenu.groups.*.note` vs `servicesPage.groups.*.note` | **Harmful maintenance** — two variants |
| Per-service blurb ×3–4 | `servicesPage.cards[slug].description`, `services[slug].megaDescription`, `positioning`, `summary` | **Harmful drift risk** |
| “Manufacture + markets” CTA body | `cta.description`, `servicesPage.closing.body`, `contact.description`, Market Entry `starts` / `detail.closing`, etc. | **Harmful stacking** |
| Europe needs local presence | `home.context`, `about.why`, parts of `home.why` | **Near-duplicate purpose** on home/about |
| Provided as a service / no subsidiary | Sales Rep page + home credibility/why + about | **Intentional theme** — one sharp statement per page max |

### C. Old copy still rendered alongside newer copy

| Item | Evidence | Verdict |
| --- | --- | --- |
| Market Entry custom `detail.*` **and** unused generic `situation/coordinates/scope/receives/starts` still in locale | Custom page ignores generic fields | **Orphan locale** (not rendered, but confuses editors) |
| After-Sales: generic summary narrative + long `detail.*` | Custom page uses detail; summary still feeds related/seo | Partial — SEO keys needed; body orphans **Harmful for editors** |
| Three-group nav (Plan/Build/Grow) | Only in `OPOPA_Website_Brief/` | **Docs stale** — not rendered |
| Empty `home.industriesFit.description/closing` | Keys exist, UI skips | Cleanup |

### D. Sections with duplicated commercial purpose

| Page | Stacked purposes | Action direction |
| --- | --- | --- |
| Home | Hero offer → Services pillars → Credibility “why choose” → Why OPOPA → Method (all “why/how we work”) | Collapse/merge roles in a later home pass; **out of services implement scope** except Services band |
| Services hub | Pillars intro → group sections → cards → closing CTA | Keep, but pillars must not repeat home rhythm; one catalogue only |
| Market Entry | Hero (brand) + work table (catalogue) + followOn (catalogue) + closing CTA | **Primary consolidation target** |
| Generic leaves | Mid-page CTA + FinalCta | One contact band |
| After-Sales | Deep sections + related catalogue + closing | Keep depth; tighten related to 2–3 |

### E. Cross-page unnecessary repeats

| Message | Pages today | Target |
| --- | --- | --- |
| Full six-service catalogue | Hub, Market Entry table, footer flat list, about service buttons | **Hub (+ footer grouped)** only |
| Two-pillar explanations | Home, hub, Market Entry intro | Home (short) + hub (canonical) |
| Mega descriptions | Mega menu + related cards everywhere | Single `megaDescription` source (OK) — don’t also paste into hub cards verbatim without shared key |

### F. Legacy / alternate paths

| Path | Reachable? | Note |
| --- | --- | --- |
| `/expertise/*` redirects | Yes (301) | Keep |
| Retired service slugs | Yes (301) | Keep |
| `#group-access` / `#group-support` | Yes | Rename anchors to `#market-access` / `#local-support` carefully (redirect or dual ids) |
| `HomeServicesCarousel` | No (unused) | Remove when implementing |
| Generic Market Entry / After-Sales template fields | No (branched away) | Delete or mark deprecated in locale |

### G. Unused / obsolete

| Item | Path | Action when implementing |
| --- | --- | --- |
| `HomeServicesCarousel.tsx` | `src/components/home/` | REMOVE |
| `serviceMarks.tsx` (if only used by carousel) | `src/components/home/` | REMOVE if unused |
| `servicesPage.cards.*.subline` | locales | REMOVE or wire once — currently unused |
| `servicesPage.primaryCta`, `closing.secondaryCta` | locales | REMOVE or use once |
| `common.secondaryExploreExpertise`, `viewAllExpertise` | locales | REMOVE if unused |
| `dict.brand` | locales | Unused vs `siteConfig` — consolidate later |
| Generic bodies for Market Entry & After-Sales | locales | REMOVE after confirming custom pages cover SEO needs |

---

## 3. Page-by-page content migration matrix

> Every significant services-related section gets a disposition.  
> **Copy approval** = partners must approve new/changed wording. KEEP with no text change → approval not required.

### 3.1 Homepage — services-adjacent

| Route | Component / key | Current heading / role | Intended role | Action | Reason | Copy approval? | EN/ZH | SEO |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | `HomeHero` / `home.hero.rhythm` | Brand rhythm | Homepage only | **KEEP** | Canonical rhythm location | No | Both | Low |
| `/` | `HomeServices` / `home.services.*` | Our services + 2 pillars | Introduce two practices | **KEEP** structure; **REPLACE** links to `#market-access`/`#local-support`; **MOVE** long pillar bodies to shared keys or shorten | Stop deep duplication with hub/Market Entry | Only if shortening | Both | Low |
| `/` | Pillar → Market Entry intro twin | — | — | **REMOVE** duplication of `detail.intro` on Market Entry (fix leaf, not home) | See Market Entry | Yes if leaf rewrite | Both | Med |
| `/` | `HomeCredibility` / whyPoints | Why choose vs hire | Proof band | **KEEP** pending stats approval | Separate from services IA | Re-approve stats | Both | Low |
| `/` | `HomeWhy` / `HomeMethod` | Why + method | Brand | **KEEP** for now (home pass later) | Outside services consolidation core | No | Both | Low |
| `/` | `FinalCta` / `cta.*` | Global CTA | Global CTA | **KEEP** one instance | Intentional | No | Both | Low |
| — | `HomeServicesCarousel` | — | — | **REMOVE** component | Unused; prevents zombie UI | No | — | None |

### 3.2 Services hub `/services`

| Route | Component / key | Current heading | Intended role | Action | Reason | Copy approval? | EN/ZH | SEO |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/services` | Hero `servicesPage.title/description` | Our services | Overview | **KEEP**; tighten description if it repeats home | Hub is canonical overview | Optional | Both | Keep `servicesPage.meta` |
| `/services` | Pillars ink section `pillarsIntro` + pillars | Two ways… | Category chooser | **KEEP** as **primary category experience**; CTAs scroll to sections | Distinct need met without new URLs | No if text unchanged | Both | Fragment only |
| `/services` | `#group-access` / `#group-support` | Market access / Local support | Category modules | **REPLACE** ids → `#market-access` / `#local-support` (keep old ids as aliases temporarily) | Clearer anchors; home links | No | Both | Alias hashes |
| `/services` | `servicesPage.groups.*.note` | Group notes | Category one-liner | **KEEP** one note; **REPLACE** mega notes to **same source** in code | Kill dual notes | Optional unify | Both | Low |
| `/services` | `ServiceHubCard` ×6 | Cards | Discover leaves | **KEEP**; ensure card copy ≠ mega paste unless shared key | Discoverability | Optional consolidate keys | Both | Internal links |
| `/services` | `servicesPage.cards.*.subline` | Unused | — | **REMOVE** keys | Dead content | No | Both | None |
| `/services` | Closing `servicesPage.closing` | Discuss | Conversion | **KEEP** one hub CTA | Distinct from leaf FinalCta | No | Both | Low |
| `/services` | `servicesPage.primaryCta` | Unused | — | **REMOVE** or wire | Dead | No | Both | None |

### 3.3 Market Entry `/services/european-market-entry`

| Route | Component / key | Current heading | Intended role | Action | Reason | Copy approval? | EN/ZH | SEO |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| leaf | `detail.headline` | OPOPA connects… | Must become service H1 | **REPLACE** with service-named H1 (approved wording) | Stop stealing home H1 | **Yes** | Both | H1/title alignment |
| leaf | `detail.lead` (= home rhythm) | Rhythm | — | **REMOVE** from this page | Homepage owns rhythm | **Yes** | Both | Low |
| leaf | `detail.intro` (= pillar) | Access pillar | Leaf intro | **REPLACE** with Market Entry–specific framing (diagnose/route/plan) | Distinct from Sales Rep + hub | **Yes** | Both | Med |
| leaf | `detail.work` table (6 rows) | Our services for market entry | Catalogue | **REMOVE** entire block | Violates no-catalogue-on-leaf | **Yes** (removal) | Both | Removes thin content risk |
| leaf | `detail.followOn` (4 links) | Our services | Related | **REPLACE** with ≤3 complementary (Sales Rep + Local Support peer); exclude full catalogue | Cross-sell only | Optional | Both | Internal links |
| leaf | `detail.closing` | Discuss | CTA | **KEEP** one closing; omit FinalCta or standardize | One CTA band | No | Both | Low |
| leaf | Map band | Visual | Optional | **KEEP** if unique to entry story | Differentiator | No | Both | Image SEO |
| locale | Generic `situation`…`starts` | Unused | — | **REMOVE** unused keys after migration | Editor safety | No | Both | None if unused |
| meta | `seoTitle` / `seoDescription` | Agency queries | SEO | **KEEP** until new H1 approved; then align | Preserve rankings | If H1 changes | Both | **High** |

### 3.4 Sales Representation `/services/european-sales-representation`

| Route | Component / key | Current | Intended | Action | Reason | Approval? | EN/ZH | SEO |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| leaf | Generic template sections | Situation / coordinates / receives | True leaf | **KEEP** structure | Distinct engagement | No | Both | Keep meta |
| leaf | Copy overlap with Market Entry | Shared “Europe clients” tone | Sharpen representation-only | **REPLACE** only lines that steal Market Entry job | Clarity | **Yes** if editing | Both | Med |
| leaf | FinalCta + mid CTA | Double contact | One CTA | **REPLACE** pattern: keep mid **or** FinalCta | Conversion hygiene | No | Both | Low |
| leaf | Link to Sales AI | Weak today | Capability path | **MOVE**/add related link if D3=C | IA | No | Both | Low |

### 3.5 Sales AI `/services/sales-ai-automation`

| Route | Component / key | Action | Reason | Approval? | EN/ZH | SEO |
| --- | --- | --- | --- | --- | --- | --- |
| leaf | Page | **KEEP** URL | Preserve SEO | D3 | Both | Keep until D3 |
| nav weight | Mega / hub card | **REPLACE** visual weight (secondary) if D3=C | Not equal to entry/rep | D3 | Both | Low |
| if D3=B | Page | **MOVE** content into Sales Rep module + **redirect** | Consolidation | **Yes** | Both | 301 required |

### 3.6 Experts `/services/european-experts-and-partners`

| Action | Reason | Approval? | SEO |
| --- | --- | --- | --- |
| **KEEP** leaf + meta | Core Local Support offer | No | Keep |
| Sharpen vs Legal in intro only if D4 requires | Distinct roles | If editing | Med |
| Related: Legal + After-Sales + Market Entry | Cross-practice link OK | No | Low |

### 3.7 Legal `/services/legal-and-regulatory-support`

| Action | Reason | Approval? | SEO |
| --- | --- | --- | --- |
| **KEEP** if D4=keep | Focused counsel track | D4 | Keep |
| **MOVE** into Experts + 301 if D4=fold | Fewer leaves | **Yes** | 301 |

### 3.8 After-Sales `/services/after-sales-maintenance`

| Component / key | Action | Reason | Approval? | SEO |
| --- | --- | --- | --- | --- |
| `AfterSalesPage` / `detail.*` | **KEEP** depth | Justified flagship | No | Keep FAQ schema |
| `detail.related` long list | **REPLACE** → ≤3 peers | No mini-hub | Optional | Low |
| Orphan generic fields | **REMOVE** | Editor safety | No | None |
| Closing | **KEEP** one CTA band | Conversion | No | Low |

### 3.9 Header / mega / footer / about / industries / contact

| Surface | Keys / component | Action | Reason | Approval? | SEO |
| --- | --- | --- | --- | --- | --- |
| Mega menu | `nav.megaMenu.groups` | **KEEP** two groups; labels → hub hashes; notes **single-sourced** with hub | Hierarchy match | No | Low |
| Footer | Flat `getServices()` | **REPLACE** with grouped columns | Match IA | No | Internal links |
| About service buttons | Flat list | **KEEP** or group lightly | Don’t rebuild about now | Optional | Low |
| Industries service links | Flat | **KEEP** | Problem-first path OK | No | Low |
| Contact | `contact.description` | **KEEP**; don’t fork new CTA essay | One contact story | No | Keep meta |

### 3.10 Cross-cutting locale / catalog

| Source | Action | Reason |
| --- | --- | --- |
| `catalog.ts` groups | **KEEP** access/support | Matches live IA |
| `catalog.ts` numbers 01–06 | **REPLACE** optional: number within category (A1–A3, S1–S3) or drop numbers on hub | Reduce false sequence | Approval for visual |
| `complementary` graphs | **REPLACE** to match ≤3 rule + D3/D4 | Consistency |
| `localized.ts` | **KEEP**; optionally resolve shared pillar strings from one dict path | DRY |
| ZH mirrors | Every EN disposition applied | Native review before “final” | |

---

## 4. Proposed page structures (visual / UX)

Maintain approved premium language: photography plane, air, editorial type, restrained cards for **interaction** (choosing a service), strong hierarchy. No new purple/SaaS patterns.

### 4.1 Services hub

1. **Header band:** H1 + one sentence (what OPOPA’s services are for). Primary CTA → contact.  
2. **Two category modules (equal visual weight):** Market Access | Local Support — short distinction, not a second homepage.  
3. **Under each module:** 2–3 service cards (editorial or interactive) — name, one line difference, link. Sales AI card visually quieter if D3=C.  
4. **Closing CTA** once.  
5. **No** third full catalogue. **No** brand rhythm block.

### 4.2 Category “experience” (on hub, not separate URL)

Per category module:

- Concise offer explanation (1 short paragraph).  
- Client need → OPOPA response (2–4 bullets max).  
- Differentiated service cards.  
- Optional text link: Discuss without choosing a leaf.

### 4.3 Individual service pages (standard leaf)

1. Breadcrumb: Home / Services / {Name}  
2. H1 = service name (not brand slogan)  
3. One-line positioning  
4. What it does / what OPOPA coordinates / what client gets  
5. Typical scope (list)  
6. Related: ≤3 peers  
7. **One** contact CTA  

**After-Sales** may keep extra depth (warehousing, FAQ) as the justified exception.  
**Market Entry** follows standard leaf after stripping catalogue/brand blocks; map visual may remain.

### 4.4 What we explicitly will not build in v1

- Nested `/services/{category}/{slug}`  
- Separate category URLs (unless partners override §1.2)  
- A seventh service page  
- Parallel “old” sections hidden with CSS  

---

## 5. EN/ZH and SEO preservation strategy

### 5.1 EN/ZH

| Rule | Practice |
| --- | --- |
| Same IA both locales | Always |
| Approved EN change | ZH updated in same PR (proper translation, not abandoned keys) |
| Unapproved wording | Do not invent ZH marketing claims |
| Native review | Still required for service names (original brief) before calling ZH final |

### 5.2 SEO — preserve

| Asset | Strategy |
| --- | --- |
| All 6 leaf URLs | Keep unless D3/D4 explicitly redirect |
| Hub `/services` | Keep as canonical overview |
| `seoTitle` / `seoDescription` | Preserve until H1/role change forces alignment |
| Canonical + hreflang | Unchanged pattern via `createMetadata` |
| Redirects in `next.config.ts` | Keep; extend if any slug retires |
| After-Sales FAQ JSON-LD | Keep with page |
| Sitemap | Leaves + hub; add category URLs only if created |

### 5.3 SEO — change carefully

| Change | Risk control |
| --- | --- |
| Market Entry H1 no longer brand slogan | Update `seoTitle` only with approved phrase; monitor GSC |
| Remove Market Entry catalogue table | Positive (less thin/duplicate); ensure leaf has unique body |
| Hash rename `#group-*` → `#market-access` | Dual ids for a release; update home links |

### 5.4 Automated checks (when implementing)

| Check | Purpose |
| --- | --- |
| Exact-copy lint | Fail CI if home rhythm appears in any `services.*.detail` |
| Forbidden catalogue | Fail if any leaf locale contains >3 sibling service names in one list/table |
| Route tests | Hub + 6 leaves + legacy redirects 308/301 |
| Render assertions | Market Entry must not render `detail.work`; carousel not imported |
| EN/ZH key parity | Same key tree for services |

---

## 6. Business decisions needing approval

| ID | Decision | Options | Plan default if silent |
| --- | --- | --- | --- |
| **D1** | Market Entry page role | (a) True leaf: framing/plan only (b) Become hub section only + thin SEO page | **(a)** |
| **D2** | Category URLs | (a) Hub sections only (b) Add `/services/market-access` + `/local-support` | **(a)** |
| **D3** | Sales AI | (a) Equal leaf (b) Fold into Sales Rep + 301 (c) Keep URL, demote in nav | **(c)** |
| **D4** | Legal page | (a) Keep distinct (b) Fold into Experts + 301 | **(a)** |
| **D5** | Hub card equality | (a) Equal six (b) Flagship Entry + After-Sales larger | **(b)** visual weight only |
| **D6** | Stats on credibility | Keep / remove / reword | **Keep until partners reconfirm** |
| **D7** | Anchor ids | Rename to `#market-access` / `#local-support` | **Yes** with aliases |
| **D8** | Partner paste wording | Apply specific sentence edits | **Blocked until paste received** |
| **D9** | ZH finalisation | Native review gate before launch claim | **Required** |
| **D10** | Single CTA component on leaves | FinalCta everywhere vs custom ink | **One pattern; prefer FinalCta + drop duplicate mid CTA** |

---

## 7. Implementation steps & validation gates

> **Do not start until this document is validated** (architecture + migration matrix + D1–D4).

### Phase 0 — Approval gate

- [ ] Partners validate §1 IA (hub-centric)  
- [ ] Partners answer D1–D4  
- [ ] Partner feedback paste attached and merged into §0 / matrix  
- [ ] Confirm no leaf URL retirements beyond D3/D4  

### Phase 1 — Consolidation before new UI

**Gate:** No page shows two competing versions of the same message.

1. Remove/unused: carousel, dead keys, Market Entry `detail.work`.  
2. Stop rendering Market Entry brand H1/rhythm/pillar twin (REPLACE with approved leaf copy — **blocked on copy approval**).  
3. Deduplicate pillar strings to a single source consumed by home + hub (or shorten home).  
4. Single-source mega note vs hub group note.  
5. Cap related services at ≤3 everywhere.  

**Validate:** grep/CI exact-copy rules; manual EN/ZH pass on Market Entry + hub.

### Phase 2 — Hub category experience

1. Restructure hub layout into two equal category modules.  
2. Update anchors + home pillar hrefs.  
3. Group footer services.  
4. Mega menu labels → hub sections.  

**Validate:** keyboard + mobile nav; visual regression; no duplicate catalogues.

### Phase 3 — Leaf alignment

1. Apply D3/D4.  
2. Unify CTA pattern.  
3. Align complementary graph in `catalog.ts`.  
4. Delete orphan generic locale fields for custom pages.  

**Validate:** route tests; redirects; sitemap; Lighthouse a11y smoke.

### Phase 4 — SEO & cleanup

1. Align Market Entry metadata with new H1 if changed.  
2. Confirm redirects table.  
3. Update `OPOPA_Website_Brief/04-services.md` + `DECISIONS.md` so docs match live IA (avoid future old+new).  

**Validate:** GSC URL inspection sampling; hreflang; no soft-404s.

### Phase 5 — Stop

No further services copy expansion without a new approved matrix row.

---

## 8. Strict implementation rules (binding)

1. **Refactor or replace** — never mount a new section beside an old one.  
2. **No CSS-hidden legacy blocks.**  
3. **One commercial message version** per idea per page.  
4. Remove obsolete imports/components when safe (`HomeServicesCarousel`, etc.).  
5. Consolidate locale keys where it reduces duplication without breaking i18n.  
6. Preserve SEO metadata, canonicals, hreflang, schema, historical redirects.  
7. Preserve wording unless an editorial change is explicitly approved.  
8. Apply approved changes to EN and ZH together.  
9. Never fabricate testimonials, results, client statistics, or legal guarantees.  
10. Add automated exact-copy / route / render checks as in §5.4.

---

## 9. Deliverables checklist (this document)

| # | Deliverable | Section |
| --- | --- | --- |
| 1 | Final proposed IA | §1 |
| 2 | Full duplication inventory | §2 |
| 3 | Content migration matrix | §3 |
| 4 | Page structures (hub / category / detail) | §4 |
| 5 | EN/ZH + SEO strategy | §5 |
| 6 | Business decisions | §6 |
| 7 | Implementation steps + gates | §7 |

---

## 10. Immediate ask for OPOPA partners

1. Confirm **hub-centric** categories (D2=a) or request category URLs.  
2. Approve Market Entry as **true leaf** and authorize removal of the 6-row catalogue (D1=a).  
3. Choose Sales AI option (D3).  
4. Choose Legal option (D4).  
5. **Paste the partners’ website feedback** so §0.2 / wording rows can be updated before any copy REPLACE work.  

**No implementation until architecture + matrix validation.**
