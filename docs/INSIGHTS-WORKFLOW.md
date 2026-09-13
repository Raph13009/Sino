# Insights CMS workflow

Insights are published from Google Drive. Editors do **not** need Git, Cursor, or a deploy to publish an article.

Public URLs stay on the existing Insights IA:

- English (canonical, unprefixed): `/insights`, `/insights/[slug]`
- Simplified Chinese: `/zh/insights`, `/zh/insights/[slug]`
- `/blog` redirects to `/insights`

`translation_group` is never part of the URL. It only links translations.

## How editors publish

1. Create a Google Doc in the Blog CMS **Articles** folder.
2. Format with native Google Docs styles:
   - **Title** (the webpage uses the spreadsheet `title` as the single `<h1>`; the Doc title is not rendered again)
   - **Heading 2** / **Heading 3**
   - Normal paragraphs, bold, italic, links, bullets, numbered lists
3. Upload the cover image into the Drive **Images** folder (JPG, PNG or WebP).
4. Copy the Drive sharing URL (`https://drive.google.com/file/d/FILE_ID/view?...`) into `cover_image_url`.
5. Add a row on the **Blog Index** tab of **OPOPA Blog Index**.
6. Fill SEO fields (`seo_title`, `seo_description`, `slug`, `category`, `author`, dates).
7. Set `language` to `en` or `zh-CN`.
8. For a translation pair, reuse the same `translation_group` on both rows.
9. Set `status` to **Published**.

Within about **10 minutes** (or immediately after calling the optional revalidate endpoint) the article appears on OPOPA.

Only `Published` rows are public, indexable, or listed in the sitemap. Draft / Review / Archived never get article URLs.

## Chinese translations

One Google Doc and one CMS row per language.

English:

- `language = en`
- `translation_group = example-001`
- `slug = chinese-industrial-companies-enter-europe`

Chinese:

- `language = zh-CN`
- `translation_group = example-001`
- `slug` may match the English slug or differ

The site locale remains `zh` with HTML `lang="zh-Hans"` and URLs under `/zh/...`. The language switcher on an article jumps to the published counterpart in the same `translation_group`. If none exists, it falls back to the Insights homepage.

hreflang is reciprocal and only includes Published translations.

## Spreadsheet columns

`status`, `language`, `translation_group`, `title`, `slug`, `seo_title`, `seo_description`, `category`, `author`, `published_at`, `updated_at`, `target_keyword`, `doc_url`, `cover_image_url`, `cta_service`, `featured`

`target_keyword` is editorial only. It is never output as meta keywords or schema spam.

`cta_service` maps to existing routes:

| CMS value | Page |
| --- | --- |
| Market Entry | `/services` |
| Sales Outsourcing | `/services/outsourced-sales` |
| Sales Coaching | `/services/sales-enablement` |
| AI Sales Automation | `/services/sales-ai-automation` |
| None | no article CTA |

## Environment setup

Required on Vercel (Production, and Preview if you want Insights there):

```bash
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_BLOG_SHEET_ID=1zTBna6kFxYhJ3TUwLmfNcMjoZ6vzg4oL-QA4w2ZsxX4
```

Optional:

```bash
GOOGLE_PROJECT_ID=
INSIGHTS_REVALIDATE_SECRET=
```

`GOOGLE_PRIVATE_KEY` is the service-account private key, including `-----BEGIN PRIVATE KEY-----` / `-----END PRIVATE KEY-----`. In Vercel, keep the `\n` escape sequences.

Do not prefix these with `NEXT_PUBLIC_`. Google APIs run server-side only.

## Google Drive permission (required)

1. Create a Google Cloud project (free) and enable:
   - Google Sheets API
   - Google Docs API
   - Google Drive API
2. Create a **service account** (no Google Workspace needed).
3. Download the JSON key. Use `client_email` and `private_key` as env vars.
4. Share these Drive items with the service account email (`...@....iam.gserviceaccount.com`) as **Viewer**:
   - the **OPOPA Blog Index** spreadsheet
   - the CMS folder that contains **Articles** and **Images** (sharing the parent folder is enough)

Editors can keep using a normal Gmail account. They never use the service account.

## Optional instant publish

```bash
curl -X POST https://www.opopa-partners.com/api/insights/revalidate \
  -H "Authorization: Bearer $INSIGHTS_REVALIDATE_SECRET"
```

Otherwise wait for the 10-minute cache window.

## Caching

- CMS index and article bodies: ~10 minutes
- Cover images: 24 hours at the image route, with CDN `stale-while-revalidate`
- If Google is temporarily unavailable, previously cached pages keep serving
