# Services copy — before/after (APPLIED)

**Status:** Applied on `design/premium-homepage-poc` (awaiting final visual approval; not deployed to production).

**Distinction locked:**  
- **European Market Entry** = focused commercial development assignments (identify/qualify customers & partners; coordinate outreach; develop commercial opportunities).  
- **European Sales Representation** = build and coordinate a local sales team (ongoing representation as a service).

**Framing rule:** Explain what we deliver. Do not define Market Entry negatively. Do not claim “without further legal obligations of a local subsidiary” in the Sales Representation hero.

**SEO:** Keep all existing `seoTitle` / `seoDescription` values and all six service URLs.

---

## A. European Market Entry (approved A1–A5)

| Key | EN AFTER | ZH AFTER |
| --- | --- | --- |
| `detail.intro` | We identify and qualify potential European customers, distributors, integrators and commercial partners. We coordinate outreach and introductions, and help develop commercial opportunities. | 我们识别并筛选潜在欧洲客户、分销商、集成商与商务伙伴；协调触达与引荐，并协助开拓商务机会。 |
| `positioning` | Identify and qualify European customers and partners; coordinate outreach and develop commercial opportunities. | 识别并筛选欧洲客户与伙伴；协调触达并开拓商务机会。 |
| `megaDescription` | Identify and qualify European customers, distributors, integrators and partners; coordinate outreach and develop commercial opportunities. | 识别并筛选欧洲客户、分销商、集成商与伙伴；协调触达并开拓商务机会。 |
| `summary` | Focused commercial development assignments: identify and qualify European customers, distributors, integrators and commercial partners; coordinate outreach and introductions; develop commercial opportunities. | 聚焦的商务拓展任务：识别并筛选欧洲客户、分销商、集成商与商务伙伴；协调触达与引荐；开拓商务机会。 |
| Hub card description | Identify and qualify customers and partners; coordinate outreach and develop commercial opportunities. | 识别并筛选客户与伙伴；协调触达并开拓商务机会。 |

**Deleted orphan keys:** `detail.headline`, `detail.lead`, `detail.work`, `detail.followOn`, and unused generic body (`situation*`, `coordinates*`, `scope`, `receives*`, `starts*`, `cta`) under Market Entry.

---

## B. European Sales Representation

### B1. Hero `summary` (final approved)

| | EN | ZH |
| --- | --- | --- |
| **AFTER** | We build and coordinate a local sales team to prospect, develop customer relationships and manage commercial opportunities in Europe. Your team operates as a service, without the need to build an in-house sales department. | 我们组建并协调本地销售团队，在欧洲开发客户、维护客户关系并管理商务机会。您的团队以服务形式运作，无需自建内部销售部门。 |

Removed: claim about absence of further legal obligations of a local subsidiary (from hero and aligned rendered marketing lines). SEO `seoDescription` strings kept unchanged.

### B3–B4

| Key | EN AFTER | ZH AFTER |
| --- | --- | --- |
| `megaDescription` | Build and coordinate a local sales team that represents you, prospects and develops accounts across long industrial cycles. | 组建并协调本地销售团队，代表您开展业务，在长工业周期中开发客户与账户。 |
| Hub card description | Build and coordinate a local sales team that represents you and develops accounts over time. | 组建并协调本地销售团队，代表您并持续开发账户。 |

---

## C. Category copy (single source)

**Source of truth:** `servicesPage.pillars[].description`  
**Consumers:** Services hub + homepage via `getHomePillars()` (home pillars keep title/cta only).

### C1. Market Access

| EN | ZH |
| --- | --- |
| We build and coordinate local commercial teams to identify customers, develop partnerships and generate sales opportunities across Europe. | 我们组建并协调本地商务团队，在欧洲识别客户、发展合作伙伴并创造销售机会。 |

### C2. Local Support

| EN | ZH |
| --- | --- |
| We connect you with European partners for after-sales, maintenance, spare parts, warehousing and specialist support, and coordinate their execution. | 我们为您对接欧洲的售后、维保、备件、仓储与专业支持伙伴，并协调其落地执行。 |

### C3. Hub / mega notes

Still sourced from `servicesPage.groups.*.note` (shorter labels for mega menu). Unused `nav.megaMenu.groups.*.note` keys removed.

---

## Cleanup completed

- Old six-service catalogue removed from Market Entry page/locale.  
- Mega menu notes deduplicated; hub notes are the single source.  
- Category descriptions not duplicated under `home.services.pillars`.  
- Six service URLs, redirects, SEO titles/descriptions preserved.  
- No production deploy; remain on `design/premium-homepage-poc`.
