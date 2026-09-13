const DRIVE_FILE_ID_RE = /^[a-zA-Z0-9_-]{10,}$/;

export function isGoogleFileId(value: string): boolean {
  return DRIVE_FILE_ID_RE.test(value);
}

export function parseGoogleDocId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const docMatch = trimmed.match(
    /docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/,
  );
  if (docMatch?.[1] && isGoogleFileId(docMatch[1])) return docMatch[1];

  const driveMatch = parseGoogleDriveFileId(trimmed);
  return driveMatch;
}

export function parseGoogleDriveFileId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (isGoogleFileId(trimmed)) return trimmed;

  const patterns = [
    /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
    /drive\.google\.com\/open\?[^#]*[?&]?id=([a-zA-Z0-9_-]+)/,
    /drive\.google\.com\/uc\?[^#]*[?&]?id=([a-zA-Z0-9_-]+)/,
    /drive\.google\.com\/thumbnail\?[^#]*[?&]?id=([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1] && isGoogleFileId(match[1])) return match[1];
  }

  return null;
}

export function sanitizeHref(href: string): string | null {
  const value = href.trim();
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:") return url.href;
    if (url.protocol === "mailto:") return url.href;
  } catch {
    return null;
  }
  return null;
}
