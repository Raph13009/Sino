# OPOPA Services — Phase A Approval Pack

**Status:** Awaiting approval before Phases B–E (no application code in this phase)  
**Branch for later work:** `design/premium-homepage-poc` (not switched yet; Phase A is docs only)  
**Date:** 2026-10-15  

**Primary business reference:** Positioning description confirmed in the implementation brief (OPOPA: Positioning Draft v1 — *Positioning description*). The standalone draft file was not found on disk in the repo or Desktop; the approved bullets below are taken from the finalized brief you sent.

---

## 0. Locked decisions (from your approval)

| ID | Decision | Locked |
| --- | --- | --- |
| Positioning | OPOPA = **European operating partner** for Chinese industrial companies; execution and outcomes, not generic market-entry consulting | Yes |
| Categories | **Market Access** + **Local Support** | Yes |
| D1 | Keep `/services/european-market-entry`; remove second-catalogue role; do not auto-cast as strategy consultancy; resolve vs Sales Rep by flagging overlap | Yes (distinction pending approval in §1) |
| D2 | Hub-centric; no new category URLs; two substantial sections on `/services` | Yes |
| D3 | Keep Sales AI URL/SEO; demote in main nav as supporting capability | Yes |
| D4 | Keep Legal URL; OPOPA coordinates qualified specialists, does not provide regulated legal advice | Yes |
| Catalogue rule | Only `/services` shows the full six-service catalogue | Yes |
| Production | Do not publish to production | Yes |
| Copy | Propose EN + ZH before publishing any unapproved replacement sentences | Yes |
| SEO | Propose before/after title/H1/description mapping before changing | Yes |

---

## 1. Market Entry vs Sales Representation — overlap analysis

### 1.1 Approved Market Access scope (source of truth)

From Positioning Draft v1 — Positioning description:

1. Build and coordinate local commercial teams.  
2. Identify and qualify customers, distributors, integrators and commercial partners.  
3. Support outreach, introductions, business development and negotiations.  
4. Coordinate commercial execution.

### 1.2 What each page claims today (live EN copy)

| Claim theme | European Market Entry (live) | European Sales Representation (live) | Overlap? |
| --- | --- | --- | --- |
| Local commercial people / experts who prospect | Yes — “local sales experts… prospect for you” (`detail.intro`, `coordinates`, `summary`) | Yes — “commercial professionals who… prospect and develop accounts” | **YES — substantial** |
| You get clients / make the deal | Yes — “You get the clients” / rhythm “You sell” | Implied via account development | **YES** |
| Team as a service / no subsidiary | Softly via coordination; homepage credibility | Explicit core offer | Partial (Sales Rep owns it) |
| Mandate, territory, onboarding, reporting | Weak / “commercial mandate” | Explicit | Mostly Sales Rep |
| Opportunity analysis / where to start | Yes (`scope`, work-table leftovers) | No | Market Entry–leaning |
| Represent under client identity | No | Yes | Sales Rep only |
| Qualify distributors / integrators / partners | Thin (“coverage”, “buyers”) | Thin | **Neither page clearly owns Positioning bullet 2** |
| Full six-service catalogue on page | Yes (`detail.work` + large `followOn`) | No | Market Entry only (must REMOVE) |

### 1.3 Verdict

**Scopes substantially overlap today** on the commercial core: both pages sell “we put local commercial capacity on prospecting/execution so you get European clients.”

That is not enough to justify two pages **unless** we split ownership of the approved Market Access bullets.

We must **not** invent a third service (e.g. “strategy consulting”) to justify Market Entry. D1 forbids casting Market Entry as generic market-entry planning consultancy by default.

### 1.4 Proposed distinction (for approval — not invented services)

Map the **already-approved** Market Access bullets to the two URLs:

