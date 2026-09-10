import { siteConfig } from "@/lib/site";

/**
 * Resend's verified onboarding sender. Use this until opopa-partners.com is verified.
 * After domain verification, set RESEND_FROM_EMAIL=OPOPA <contact@opopa-partners.com>.
 * Do not send from contact@opopa-partners.com until that domain is verified in Resend.
 */
const RESEND_TEST_FROM = "OPOPA <beth.t@example.com>";

export function getResendApiKey() {
  return process.env.RESEND_API_KEY?.trim() || null;
}

export function getNotificationEmail() {
  return (
    process.env.CONTACT_NOTIFICATION_EMAIL?.trim() || siteConfig.email
  );
}

export function getFromAddress() {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  if (!configured) {
    return RESEND_TEST_FROM;
  }

  if (configured.includes("<")) {
    return configured;
  }

  return `OPOPA <${configured}>`;
}
