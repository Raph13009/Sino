# Insights authoring workflow

Publish a new Insight by adding content files and an image — no React page edits required for a normal article.

## 1. Add the image to the media registry

1. Place the asset under `public/images/insights/`.
2. Register it in `src/content/media.ts` under `media.insights` with a stable key (for example `marketEntry`).
3. Add that key to `insightImageKeys` in `src/content/insights/schema.ts` so frontmatter validation accepts it.

## 2. Create EN and ZH MDX files

Create matching files (same slug / filename):

- `content/insights/en/<slug>.mdx`
- `content/insights/zh/<slug>.mdx`

Filename must equal the `slug` frontmatter value (kebab-case).

### Required frontmatter

```yaml
---
title: "Article headline (H1 on the page)"
seoTitle: "Unique browser / SERP title"
description: "Unique meta description"
excerpt: "Optional card teaser; defaults to description"
slug: "kebab-case-slug"
date: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
author: "OPOPA"
category: "Category label"
image: "mediaRegistryKey"
relatedServices:
  - "sales-enablement"
relatedIndustries:
  - "industrial-equipment"
---
```

`relatedServices` and `relatedIndustries` must use slugs from `src/content/catalog.ts`.

### Body

Write rich MDX (not paragraph arrays):

- Headings: `##` / `###` only in the body (the page owns the single H1)
- Paragraphs, bullet / numbered lists, blockquotes, GFM tables, links
- Custom blocks: `<InsightCta />`, `<InsightFaq>` / `<InsightFaqItem>`, `<InsightMedia id="..." />`

English links use unprefixed paths (`/services/...`). Chinese articles should use `/zh/...` paths.

Do not machine-translate at runtime — ship a deliberate ZH article.

## 3. Build and deploy

```bash
npm run build
```

The production build uses webpack (`next build --webpack`) so MDX compilation stays reliable. It fails clearly if:

- required frontmatter is missing or invalid (Zod)
- filename and `slug` disagree
- EN and ZH slug sets do not match

Then deploy as usual. Discovery is automatic for:

- `/insights` and `/zh/insights`
- article routes
- homepage teaser (latest by `date`)
- related services / industries modules
- sitemap `lastModified` from `updatedAt`

## What you should not edit for a normal article

- Insight React pages under `src/app/[locale]/insights/`
- Locale dictionaries (`en.ts` / `zh.ts`) for article bodies
- `catalog.ts` (services / industries only — not insight lists)
