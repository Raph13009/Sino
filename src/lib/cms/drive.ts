import "server-only";
import { googleFetch } from "./google-auth";
import { cmsError } from "./log";

export type DriveImage = {
  fileId: string;
  mimeType: string;
  width: number;
  height: number;
  bytes: Uint8Array;
};

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

type DriveMeta = {
  mimeType?: string;
  imageMediaMetadata?: { width?: number; height?: number };
};

export async function fetchDriveImageMeta(fileId: string) {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?fields=mimeType,imageMediaMetadata(width,height)&supportsAllDrives=true`;
  const response = await googleFetch(url);
  if (!response) return null;
  if (!response.ok) {
    cmsError(`Drive metadata returned ${response.status} for ${fileId}`);
    return null;
  }
  const data = (await response.json()) as DriveMeta;
  const mimeType = (data.mimeType ?? "").toLowerCase();
  if (!ALLOWED_MIME.has(mimeType)) {
    cmsError(`Drive file ${fileId} is not a supported image (${data.mimeType ?? "unknown"}).`);
    return null;
  }

  return {
    mimeType: mimeType === "image/jpg" ? "image/jpeg" : mimeType,
    width: data.imageMediaMetadata?.width || 1600,
    height: data.imageMediaMetadata?.height || 900,
  };
}

export async function fetchDriveImage(fileId: string): Promise<DriveImage | null> {
  const meta = await fetchDriveImageMeta(fileId);
  if (!meta) return null;

  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&supportsAllDrives=true`;
  const response = await googleFetch(url, { timeoutMs: 20_000 });
  if (!response) return null;
  if (!response.ok) {
    cmsError(`Drive media returned ${response.status} for ${fileId}`);
    return null;
  }

  const buffer = new Uint8Array(await response.arrayBuffer());
  if (buffer.byteLength === 0) {
    cmsError(`Drive media was empty for ${fileId}`);
    return null;
  }

  return {
    fileId,
    mimeType: meta.mimeType,
    width: meta.width,
    height: meta.height,
    bytes: buffer,
  };
}
