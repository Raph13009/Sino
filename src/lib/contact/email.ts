import { Resend } from "resend";
import type { Locale } from "@/i18n/config";
import {
  getFromAddress,
  getNotificationEmail,
  getResendApiKey,
} from "@/lib/contact/config";
import type { ContactPayload } from "@/lib/contact/schema";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function firstName(name: string) {
  const trimmed = name.trim();
  const [first] = trimmed.split(/\s+/);
  return first || trimmed;
}

function formatOptional(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "—";
}

function getResendClient() {
  const apiKey = getResendApiKey();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function notificationContent(payload: ContactPayload, locale: Locale) {
  const phone = formatOptional(payload.phone);
  const submittedAt = new Date().toISOString();
  const fields = [
    ["Name", payload.name],
    ["Company", payload.company],
    ["Work email", payload.email],
    ["Country", payload.country],
    ["Industry", payload.industry],
    ["Phone / WeChat", phone],
    ["Project / expansion need", payload.message],
    ["Locale", locale],
    ["Submitted", submittedAt],
  ] as const;

  const text = [
    "A new enquiry was submitted on the CIVEP website.",
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0;vertical-align:top;color:#30353b;font-weight:500;">${escapeHtml(label)}</th><td style="padding:6px 0;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const html = `
    <p>A new enquiry was submitted on the CIVEP website.</p>
    <table style="border-collapse:collapse;font-size:15px;line-height:1.5;">${rows}</table>
  `;

  return { text, html };
}

function confirmationContent(payload: ContactPayload, locale: Locale) {
  const name = firstName(payload.name);

  if (locale === "zh") {
    return {
      subject: "感谢您联系 CIVEP",
      text: [
        `您好 ${name}，`,
        "",
        "感谢您联系 CIVEP。",
        "",
        "我们已收到您关于欧洲拓展的咨询，并将审阅您提供的信息。",
        "",
        "我们会尽快与您联系。",
        "",
        "此致，",
        "CIVEP",
      ].join("\n"),
      html: `
        <p>您好 ${escapeHtml(name)}，</p>
        <p>感谢您联系 CIVEP。</p>
        <p>我们已收到您关于欧洲拓展的咨询，并将审阅您提供的信息。</p>
        <p>我们会尽快与您联系。</p>
        <p>此致，<br />CIVEP</p>
      `,
    };
  }

  return {
    subject: "Thank you for contacting CIVEP",
    text: [
      `Hi ${name},`,
      "",
      "Thank you for contacting CIVEP.",
      "",
      "We’ve received your enquiry regarding your European expansion and will review the information you shared.",
      "",
      "We’ll get back to you shortly.",
      "",
      "Best,",
      "CIVEP",
    ].join("\n"),
    html: `
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thank you for contacting CIVEP.</p>
      <p>We’ve received your enquiry regarding your European expansion and will review the information you shared.</p>
      <p>We’ll get back to you shortly.</p>
      <p>Best,<br />CIVEP</p>
    `,
  };
}

/**
 * Sends the internal notification and visitor confirmation.
 * Do not send submitted field values to analytics from this module.
 */
export async function sendContactEmails(
  payload: ContactPayload,
  locale: Locale,
): Promise<{ ok: true } | { ok: false; reason: "missing_key" | "delivery" }> {
  const resend = getResendClient();
  if (!resend) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return { ok: false, reason: "missing_key" };
  }

  const from = getFromAddress();
  const notifyTo = getNotificationEmail();
  const notification = notificationContent(payload, locale);
  const confirmation = confirmationContent(payload, locale);

  const internal = await resend.emails.send({
    from,
    to: notifyTo,
    replyTo: payload.email,
    subject: `New CIVEP enquiry — ${payload.company}`,
    text: notification.text,
    html: notification.html,
  });

  if (internal.error) {
    console.error("[contact] failed to send internal notification", {
      name: internal.error.name,
    });
    return { ok: false, reason: "delivery" };
  }

  const visitor = await resend.emails.send({
    from,
    to: payload.email,
    replyTo: notifyTo,
    subject: confirmation.subject,
    text: confirmation.text,
    html: confirmation.html,
  });

  if (visitor.error) {
    console.error("[contact] failed to send visitor confirmation", {
      name: visitor.error.name,
    });
  }

  return { ok: true };
}
