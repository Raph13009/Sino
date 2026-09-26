# 04 — Services

## Service architecture

OPOPA is an integrated European expansion partner for Chinese industrial and green-tech companies. The public site has one services hub and six service pages. They are not six equal offers.

European Market Entry is the lead service. Sales coaching and sales-team training sit inside European Sales Representation. They are not a primary navigation item.

Specialists are independent experts and partners that OPOPA identifies and coordinates. Do not imply that every specialist is an OPOPA employee, or that OPOPA itself provides regulated legal advice.

Maintenance and after-sales support is a real offer: arranging suitable local maintenance partnerships and service agreements. Do not create a transport or freight service. Do not promise response times, geographic coverage or service levels without a signed arrangement.

Do not publish internal costs, personal contacts, unsupported results, office locations, headcounts, client logos, testimonials or guarantees. Do not display pricing.

## Hub

`/services` and `/zh/services`

The hub explains how an engagement is assembled, features European Market Entry, then groups the other services.

## 1. European Market Entry

Slug: `european-market-entry`

Lead offer. Diagnose the product and target market, identify priority customer segments, choose a route to market, and assemble a practical European expansion plan.

Positioning: **Frame the market, the route and the work required to enter Europe.**

## 2. European Experts and Partners

Slug: `european-experts-and-partners`

Identify and coordinate the right local specialists for a defined need: legal and international trade, regulatory and product compliance, company setup, tax and accounting, recruitment, technical specialists, distributors and other commercial partners.

This is qualification and coordination, not an anonymous contact database.

Positioning: **Coordinate the independent specialists a defined need actually requires.**

## 3. Legal and Regulatory Support

Slug: `legal-and-regulatory-support`

A focused route for incorporation, contracts, international trade, product compliance and market access. Appropriately qualified independent professionals provide specialist advice. OPOPA scopes and coordinates the engagement.

Do not claim certification, approval or compliance.

Positioning: **Independent counsel, scoped and coordinated for market access.**

## 4. Local After-Sales and Maintenance Partnerships

Slug: `after-sales-maintenance`

Help industrial manufacturers define service requirements and arrange suitable European maintenance, spare-parts or technical-support partnerships and service agreements where feasible.

Positioning: **Arrange local maintenance and service partnerships where the product requires them.**

## 5. European Sales Representation

Slug: `european-sales-representation`

Source and manage suitable European commercial professionals who represent the Chinese client, develop accounts and support long industrial sales cycles. Explain mandate, territory, product onboarding, reporting, and the difference between representation and selling leads.

Supporting modules, not a separate page: sales coaching, buyer-facing messaging, sales-team training.

Positioning: **Commercial professionals who represent you in Europe — not a list of leads.**

## 6. Sales AI and Automation

Slug: `sales-ai-automation`

Audit commercial workflows and implement bounded tools for prospect research, CRM hygiene, inquiry handling, knowledge access and follow-up. Human review. Realistic integration scope. AI stays subordinate to the sales problem.

Positioning: **Bounded commercial tools, reviewed by people, tied to a real sales problem.**

## Navigation groups

- Plan entry: European Market Entry
- Build local capability: European Experts and Partners; Legal and Regulatory Support; Local After-Sales and Maintenance Partnerships
- Grow sales: European Sales Representation; Sales AI and Automation

## Retired URLs

Permanent redirects (Next.js `permanent: true`, HTTP 308). No redirect chains.

| From | To |
| --- | --- |
| `/services/sales-enablement` | `/services/european-sales-representation` |
| `/services/expert-partner-sourcing` | `/services/european-experts-and-partners` |
| `/services/outsourced-sales` | `/services/european-sales-representation` |
| `/expertise/market-entry-advisory` | `/services/european-market-entry` |
| `/expertise/european-partner-network` | `/services/european-experts-and-partners` |
| `/expertise/sales-enablement` | `/services/european-sales-representation` |
| `/expertise/outsourced-sales` | `/services/european-sales-representation` |

The same map applies under `/zh`.

`/services/sales-ai-automation` stays.

## Chinese

Simplified Chinese lives in `src/content/locales/zh.ts` under the same slugs. Wording still needs review by a native Chinese speaker before it is treated as final, especially 欧洲销售代表, 法律与合规支持, and 本地售后与维保合作.