| Positioning bullet | Proposed owner URL | Why |
| --- | --- | --- |
| Build and coordinate local commercial teams | **European Sales Representation** | Matches live mandate/team-as-a-service copy |
| Coordinate commercial execution (of that team) | **European Sales Representation** | Same |
| Identify and qualify customers, distributors, integrators and commercial partners | **European Market Entry** | Gives Market Entry a distinct job without “strategy consulting” |
| Support outreach, introductions, business development and negotiations | **European Market Entry** (partner/customer path) + **Sales Representation** (when a dedicated rep team is engaged) | Shared *activity*, different *delivery*: Entry = partner/customer qualification & introductions; Rep = named commercial team under client identity |

**One-line roles (proposed EN — needs approval):**

- **European Market Entry:** Identify and qualify European customers, distributors, integrators and commercial partners; support outreach, introductions and negotiations under a clear commercial mandate.  
- **European Sales Representation:** Build and coordinate a local commercial team that represents you in Europe, develops accounts and executes under your identity — as a service, without a local subsidiary.

**If partners reject this split:** the honest alternative is to keep the Sales Representation page as the primary Market Access leaf and reduce Market Entry to a thin SEO landing that redirects attention to Sales Representation + hub (still keep URL). Do **not** invent filler scope.

### 1.5 Decision required before Phase C copy

| Option | Description | Recommendation |
| --- | --- | --- |
| **A (preferred)** | Split as in §1.4 | Keeps both URLs with real differentiation |
| **B** | Sales Rep = primary Market Access leaf; Market Entry = short SEO page pointing to hub/Sales Rep; remove catalogue; minimal unique body | Use only if A is rejected |
| **C** | Merge content into one page + 301 | **Rejected by D1** (URL must stay; not asking to delete URL) |

**Please approve A or B.**

---

## 2. Local Support mapping (no conflict)

| Positioning bullet | Primary leaf | Notes |
| --- | --- | --- |
| After-sales and maintenance partners | `after-sales-maintenance` | Flagship depth OK |
| Warehousing and spare-parts solutions | `after-sales-maintenance` | Same |
| Technical, regulatory, legal and operational specialists | `european-experts-and-partners` + `legal-and-regulatory-support` | Legal = counsel track; Experts = broader coordination (D4) |
| Partner briefs, RFQs and local execution | Cross-cutting on Local Support leaves / hub category copy | Not a separate URL |

---

## 3. Final content migration matrix (Phase A freeze)

Actions: **KEEP** / **MOVE** / **REPLACE** / **REMOVE**.  
`Approval?` = needs partner sign-off on new wording before publish.  
SEO changes listed in §5 separately.

### 3.1 Global / structural

| ID | Route / surface | Source | Action | Notes | Approval? |
| --- | --- | --- | --- | --- | --- |
| G1 | Site positioning lines | `brand`, `footer`, `home.meta`, `about.lead`, `siteConfig` | **REPLACE** gradually toward “European operating partner…” | Prefer one canonical short line; propose SEO mapping first for meta | Yes for public strings |
| G2 | Nav groups | `nav.megaMenu.groups` | **KEEP** Market access / Local support | Labels link to hub hashes in Phase B | No |
| G3 | Sales AI in mega menu | Header wiring | **REPLACE** presentation (supporting / secondary) | URL kept (D3) | No (structure) |
| G4 | Footer services | `SiteFooter` | **REPLACE** flat list → two groups | No new URLs | No |
| G5 | Home pillars href | `getHomePillars` | **REPLACE** `#group-*` → `#market-access` / `#local-support` (+ aliases) | Phase B | No |
| G6 | `HomeServicesCarousel` + `serviceMarks` | components | **REMOVE** | Unused | No |
| G7 | Catalogue rule | All leaves | Enforce: no full 6-service grids | Phase C/D | — |

### 3.2 Services hub `/services`

