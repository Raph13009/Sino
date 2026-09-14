import "server-only";
import { unstable_cache } from "next/cache";
import sharp from "sharp";
import {
  CMS_IMAGE_CACHE_TAG,
  CMS_IMAGE_REVALIDATE_SECONDS,
  type InsightCoverWidth,
} from "./config";
import { googleFetch } from "./google-auth";
import { cmsError } from "./log";

export type DriveImageOriginal = {
  fileId: string;
  mimeType: string;
  width: number;
  height: number;
  bytes: Uint8Array;
};

export type OptimizedCover = {
  bytes: Uint8Array;
  mimeType: "image/webp" | "image/jpeg";
  width: number;
  height: number;
};

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

async function downloadDriveOriginal(fileId: string): Promise<DriveImageOriginal | null> {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&supportsAllDrives=true`;
  const response = await googleFetch(url, {
    timeoutMs: 20_000,
    revalidate: CMS_IMAGE_REVALIDATE_SECONDS,
    tags: [CMS_IMAGE_CACHE_TAG],
  });
  if (!response) return null;
  if (!response.ok) {
    cmsError(`Drive media returned ${response.status} for ${fileId}`);
    return null;
  }

  const contentType = (response.headers.get("content-type") ?? "").split(";")[0].toLowerCase();
  if (contentType && !ALLOWED_MIME.has(contentType) && !contentType.startsWith("image/")) {
    cmsError(`Drive file ${fileId} is not a supported image (${contentType}).`);
    return null;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength === 0) {
    cmsError(`Drive media was empty for ${fileId}`);
    return null;
  }

  try {
    const meta = await sharp(buffer, { failOn: "none" }).rotate().metadata();
    const mimeType =
      contentType === "image/jpg" || contentType === "image/jpeg"
        ? "image/jpeg"
        : contentType.startsWith("image/")
          ? contentType
          : "image/jpeg";

    return {
      fileId,
      mimeType,
      width: meta.width || 1600,
      height: meta.height || 900,
      bytes: new Uint8Array(buffer),
    };
  } catch (error) {
    cmsError(`Could not parse Drive image ${fileId}`, error);
    return null;
  }
}

export const getCachedDriveOriginal = (fileId: string) =>
  unstable_cache(
    async () => downloadDriveOriginal(fileId),
    ["insights-drive-original", fileId],
    {
      revalidate: CMS_IMAGE_REVALIDATE_SECONDS,
      tags: [CMS_IMAGE_CACHE_TAG],
    },
  )();

async function renderCoverVariant(
  original: DriveImageOriginal,
  maxWidth: number,
  format: "webp" | "jpeg",
): Promise<OptimizedCover> {
  const image = sharp(original.bytes, { failOn: "none" }).rotate();
  const resized = image.resize({
    width: maxWidth,
    withoutEnlargement: true,
  });

  const output =
    format === "webp"
      ? await resized.webp({ quality: 80, effort: 4 }).toBuffer({ resolveWithObject: true })
      : await resized
          .jpeg({ quality: 82, mozjpeg: true })
          .toBuffer({ resolveWithObject: true });

  return {
    bytes: new Uint8Array(output.data),
    mimeType: format === "webp" ? "image/webp" : "image/jpeg",
    width: output.info.width,
    height: output.info.height,
  };
}

export const getOptimizedCover = (
  fileId: string,
  maxWidth: InsightCoverWidth | 1200,
  format: "webp" | "jpeg",
) =>
  unstable_cache(
    async () => {
      const original = await getCachedDriveOriginal(fileId);
      if (!original) return null;
      return renderCoverVariant(original, maxWidth, format);
    },
    ["insights-cover-variant", fileId, String(maxWidth), format],
    {
      revalidate: CMS_IMAGE_REVALIDATE_SECONDS,
      tags: [CMS_IMAGE_CACHE_TAG],
    },
  )();
