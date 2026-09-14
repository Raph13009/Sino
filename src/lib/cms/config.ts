export const CMS_REVALIDATE_SECONDS = 180;
export const CMS_IMAGE_REVALIDATE_SECONDS = 2_592_000;
export const CMS_CACHE_TAG = "insights-cms";
export const CMS_DOC_CACHE_TAG = "insights-docs";
export const CMS_IMAGE_CACHE_TAG = "insights-images";

export const INSIGHT_COVER_WIDTHS = [640, 960, 1600] as const;
export type InsightCoverWidth = (typeof INSIGHT_COVER_WIDTHS)[number];
export const DEFAULT_COVER_WIDTH = 1600;
export const OG_COVER_WIDTH = 1200;

export const DEFAULT_BLOG_SHEET_ID =
  "1zTBna6kFxYhJ3TUwLmfNcMjoZ6vzg4oL-QA4w2ZsxX4";
export const DEFAULT_BLOG_SHEET_TAB = "Blog Index";

export const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets.readonly",
  "https://www.googleapis.com/auth/documents.readonly",
  "https://www.googleapis.com/auth/drive.readonly",
] as const;

export function getBlogSheetId() {
  return process.env.GOOGLE_BLOG_SHEET_ID?.trim() || DEFAULT_BLOG_SHEET_ID;
}

export function getBlogSheetTab() {
  return process.env.GOOGLE_BLOG_SHEET_NAME?.trim() || DEFAULT_BLOG_SHEET_TAB;
}

export function getGoogleCredentials() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL?.trim();
  const privateKey = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY);
  const projectId = process.env.GOOGLE_PROJECT_ID?.trim();

  if (!clientEmail || !privateKey) return null;

  return { clientEmail, privateKey, projectId };
}

function normalizePrivateKey(value: string | undefined) {
  if (!value) return "";
  return value
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\\n/g, "\n");
}

export function isCmsConfigured() {
  return getGoogleCredentials() !== null;
}
