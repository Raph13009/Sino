# Team publish email (after Insight is live)

Send **once** EN+ZH URLs return 200. Use Composio `GMAIL_SEND_EMAIL` from `raphael@opopa-partners.com` (connected Gmail).

## Recipients

- To: `raphael@opopa-partners.com`
- Extra To: `max@opopa-partners.com`
- `is_html: true`
- `include_signature: false` (HTML already branded)

## Subject (keep simple)

`A new article has been published on the website`

Optional test-only subject: `TEST — A new article has been published on the website`

## Logo

Use the live dark-surface lockup (header is ink):

`https://www.opopa-partners.com/brand/logo-dark.png`

(PNG for email-client compatibility; do not use local paths.)

## HTML template

Fill placeholders. Keep table-based layout for email clients. Brand tokens: ink `#121417`, ivory `#f3f0e8`, accent `#b01e28`, charcoal `#5c6168`, white `#fafaf8`.

Placeholders:

- `{{EN_TITLE}}` — spreadsheet / H1 title
- `{{SEO_DESC}}` — seo_description (1–2 sentences)
- `{{ANGLE}}` — one sentence on why this piece (GSC intent / angle)
- `{{EN_URL}}` — `https://www.opopa-partners.com/insights/{slug}`
- `{{ZH_URL}}` — `https://www.opopa-partners.com/zh/insights/{slug}`
- `{{COVER_URL}}` — public cover, prefer `https://www.opopa-partners.com/media/insights/{FILE_ID}` (or omit cover `<tr>` if not ready)
- `{{CTA_SERVICE}}` — Market Entry | Sales Outsourcing | …
- `{{PUBLISHED_AT}}` — YYYY-MM-DD
- `{{BULLETS}}` — 3–5 `<li>` recap points from the article H2s / checklist (no invented metrics)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>A new article has been published</title>
</head>
<body style="margin:0;padding:0;background:#ebe7df;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ebe7df;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#fafaf8;border:1px solid #d4cfc5;">
          <!-- Header + logo -->
          <tr>
            <td style="background:#121417;padding:28px 36px 26px;">
              <img src="https://www.opopa-partners.com/brand/logo-dark.png" alt="OPOPA Partners" width="168" style="display:block;width:168px;max-width:50%;height:auto;border:0;" />
              <p style="margin:22px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#b01e28;">Website update</p>
              <h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;font-weight:normal;color:#fafaf8;">A new article has been published on the website</h1>
            </td>
          </tr>
          <tr>
            <td style="height:4px;background:#b01e28;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <!-- Cover (optional) -->
          <tr>
            <td style="padding:0;background:#121417;">
              <img src="{{COVER_URL}}" alt="" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px 36px 8px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#5c6168;">New Insight</p>
              <p style="margin:12px 0 0;font-size:20px;line-height:1.35;color:#121417;">{{EN_TITLE}}</p>
              <p style="margin:16px 0 0;font-size:16px;line-height:1.55;color:#121417;">{{SEO_DESC}}</p>
              <p style="margin:16px 0 0;font-size:15px;line-height:1.55;color:#5c6168;">{{ANGLE}}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 36px 24px;">
              <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#5c6168;">In this article</p>
              <ul style="margin:0;padding:0 0 0 18px;color:#121417;font-size:15px;line-height:1.6;">
                {{BULLETS}}
              </ul>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f0e8;border:1px solid #d4cfc5;">
                <tr>
                  <td style="padding:16px 20px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#5c6168;line-height:1.5;">
                    <strong style="color:#121417;">Published</strong> {{PUBLISHED_AT}}<br />
                    <strong style="color:#121417;">CTA service</strong> {{CTA_SERVICE}}<br />
                    <strong style="color:#121417;">Languages</strong> EN + zh-CN
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTAs -->
          <tr>
            <td style="padding:0 36px 28px;" align="left">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background:#121417;border:1px solid #121417;">
                    <a href="{{EN_URL}}" style="display:inline-block;padding:14px 22px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;color:#fafaf8;font-weight:600;">Read English</a>
                  </td>
                  <td width="12" style="font-size:0;">&nbsp;</td>
                  <td style="background:transparent;border:1px solid #121417;">
                    <a href="{{ZH_URL}}" style="display:inline-block;padding:14px 22px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;color:#121417;font-weight:600;">Read 中文</a>
                  </td>
                </tr>
              </table>
              <p style="margin:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#5c6168;word-break:break-all;">
                EN: <a href="{{EN_URL}}" style="color:#b01e28;">{{EN_URL}}</a><br />
                ZH: <a href="{{ZH_URL}}" style="color:#b01e28;">{{ZH_URL}}</a>
              </p>
            </td>
          </tr>
          <!-- Reply / next idea -->
          <tr>
            <td style="padding:0 36px 36px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-left:3px solid #b01e28;background:#fafaf8;">
                <tr>
                  <td style="padding:18px 20px;font-size:15px;line-height:1.55;color:#121417;">
                    <strong style="color:#121417;">Got an idea for the next article?</strong><br />
                    <span style="color:#5c6168;">Reply to this email with a topic, angle, or useful links — we will pick it up for the next Insight.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#121417;padding:22px 36px;">
              <img src="https://www.opopa-partners.com/brand/logo-dark.png" alt="OPOPA" width="120" style="display:block;width:120px;height:auto;border:0;opacity:0.9;" />
              <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(250,250,248,0.55);">Asia → Europe · Markets in Sync</p>
              <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:rgba(250,250,248,0.4);">Internal publish notice · OPOPA Partners</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

## Composio call shape

```
GMAIL_SEND_EMAIL:
  recipient_email: raphael@opopa-partners.com
  extra_recipients: [max@opopa-partners.com]   # omit on test sends
  subject: A new article has been published on the website
  is_html: true
  include_signature: false
  body: {filled HTML}
```

If Gmail toolkit is disconnected: `COMPOSIO_MANAGE_CONNECTIONS` toolkit=`gmail`, ask user to authorize **raphael@opopa-partners.com**, then retry. Do not invent a send success.
