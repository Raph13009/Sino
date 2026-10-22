# OPOPA analytics playbook

Production property: **Opopa partners - 欧博派** → **OPOPA Website** (`G-M5TRKEW7SZ`).

Stack: GA4 (consent-gated) + Vercel Web Analytics (cookieless). No form field values are sent to GA.

## What you can (and cannot) see

| Question | Source |
|----------|--------|
| Google search queries / impressions | **Search Console** (not GA4 — queries are almost always `(not provided)`) |
| ChatGPT / Perplexity / Claude visits | GA4 `traffic_channel` + `ai_referrer` + landing page |
| The ChatGPT **prompt** text | **Impossible** — assistants do not send the query to your site |
| Which pages convert | GA4 `generate_lead` + `page_type` / `content_group` |
| EN vs ZH | GA4 `site_locale` |

## One-time GA Admin setup (required for reports)

API write scopes are unavailable via Composio — do this once in the UI:

### 1. Custom dimensions

Admin → **OPOPA Website** → **Custom definitions** → **Create custom dimensions**

| Display name | Scope | Event parameter |
|--------------|-------|-----------------|
| Page type | Event | `page_type` |
| Site locale | Event | `site_locale` |
| Content group | Event | `content_group` |
| Traffic channel detail | Event | `traffic_channel` |
| AI referrer | Event | `ai_referrer` |
| Referrer host | Event | `referrer_host` |
| CTA location | Event | `cta_location` |
| Outbound destination | Event | `outbound_destination` |

Dimensions become usable in standard reports after new hits arrive (often a few hours).

### 2. Key events (conversions)

Admin → **Events** → mark as key events:

- `generate_lead` — contact form success
- `contact_cta_click` — any link to `/contact`
- `ai_referral` — first page in a session from an AI assistant

### 3. Enhanced measurement

Admin → **Data streams** → Web → **Enhanced measurement**: keep **scrolls**, **outbound clicks**, **site search** on if available. Our code also sends first-party `outbound_click` for LinkedIn / mailto.

## Events shipped by the site

| Event | When |
|-------|------|
| `page_view` | Every App Router navigation (enriched params) |
| `ai_referral` | Once per session if referrer is ChatGPT / Perplexity / Claude / Gemini / Copilot / etc. |
| `contact_cta_click` | Click on any `/contact` link (`cta_location` from `data-cta` or section) |
| `generate_lead` | Contact form success (no field values) |
| `outbound_click` | LinkedIn or mailto |

`traffic_channel` values include: `ai_chatgpt`, `ai_perplexity`, `ai_claude`, `ai_gemini`, `ai_copilot`, `ai_other`, `organic_google`, `organic_bing`, `social_linkedin`, `direct`, `referral`, …

## Explorations for low traffic

Use **Explore → Free form** with date ranges of **28–90 days** (not day-by-day).

**AI / GEO traffic**

- Rows: `ai_referrer` or `traffic_channel`
- Columns: `page_type` or `route` (Landing page + query string)
- Filter: `traffic_channel` begins with `ai_`
- Metric: Sessions, Engaged sessions, `generate_lead`

**SEO content that works**

- Rows: `page_type` or Landing page
- Filter: `traffic_channel` = `organic_google`
- Cross-check queries in Search Console for the same URLs

**Conversion path (small N)**

- Path exploration: Landing page → `contact_cta_click` → `generate_lead`
- Or Funnel: page_view (insight/service) → contact_cta_click → generate_lead

**Locale split**

- Rows: `site_locale` × `content_group`

## Iteration cadence (recommended)

1. **Weekly (5 min):** Realtime + Search Console 7d queries / CTR for priority URLs.
2. **Bi-weekly:** AI exploration — which landing pages ChatGPT/Perplexity send.
3. **Monthly:** Insights / service pages with organic sessions but low `contact_cta_click` → improve CTA or intent match.

## UTM for campaigns you control

When sharing OPOPA in newsletters or posts:

`https://www.opopa-partners.com/?utm_source=linkedin&utm_medium=social&utm_campaign=launch`

For AI citation tests you run yourself:

`?utm_source=chatgpt&utm_medium=ai&utm_campaign=manual_test`