| ID | Section / key | Action | Notes | Approval? |
| --- | --- | --- | --- | --- |
| H1 | Hero title/description | **KEEP** structure; **REPLACE** description if it still says generic “market entry consulting” | Align to operating partner + two offers | Yes if reworded |
| H2 | Pillars intro + two pillar cards | **KEEP** as category chooser; **REPLACE** bodies to Positioning bullets (short) | Single source shared with home if possible | Yes |
| H3 | Section ids | **REPLACE** `#group-access`→`#market-access`, `#group-support`→`#local-support`; keep old ids as aliases one release | | No |
| H4 | Group notes | **KEEP** one note per category; **REPLACE** mega notes to same source | Kill dual notes | Optional |
| H5 | Six `ServiceHubCard`s | **KEEP** (only full catalogue); Sales AI card visually quieter | D3/D5 | No |
| H6 | `cards.*.subline` unused keys | **REMOVE** when safe | | No |
| H7 | Closing CTA | **KEEP** one | | No |
| H8 | Unused `primaryCta` / `closing.secondaryCta` | **REMOVE** if still unused | | No |

### 3.3 European Market Entry

| ID | Section / key | Action | Notes | Approval? |
| --- | --- | --- | --- | --- |
| M1 | `detail.work` (6-row table) | **REMOVE** from render + locale | Critical anti-duplication | Removal yes |
| M2 | `detail.headline` (brand H1) | **REPLACE** with service-named H1 | See §4 proposed copy | **Yes** |
| M3 | `detail.lead` (= home rhythm) | **REMOVE** | Homepage owns rhythm | Yes |
| M4 | `detail.intro` (= hub pillar) | **REPLACE** with Entry-specific intro per §1.4 | | **Yes** |
| M5 | `detail.followOn` (4 links) | **REPLACE** → ≤3: Sales Rep + Experts or After-Sales; drop “Our services” catalogue framing | | Optional |
| M6 | Map visual band | **KEEP** if still relevant to Entry story | | No |
| M7 | `detail.closing` | **KEEP** one CTA; no FinalCta duplicate | | No |
| M8 | Orphan generic `situation`…`starts` keys | **REMOVE** after custom page stable | Editor safety | No |
| M9 | `summary` / `megaDescription` / `positioning` | **REPLACE** to match §1.4 (not “analyse, prospect, close” twin of Sales Rep) | | **Yes** |
| M10 | SEO title/description | **KEEP** until §5 mapping approved | Do not silent-rewrite | **Yes** before change |

### 3.4 European Sales Representation

| ID | Section / key | Action | Notes | Approval? |
| --- | --- | --- | --- | --- |
| R1 | Page structure (generic template) | **KEEP** | | No |
| R2 | Copy that steals Entry job (“where to start / opportunity analysis”) | **REPLACE** only if present | Align to teams / mandate / identity | Yes if edit |
| R3 | Core team-as-a-service narrative | **KEEP** (fits Positioning bullet 1) | Do not invent metrics | No |
| R4 | Mid CTA + FinalCta | **REPLACE** → single CTA band | | No |
| R5 | Related services | **REPLACE** → Market Entry + Sales AI (capability) + one Local Support | ≤3 | No |
| R6 | SEO meta | **KEEP** pending §5 | | If changing |

### 3.5 Sales AI & Automation

| ID | Action | Notes | Approval? |
| --- | --- | --- | --- |
| A1 | **KEEP** URL, page, SEO assets | D3 | No |
| A2 | **REPLACE** nav/hub prominence (secondary) | Not a primary pillar | No |
| A3 | Hub/mega labeling | Optional eyebrow “Supporting capability” | Yes if new label string |
| A4 | Body copy | **KEEP** unless it overclaims AI outcomes | Yes if edit |

### 3.6 Experts & Partners

| ID | Action | Notes | Approval? |
| --- | --- | --- | --- |
| E1 | **KEEP** URL + leaf | Local Support | No |
| E2 | Ensure “independent specialists OPOPA coordinates” | Align D4 language where shared | Yes if edit |
| E3 | Related ≤3 | Legal, After-Sales, Market Entry or Sales Rep | No |

