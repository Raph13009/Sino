---
name: opopa-insight-autonomous
description: >-
  Fully autonomous OPOPA Insight publisher for scheduled runs. Pulls GSC + GA4,
  scores 3 themes, auto-picks the best one, publishes EN+zh-CN via Drive CMS,
  and emails the team. Use for cron/Automations or when the user says "autonomous
  insight", "auto-publish insight", or "insight without asking". Never asks for
  a topic or theme pick.
disable-model-invocation: true
---

# OPOPA Insight autonomous

Same research + publish pipeline as `opopa-insight-from-data`, but **never waits
for a human**. Auto-pick the best theme and publish end-to-end in one run.

Property / CMS IDs: see [`../opopa-insight-from-data/cms-ids.md`](../opopa-insight-from-data/cms-ids.md).  
Editorial constraints: `docs/INSIGHTS-WORKFLOW.md`, `docs/seo/gsc-monthly-playbook.md`.  
Team email: [`../opopa-insight-from-data/team-publish-email.md`](../opopa-insight-from-data/team-publish-email.md).

## Hard rules (autonomous)

- **Do not ask** which topic, theme, slug, or CTA to use.
- **Do not stop** after proposing 3 themes — pick and publish in the same turn.
- Prefer real data from Composio. If a toolkit is disconnected, call
  `COMPOSIO_MANAGE_CONNECTIONS` once; if still blocked, **abort with a clear
  failure summary** (do not invent GSC/GA numbers or wait for interactive auth).
- Still obey hard stops from the manual skill (no gtag paste, no consent-mode
  disable, no unrelated deletes, no GSC property setting changes).

Copy and track:

```
Autonomous Insight:
- [ ] GSC 14d + 28d (query, page, page×query)
- [ ] GA4 same windows (sessions, landing, source/medium, events)
- [ ] Existing Insights inventory (avoid duplicates)
- [ ] Light external pulse (Trends / SERP / AI-referrer notes)
- [ ] Score exactly 3 themes → AUTO-PICK #1
- [ ] Publish EN + ZH + cover + Blog Index
- [ ] Verify live URLs
- [ ] Team email
- [ ] Playbook note (+ commit/push only if repo assets changed)
```

---

## Phase A — Research → 3 themes → auto-pick

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

Do not invent numbers.

### 2. Inventory + external pulse

- List published slugs/titles from Blog Index (Sheets) or live `/insights`.
- Optional: Google Trends / WebSearch for EU–China industrial / greentech / sales-rep intent.
- Note AI referrers (`chatgpt.com`, etc.) — prompts are never available, only host + landing page.

### 3. Score candidates

Prefer topics that are:

1. Buyer-intent + OPOPA-fit (market entry, ESR, greentech/BESS, distributors, after-sales)
2. CTR gap (pos ~1–15, impressions, 0 clicks) **or** volume gap (impr, deep position, no dedicated page)
3. Not a near-duplicate of an existing Insight
4. Useful for GEO (clear question → practical answer)

### 4. Build exactly 3 themes, then auto-pick

Internally rank A / B / C with the scoring rules above. **Select the #1 theme
immediately** (highest score). On a tie, prefer the theme with the clearer
buyer-intent OPOPA fit, then the larger CTR/volume gap.

Log the decision (for the run summary and playbook), then continue — do **not**
wait for a reply:

```markdown
## Autonomous pick

### Ranked themes
### A — [short title] (SELECTED)
- Target query / intent: …
- Why (GSC/GA evidence): …
- Angle (1 sentence): …
- CTA service: Market Entry | Sales Outsourcing | …
- Score notes: …

### B — …
### C — …

Proceeding to publish **A** without human confirmation.
```

---

## Phase B — Publish the selected theme (EN + zh-CN)

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

Append two rows (EN then zh-CN) with columns in order — see cms-ids.md.  
`status=Published`, `language=en` / `zh-CN`, today’s `published_at` / `updated_at` (`YYYY-MM-DD`).

### After publish

1. Hit `/insights/[slug]` and `/zh/insights/[slug]` → expect 200 + cover.
2. If 404: wait CMS revalidate (~180s) or empty-commit push / revalidate endpoint if secret available.
3. **Team publish email** — once live, send branded HTML email per team-publish-email.md via `GMAIL_SEND_EMAIL` (`is_html=true`) to `raphael@opopa-partners.com` + `max@opopa-partners.com`. Subject: `A new article has been published on the website`. If Gmail disconnected: attempt `COMPOSIO_MANAGE_CONNECTIONS` toolkit=`gmail` once; if auth still required, note “email not sent — reconnect Gmail” in the run summary and playbook (do not block forever).
4. Log 4–6 bullets under `docs/seo/gsc-monthly-playbook.md` (date + autonomous pick A/B/C titles + what shipped + email status).
5. Commit/push **only** repo changes (locales, cover under `public/`, playbook). Do not commit skill folders as part of a publish run.

### End-of-run summary (always)

Reply with a short status block:

- Selected theme + why
- EN + ZH live URLs (or failure reason)
- Cover status
- Team email sent / skipped
- Playbook / git commit status

## How this is launched

- Cursor Automation cron (Mon/Wed/Fri 09:00 Europe/Paris): prompt must say to run **opopa-insight-autonomous** end-to-end with no questions.
- Manual: `run opopa-insight-autonomous` / `auto-publish insight` / `autonomous insight`.

For the interactive 3-theme picker, use `opopa-insight-from-data` instead.
