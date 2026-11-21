import "server-only";
import { Resend } from "resend";
import type { Locale } from "@/i18n/config";
import { getFromAddress, getResendApiKey } from "@/lib/contact/config";
import { getSiteOrigin } from "./config";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function welcomeCopy(locale: Locale) {
  if (locale === "zh") {
    return {
      subject: "欢迎订阅 OPOPA Insights",
      eyebrow: "通讯",
      title: "欢迎加入",
      intro:
        "感谢订阅。你将在我们发布新洞察时收到邮件——关于中国创新、新兴技术，以及塑造中欧商业机遇的内容。",
      cta: "浏览洞察",
      ctaUrl: `${getSiteOrigin()}/zh/insights`,
      noNoise: "没有噪音。只有有价值的洞察，直接送到你的收件箱。",
      unsub: "取消订阅",
    };
  }

  return {
    subject: "Welcome to OPOPA Insights",
    eyebrow: "Newsletter",
    title: "You're in.",
    intro:
      "Thanks for joining. We’ll email you when we publish new Insights on Chinese innovation, emerging technologies, and the opportunities shaping business between China and Europe.",
    cta: "Browse Insights",
    ctaUrl: `${getSiteOrigin()}/insights`,
    noNoise: "No noise. Just valuable insights, straight to your inbox.",
    unsub: "Unsubscribe",
  };
}

export async function sendWelcomeEmail(input: {
  email: string;
  locale: Locale;
  unsubToken: string;
}): Promise<{ ok: true } | { ok: false }> {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    console.error("[newsletter] RESEND_API_KEY missing for welcome email");
    return { ok: false };
  }

  const copy = welcomeCopy(input.locale);
  const origin = getSiteOrigin();
  const unsubUrl = `${origin}/newsletter/unsubscribe?token=${encodeURIComponent(input.unsubToken)}`;

  const text = [
    copy.title,
    "",
    copy.intro,
    "",
    copy.ctaUrl,
    "",
    copy.noNoise,
    "",
    `${copy.unsub}: ${unsubUrl}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="${input.locale === "zh" ? "zh-Hans" : "en"}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(copy.subject)}</title>
</head>
<body style="margin:0;padding:0;background:#ebe7df;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ebe7df;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#fafaf8;border:1px solid #d4cfc5;">
          <tr>
            <td style="background:#b01e28;padding:28px 36px 26px;">
              <img src="${origin}/brand/logo-dark.png" alt="OPOPA Partners" width="168" style="display:block;width:168px;max-width:50%;height:auto;border:0;" />
              <p style="margin:22px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(250,250,248,0.85);">${escapeHtml(copy.eyebrow)}</p>
              <h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;font-weight:normal;color:#fafaf8;">${escapeHtml(copy.title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 36px 12px;">
              <p style="margin:0;font-size:16px;line-height:1.55;color:#121417;">${escapeHtml(copy.intro)}</p>
              <p style="margin:18px 0 0;font-size:15px;line-height:1.55;color:#5c6168;">${escapeHtml(copy.noNoise)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 36px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background:#121417;border:1px solid #121417;">
                    <a href="${escapeHtml(copy.ctaUrl)}" style="display:inline-block;padding:14px 22px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;color:#fafaf8;font-weight:600;">${escapeHtml(copy.cta)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#121417;padding:22px 36px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(250,250,248,0.55);">Asia → Europe · Markets in Sync</p>
              <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:rgba(250,250,248,0.4);">
                <a href="${escapeHtml(unsubUrl)}" style="color:rgba(250,250,248,0.7);">${escapeHtml(copy.unsub)}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: getFromAddress(),
    to: input.email,
    subject: copy.subject,
    text,
    html,
    headers: {
      "List-Unsubscribe": `<${unsubUrl}>`,
    },
  });

  if (result.error) {
    console.error("[newsletter] welcome email failed", {
      name: result.error.name,
    });
    return { ok: false };
  }

  return { ok: true };
}
