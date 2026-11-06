---
name: opopa-insight-from-data
description: >-
  Cross GSC + GA4 (+ trends) to propose 3 OPOPA Insight themes, then publish the
  chosen one EN+zh-CN via Drive CMS with a real cover. Use when the user launches
  this skill, asks for a data-driven blog/Insight, or says "propose 3 blogs"
  / "insight from GSC GA".
disable-model-invocation: true
---

# OPOPA Insight from data

Two-phase workflow. **Never publish until the user picks one of the 3 themes.**

Property / CMS IDs: see [cms-ids.md](cms-ids.md). Editorial constraints: `docs/INSIGHTS-WORKFLOW.md`, `docs/seo/gsc-monthly-playbook.md`.

## Phase A — Research → 3 themes (stop)

Copy and track:

```
Insight skill:
- [ ] GSC 14d + 28d (query, page, page×query)
- [ ] GA4 same windows (sessions, landing, source/medium, events)
- [ ] Existing Insights inventory (avoid duplicates)
- [ ] Light external pulse (Trends / SERP / AI-referrer notes)
- [ ] Propose exactly 3 themes → WAIT for user pick
```

### 1. Pull data (Composio)

**GSC** — `GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY`, site `sc-domain:opopa-partners.com`, `search_type=web`, `data_state=final`:

| Window | Dimensions |
|--------|------------|
| Last ~14d and ~28d (UTC, skip incomplete last 1–2 days) | `query`, `page`, `query`+`page` |

Focus non-brand rows. Ignore spam (generic RPA/retail automation unless OPOPA clearly owns the intent).

**GA4** — `GOOGLE_ANALYTICS_RUN_REPORT`, property `properties/560091484`:

- Sessions / users / `page_view` by `date`
- `landingPage`, `sessionSource`+`sessionMedium`, `sessionDefaultChannelGroup`
- `eventName` counts (`contact_cta_click`, `generate_lead`, `ai_referral`, …)

If toolkit disconnected: `COMPOSIO_MANAGE_CONNECTIONS` then retry. Do not invent numbers.

### 2. Inventory + external pulse

- List published slugs/titles from Blog Index (Sheets) or live `/insights`.
- Optional: Google Trends / WebSearch for EU–China industrial / greentech / sales-rep intent (no paid SEO tools required).
- Note AI referrers (`chatgpt.com`, etc.) — **prompts are never available**, only host + landing page.

### 3. Score candidates

Prefer topics that are:

1. Buyer-intent + OPOPA-fit (market entry, ESR, greentech/BESS, distributors, after-sales)
2. CTR gap (pos ~1–15, impressions, 0 clicks) **or** volume gap (impr, deep position, no dedicated page)
3. Not a near-duplicate of an existing Insight
4. Useful for GEO (clear question → practical answer)

### 4. Propose exactly 3 themes — then STOP

Output this format and **wait**:

```markdown
## 3 Insight themes (pick one)

### A — [short title]
- Target query / intent: …
- Why (GSC/GA evidence): …
- Angle (1 sentence): …
- CTA service: Market Entry | Sales Outsourcing | …

### B — …
### C — …

Reply with **A**, **B**, or **C** (or a tweak). I will not publish until you choose.
```

Do **not** start Docs/cover/sheet until the user selects.

---

## Phase B — Publish the chosen theme (EN + zh-CN)

```
Publish:
- [ ] EN + ZH Docs in Articles folder
- [ ] Cover (prefer real libre photo; else generate)
- [ ] Share files with CMS service account (reader)
- [ ] Append 2 Blog Index rows (Published)
- [ ] Optional safe meta tweak on related service/industry page
- [ ] Verify live EN+ZH URLs + cover
- [ ] Team email (EN HTML) → raphael@ + max@ — see team-publish-email.md
- [ ] Append dated note to docs/seo/gsc-monthly-playbook.md
- [ ] Commit/push only if code/assets changed; redeploy/wait ~3m for CMS cache
```

### Content rules

- Practical, evidence-minded; **no invented metrics, clients, or case results**.
- GEO-friendly: H2s as real questions; define terms; checklist or sequence.
- EN Doc + ZH Doc (separate). Same `translation_group`, same or matching `slug` (kebab-case).
- Spreadsheet `title` is the page H1 — do not duplicate H1 noise in the Doc body.
- Author: `OPOPA Partners`. `cta_service` from allowed CMS values only.
- `target_keyword` = editorial only (never meta keywords spam).

### Cover image

1. Prefer a **real** photograph (Unsplash / Pexels / similar libre license) matching the topic; upload to Drive **Images** via `GOOGLEDRIVE_UPLOAD_FROM_URL` (or push to `public/images/insights-covers/`, deploy, then upload from prod URL).
2. If no suitable libre image: `GenerateImage` (16:9, no text/logos), save under `public/images/insights-covers/`, deploy, upload to Drive.
3. `cover_image_url` = `https://drive.google.com/file/d/FILE_ID/view?usp=drive_link`
4. Grant **reader** on Doc EN, Doc ZH, and cover to `opopa-blog-reader@opopa-blog-cms.iam.gserviceaccount.com`.

### Blog Index rows

Append two rows (EN then zh-CN) with columns in order — see [cms-ids.md](cms-ids.md).  
`status=Published`, `language=en` / `zh-CN`, today’s `published_at` / `updated_at` (`YYYY-MM-DD`).

### After publish

1. Hit `/insights/[slug]` and `/zh/insights/[slug]` → expect 200 + cover.
2. If 404: wait CMS revalidate (~180s) or empty-commit push / revalidate endpoint if secret available.
3. **Team publish email** — once live, send branded HTML email per [team-publish-email.md](team-publish-email.md) via `GMAIL_SEND_EMAIL` (`is_html=true`) to `raphael@opopa-partners.com` + `max@opopa-partners.com`. Subject stays simple: `A new article has been published on the website`. Include OPOPA logo (`/brand/logo-dark.png`), article recap, EN+ZH links, and a reply CTA for the next topic. If Gmail disconnected: `COMPOSIO_MANAGE_CONNECTIONS` toolkit=`gmail` (account **raphael@opopa-partners.com**), wait for user auth, then send. Do not claim sent without a successful tool response.
4. Log 4–6 bullets under `docs/seo/gsc-monthly-playbook.md` (date + what shipped + “team email sent”).
5. Commit/push **only** repo changes (locales, cover under `public/`, playbook). Do not commit this skill folder.

### Hard stops

- Do not paste Google’s raw gtag snippet into the site.
- Do not disable the cookie banner / Consent Mode.
- Do not delete unrelated Insights or “clean BoostAI” unless asked.
- Do not change GSC property settings unless the user explicitly asks.

## How the user launches

Say e.g. `run opopa-insight-from-data` / `skill insight` / `propose 3 blogs from GSC GA`.