### 3.7 Legal & Regulatory Support

| ID | Action | Notes | Approval? |
| --- | --- | --- | --- |
| L1 | **KEEP** URL | D4 | No |
| L2 | **REPLACE** any wording implying OPOPA gives regulated legal advice | Coordinate qualified professionals only | **Yes** if current lines overclaim |
| L3 | Related ≤3 | Experts, Market Entry, After-Sales | No |

### 3.8 After-Sales & Maintenance

| ID | Action | Notes | Approval? |
| --- | --- | --- | --- |
| S1 | **KEEP** custom deep page + FAQ schema | Flagship | No |
| S2 | `detail.related` | **REPLACE** → ≤3 peers | No catalogue | No |
| S3 | Orphan generic keys | **REMOVE** when safe | No |
| S4 | One closing CTA | **KEEP** / drop duplicate if any | No |

### 3.9 Home services band (in scope for consistency)

| ID | Action | Notes | Approval? |
| --- | --- | --- | --- |
| P1 | Pillar descriptions | **REPLACE** to Positioning bullets (short); stop exact twin of Market Entry intro | **Yes** |
| P2 | Links | **REPLACE** to hub category hashes | No |
| P3 | Do not add six-service grid on home | **KEEP** two pillars only | No |

---

## 4. Proposed copy for approval (EN + ZH)

> Only strings that **must** change for Phase B/C to meet positioning + anti-overlap.  
> Existing approved lines that already fit can stay.

### 4.1 Canonical short positioning (sitewide candidate)

**EN:** OPOPA is the European operating partner for Chinese industrial companies.  
**ZH:** OPOPA 是面向中国工业企业的欧洲运营合作伙伴。

*(Meta/SEO variants in §5 — do not publish meta changes until approved.)*

### 4.2 Category blurbs (hub + optional home pillars)

**Market Access — EN:**  
Build and coordinate local commercial teams. Identify and qualify customers, distributors, integrators and partners. Support outreach, introductions, business development and negotiations. Coordinate commercial execution.

**Market Access — ZH:**  
组建并协调本地商务团队；识别并筛选客户、分销商、集成商与商务伙伴；支持触达、引荐、业务拓展与谈判；协调商务落地执行。

**Local Support — EN:**  
Identify and coordinate after-sales and maintenance partners. Find warehousing and spare-parts solutions. Coordinate technical, regulatory, legal and operational specialists. Support partner briefs, RFQs and local execution.

**Local Support — ZH:**  
识别并协调售后与维保伙伴；落实仓储与备件方案；协调技术、监管、法律与运营类专业力量；支持伙伴简报、询价与本地执行。

### 4.3 European Market Entry (Option A)

**H1 EN:** European Market Entry  
**H1 ZH:** 欧洲市场进入  

**Intro EN:**  
We identify and qualify European customers, distributors, integrators and commercial partners. We support outreach, introductions and negotiations under a clear mandate you keep.

**Intro ZH:**  
我们识别并筛选欧洲客户、分销商、集成商与商务伙伴，并在您保留的明确委托下，支持触达、引荐与谈判。

**Mega/card one-liner EN:**  
Qualify European customers and partners; support introductions and negotiations.  
**ZH:**  
筛选欧洲客户与伙伴，支持引荐与谈判。

### 4.4 European Sales Representation (alignment tweak)

**Intro/summary lead EN (proposed replace of overlapping opening only):**  
We build and coordinate a local commercial team that represents you in Europe, develops accounts across long industrial cycles, and executes under your identity — as a service, without a local subsidiary.

**ZH:**  
我们组建并协调在欧洲代表贵司的本地商务团队，在长周期工业销售中开发客户，并以贵司身份执行——以服务形式提供，无需设立本地子公司。

*(Rest of page scope/receives can stay if consistent; Phase C will trim double CTAs without new claims.)*

