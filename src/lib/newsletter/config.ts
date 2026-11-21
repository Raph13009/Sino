import { getBlogSheetId } from "@/lib/cms/config";

export const NEWSLETTER_SHEET_TAB = "Newsletter";
export const NEWSLETTER_HEADERS = [
  "email",
  "locale",
  "status",
  "subscribed_at",
  "source",
  "unsub_token",
] as const;

export const NEWSLETTER_WRITE_SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
] as const;

export function getNewsletterSheetId() {
  return getBlogSheetId();
}

export function getNewsletterSheetTab() {
  return (
    process.env.GOOGLE_NEWSLETTER_SHEET_NAME?.trim() || NEWSLETTER_SHEET_TAB
  );
}

export function getBroadcastSecret() {
  return process.env.NEWSLETTER_BROADCAST_SECRET?.trim() || null;
}

export function getSiteOrigin() {
  return "https://www.opopa-partners.com";
}
