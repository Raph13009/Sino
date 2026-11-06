# OPOPA CMS + analytics IDs (local skill reference)

## Search / Analytics

| System | ID |
|--------|-----|
| GSC site | `sc-domain:opopa-partners.com` |
| GA4 property | `properties/560091484` (account **Opopa partners - 欧博派**) |
| Measurement ID | `G-M5TRKEW7SZ` (site env only; do not hardcode into HTML) |

## Drive / Sheets

| Resource | ID |
|----------|-----|
| Blog Index spreadsheet | `1w2TMVQK-SzSqGgo7VinOrZ89vDQb-25GWOPmEeyRj54` |
| Sheet tab | `Blog Index` |
| Articles folder | `18KNlx6QEcBCqBQWF5shvlTl_zrnVDtyA` |
| Images folder | `1dc6cYYDFl9yatjxBiXSDZ7kwOdt9BmVc` |
| CMS service account | `opopa-blog-reader@opopa-blog-cms.iam.gserviceaccount.com` |

## Blog Index columns (A→P)

`status`, `language`, `translation_group`, `title`, `slug`, `seo_title`, `seo_description`, `category`, `author`, `published_at`, `updated_at`, `target_keyword`, `doc_url`, `cover_image_url`, `cta_service`, `featured`

### Allowed `cta_service`

`Market Entry` | `Sales Outsourcing` | `Sales Coaching` | `AI Sales Automation` | `None`

### Allowed `language`

`en` | `zh-CN`

### Team notify (after Insight is live)

| Role | Email |
|------|-------|
| To | `raphael@opopa-partners.com` |
| To | `max@opopa-partners.com` |

Template + HTML: [team-publish-email.md](team-publish-email.md).  
Tool: `GMAIL_SEND_EMAIL` from connected Gmail (**raphael@opopa-partners.com**).

## Composio tools (typical)

- Docs: `GOOGLEDRIVE_CREATE_FILE_FROM_TEXT` (`mime_type=application/vnd.google-apps.document`, `parent_id`=Articles)
- Cover: `GOOGLEDRIVE_UPLOAD_FROM_URL` → Images folder
- Share: `GOOGLEDRIVE_CREATE_PERMISSION` (user, reader, SA email, `send_notification_email=false`)
- Sheet: `GOOGLESHEETS_VALUES_GET`, `GOOGLESHEETS_SPREADSHEETS_VALUES_APPEND`
- GSC / GA: `GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY`, `GOOGLE_ANALYTICS_RUN_REPORT`
- Team email: `GMAIL_SEND_EMAIL` (`is_html=true`) — see team-publish-email.md

Session: pass Composio `session_id` when the meta tools return one.
