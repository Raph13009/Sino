import type { BroadcastPayload } from "./schema";
import { getSiteOrigin } from "./config";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function buildInsightBroadcastEmail(
  payload: BroadcastPayload,
  unsubToken: string,
) {
  const origin = getSiteOrigin();
  const unsubUrl = `${origin}/newsletter/unsubscribe?token=${encodeURIComponent(unsubToken)}`;
  const coverBlock = payload.coverUrl
    ? `<tr>
            <td style="padding:0;background:#121417;">
              <img src="${escapeHtml(payload.coverUrl)}" alt="" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
            </td>
          </tr>`
    : "";

  const bulletItems = (payload.bullets ?? [])
    .slice(0, 5)
    .map((item) => `<li style="margin:0 0 6px;">${escapeHtml(item)}</li>`)
    .join("");

  const bulletsBlock = bulletItems
    ? `<tr>
            <td style="padding:8px 36px 24px;">
              <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#5c6168;">In this article</p>
              <ul style="margin:0;padding:0 0 0 18px;color:#121417;font-size:15px;line-height:1.6;">
                ${bulletItems}
              </ul>
            </td>
          </tr>`
    : "";

  const subject = "A new article has been published on the website";

  const text = [
    "A new Insight has been published on the OPOPA website.",
    "",
    payload.enTitle,
    payload.seoDescription,
    payload.angle,
    "",
    `EN: ${payload.enUrl}`,
    `ZH: ${payload.zhUrl}`,
    "",
    `Unsubscribe: ${unsubUrl}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#ebe7df;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ebe7df;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#fafaf8;border:1px solid #d4cfc5;">
          <tr>
            <td style="background:#121417;padding:28px 36px 26px;">
              <img src="${origin}/brand/logo-dark.png" alt="OPOPA Partners" width="168" style="display:block;width:168px;max-width:50%;height:auto;border:0;" />
              <p style="margin:22px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#b01e28;">Newsletter</p>
              <h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;font-weight:normal;color:#fafaf8;">A new article has been published on the website</h1>
            </td>
          </tr>
          <tr>
            <td style="height:4px;background:#b01e28;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          ${coverBlock}
          <tr>
            <td style="padding:32px 36px 8px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#5c6168;">New Insight</p>
              <p style="margin:12px 0 0;font-size:20px;line-height:1.35;color:#121417;">${escapeHtml(payload.enTitle)}</p>
              <p style="margin:16px 0 0;font-size:16px;line-height:1.55;color:#121417;">${escapeHtml(payload.seoDescription)}</p>
              <p style="margin:16px 0 0;font-size:15px;line-height:1.55;color:#5c6168;">${escapeHtml(payload.angle)}</p>
            </td>
          </tr>
          ${bulletsBlock}
          <tr>
            <td style="padding:0 36px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f0e8;border:1px solid #d4cfc5;">
                <tr>
                  <td style="padding:16px 20px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#5c6168;line-height:1.5;">
                    <strong style="color:#121417;">Published</strong> ${escapeHtml(payload.publishedAt)}<br />
                    <strong style="color:#121417;">CTA service</strong> ${escapeHtml(payload.ctaService)}<br />
                    <strong style="color:#121417;">Languages</strong> EN + zh-CN
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 28px;" align="left">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background:#121417;border:1px solid #121417;">
                    <a href="${escapeHtml(payload.enUrl)}" style="display:inline-block;padding:14px 22px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;color:#fafaf8;font-weight:600;">Read English</a>
                  </td>
                  <td width="12" style="font-size:0;">&nbsp;</td>
                  <td style="background:transparent;border:1px solid #121417;">
                    <a href="${escapeHtml(payload.zhUrl)}" style="display:inline-block;padding:14px 22px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;color:#121417;font-weight:600;">Read 中文</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#121417;padding:22px 36px;">
              <img src="${origin}/brand/logo-dark.png" alt="OPOPA" width="120" style="display:block;width:120px;height:auto;border:0;opacity:0.9;" />
              <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(250,250,248,0.55);">Asia → Europe · Markets in Sync</p>
              <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:rgba(250,250,248,0.4);">
                You receive this because you joined the OPOPA Insights newsletter.
                <a href="${escapeHtml(unsubUrl)}" style="color:rgba(250,250,248,0.7);">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
