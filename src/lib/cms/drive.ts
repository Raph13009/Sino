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

type CachedOriginal = {
  fileId: string;
  mimeType: string;
  width: number;
  height: number;
  base64: string;
};

type CachedVariant = {
  base64: string;
  mimeType: "image/webp" | "image/jpeg";
  width: number;
  height: number;
};

export type OptimizedCover = {
  bytes: Buffer;
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

async function downloadDriveOriginal(fileId: string): Promise<CachedOriginal> {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&supportsAllDrives=true`;
  const response = await googleFetch(url, {
    timeoutMs: 20_000,
    revalidate: CMS_IMAGE_REVALIDATE_SECONDS,
    tags: [CMS_IMAGE_CACHE_TAG],
  });
  // Throw on failure so unstable_cache does not store a 30-day null miss
  // (e.g. before the service account could read a newly shared file).
  if (!response) {
    throw new Error(`Drive media fetch unavailable for ${fileId}`);
  }
  if (!response.ok) {
    throw new Error(`Drive media returned ${response.status} for ${fileId}`);
  }

  const contentType = (response.headers.get("content-type") ?? "").split(";")[0].toLowerCase();
  if (contentType && !ALLOWED_MIME.has(contentType) && !contentType.startsWith("image/")) {
    throw new Error(`Drive file ${fileId} is not a supported image (${contentType}).`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength === 0) {
    throw new Error(`Drive media was empty for ${fileId}`);
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
      base64: buffer.toString("base64"),
    };
  } catch (error) {
    cmsError(`Could not parse Drive image ${fileId}`, error);
    throw error instanceof Error ? error : new Error(`Could not parse Drive image ${fileId}`);
  }
}

const getCachedDriveOriginal = (fileId: string) =>
  unstable_cache(
    async () => downloadDriveOriginal(fileId),
    ["insights-drive-original-v3", fileId],
    {
      revalidate: CMS_IMAGE_REVALIDATE_SECONDS,
      tags: [CMS_IMAGE_CACHE_TAG],
    },
  )();
async function renderCoverVariant(
  original: CachedOriginal,
  maxWidth: number,
  format: "webp" | "jpeg",
): Promise<CachedVariant> {
  const image = sharp(Buffer.from(original.base64, "base64"), { failOn: "none" }).rotate();
  const resized = image.resize({
    width: maxWidth,
    withoutEnlargement: true,
  });

  const output =
    format === "webp"
      ? await resized.webp({ quality: 80, effort: 4 }).toBuffer({ resolveWithObject: true })
      : await resized.jpeg({ quality: 82, mozjpeg: true }).toBuffer({ resolveWithObject: true });

  return {
    base64: output.data.toString("base64"),
    mimeType: format === "webp" ? "image/webp" : "image/jpeg",
    width: output.info.width,
    height: output.info.height,
  };
}

export async function getOptimizedCover(
  fileId: string,
  maxWidth: InsightCoverWidth | 1200,
  format: "webp" | "jpeg",
): Promise<OptimizedCover | null> {
  try {
    const cached = await unstable_cache(
      async () => {
        const original = await getCachedDriveOriginal(fileId);
        return renderCoverVariant(original, maxWidth, format);
      },
      ["insights-cover-variant-v3", fileId, String(maxWidth), format],
      {
        revalidate: CMS_IMAGE_REVALIDATE_SECONDS,
        tags: [CMS_IMAGE_CACHE_TAG],
      },
    )();

    return {
      bytes: Buffer.from(cached.base64, "base64"),
      mimeType: cached.mimeType,
      width: cached.width,
      height: cached.height,
    };
  } catch (error) {
    cmsError(`Cover optimization failed for ${fileId}`, error);
    return null;
  }
}
