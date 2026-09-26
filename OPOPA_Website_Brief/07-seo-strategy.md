# 07 — SEO Strategy

## SEO objective

Build a technically strong, content-led website capable of ranking for high-intent searches related to Chinese industrial companies entering and selling in Europe.

## V1 technical SEO requirements

The following requirements are mandatory:

- Unique metadata per page
- Open Graph metadata
- Canonical URLs
- `sitemap.xml`
- `robots.txt`
- JSON-LD
- Organization schema
- Service schema
- Article schema
- Breadcrumbs
- Semantic HTML
- Image optimization
- Strong Core Web Vitals
- Excellent responsive behavior
- Google Search Console setup
- Analytics
- Consider `llms.txt`

## Search intent territories

These are hypotheses about buyer language. They are not verified search-volume data and must not be repeated on every page.

| Intent hypothesis | Page |
| --- | --- |
| European market entry for Chinese manufacturers | `/services/european-market-entry` |
| Find European distributors; coordinate local specialists | `/services/european-experts-and-partners` |
| European sales representation | `/services/european-sales-representation` |
| EU product compliance support | `/services/legal-and-regulatory-support` |
| Industrial after-sales service in Europe | `/services/after-sales-maintenance` |
| Sales automation for industrial companies | `/services/sales-ai-automation` |
| How the offers fit together | `/services` |

Related themes that should inform copy, not become a repeated phrase: China–Europe industrial expansion, green technology market entry, long industrial sales cycles.

Service schema describes the offer. It does not create a special Google result by itself. Do not add FAQ schema only because a page contains questions.

## SEO architecture principle

Do not rely on one long homepage.

Use dedicated landing pages for:
- each service
- each priority industry
- major market-entry topics
- insight articles

## Page metadata

Every indexable page must have:
- unique `<title>`
- unique meta description
- canonical URL
- OG title
- OG description
- OG image
- language information
- relevant structured data

## Structured data

Use where appropriate:
- `Organization`
- `Service`
- `Article`
- `BreadcrumbList`

Do not add misleading structured data.

## International SEO

English:
- default public site

Simplified Chinese:
- `/zh/`

When Chinese pages launch:
- use correct `hreflang`
- English ↔ Simplified Chinese alternates
- localized metadata
- localized canonical logic

## Performance

SEO implementation must preserve:
- fast LCP
- low CLS
- responsive images
- modern formats
- limited client-side JavaScript
- lazy loading below the fold
- accessible navigation

## Content strategy

Insights should serve both thought leadership and organic acquisition.

Each article should:
- target a clear search intent
- link to relevant service pages
- link to relevant industry pages
- contain useful original information
- avoid keyword stuffing

## Measurement

At minimum:
- Google Search Console
- privacy-appropriate analytics
- conversion tracking for contact actions
- monitoring of indexed pages
- monitoring of Core Web Vitals