### 4.5 Legal disclaimer line (if any overclaim found)

**EN:** OPOPA coordinates appropriately qualified independent professionals. OPOPA does not itself provide regulated legal advice.  
**ZH:** OPOPA 协调具备相应资质的独立专业人士；OPOPA 自身不提供受监管的法律意见。

### 4.6 Sales AI nav label (optional)

**EN:** Supporting capability  
**ZH:** 配套能力  

---

## 5. SEO before/after mapping (proposal only — do not apply yet)

| URL | Current H1 (rendered) | Proposed H1 | Current seoTitle | Proposed seoTitle | Current seoDescription | Proposed seoDescription |
| --- | --- | --- | --- | --- | --- | --- |
| `/services/european-market-entry` | OPOPA connects Chinese companies to Europe | European Market Entry | EU–China Market Entry Agency for Chinese Manufacturers \| OPOPA | **Keep for now** *or* “European Customer & Partner Qualification for Chinese Manufacturers \| OPOPA” | …prospecting and coordinated commercial execution | Align only after Option A/B chosen |
| `/services/european-sales-representation` | European Sales Representation | **Keep** | European Sales Representation for Foreign Companies \| OPOPA | **Keep** | …without a local subsidiary | **Keep** |
| `/services/sales-ai-automation` | Sales AI and Automation | **Keep** | *(current)* | **Keep** | *(current)* | **Keep** |
| Other leaves | Service name | **Keep** | *(current)* | **Keep** | *(current)* | **Keep** |
| `/services` | Our services | **Keep** unless partners want “Services” + operating partner line in meta description only | `servicesPage.meta` | Optional meta description refresh to operating partner + two offers | — | Propose when refreshing |

**Rule:** No silent H1/title/description rewrites in Phases B–E without a checked row here.

---

## 6. Phase B–E implementation plan (after approval)

Work on branch `design/premium-homepage-poc`. **No production publish.**

| Phase | Work | Gate |
| --- | --- | --- |
| **B** | Hub two-category layout; anchors; mega/footer/home links; Sales AI demotion | Hub shows one catalogue; categories obvious on mobile/desktop |
| **C** | Market Entry strip catalogue + apply approved Entry/Rep copy; leaf CTA unification; related ≤3; Legal coordination language | No leaf repeats hub catalogue; Entry ≠ Rep |
| **D** | Remove carousel, dead keys, orphan generic locale fields; grep for leftover duplicates | CI/manual: zero dual-mounted sections |
| **E** | EN/ZH QA, SEO checks, redirects, glass nav intact, duplication pass | Sign-off checklist |

**Replacement-first rules** (binding): inventory → matrix action → update in place → delete obsolete → never hide legacy → EN+ZH together → propose unapproved sentences → no fabricated proof.

---

## 7. Approval checklist (reply with decisions)

Please confirm:

1. **Overlap split:** Option **A** or **B** (§1.5)  
2. **Copy §4.1–4.6:** Approve as-is / approve with edits / reject (paste edits)  
3. **SEO §5:** Keep Market Entry seoTitle as-is for v1, or approve proposed alternative  
4. **Category blurbs §4.2:** Approve for hub (+ home pillars)?  
5. **Proceed to Phases B–E** on `design/premium-homepage-poc` after the above?

---

## Appendix — Positioning description (locked reference)

> OPOPA is the European operating partner for Chinese industrial companies.

**Market Access**

- Build and coordinate local commercial teams.  
- Identify and qualify customers, distributors, integrators and commercial partners.  
- Support outreach, introductions, business development and negotiations.  
- Coordinate commercial execution.

**Local Support**

- Identify and coordinate after-sales and maintenance partners.  
- Find warehousing and spare-parts solutions.  
- Coordinate technical, regulatory, legal and operational specialists.  
- Support partner briefs, RFQs and local execution.

Focus: concrete execution and customer outcomes, not generic market-entry consulting.
