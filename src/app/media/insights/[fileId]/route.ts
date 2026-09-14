import { NextResponse } from "next/server";
import {
  OG_COVER_WIDTH,
  type InsightCoverWidth,
} from "@/lib/cms/config";
import { getOptimizedCover } from "@/lib/cms/drive";
import { isGoogleFileId } from "@/lib/cms/ids";
import { pickCoverWidth } from "@/lib/cms/image-variants";
import { shouldNoIndexDeployment } from "@/lib/site";

type RouteContext = {
  params: Promise<{ fileId: string }>;
};

export const revalidate = 2592000;

function cacheHeaders(mimeType: string, length: number) {
  const headers = new Headers();
  headers.set("Content-Type", mimeType);
  headers.set(
    "Cache-Control",
    "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=31536000",
  );
  headers.set("Content-Length", String(length));
  if (shouldNoIndexDeployment()) {
    headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return headers;
}

export async function GET(request: Request, context: RouteContext) {
  const { fileId } = await context.params;
  if (!isGoogleFileId(fileId)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const url = new URL(request.url);
  const requestedWidth = Number(url.searchParams.get("w"));
  const formatParam = url.searchParams.get("fm");
  const hasExplicitWidth = url.searchParams.has("w");

  const format: "webp" | "jpeg" = formatParam === "webp" ? "webp" : "jpeg";
  const width: InsightCoverWidth | 1200 = hasExplicitWidth
    ? pickCoverWidth(requestedWidth)
    : OG_COVER_WIDTH;

  const image = await getOptimizedCover(fileId, width, format);

  if (!image) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(Buffer.from(image.bytes), {
    status: 200,
    headers: cacheHeaders(image.mimeType, image.bytes.byteLength),
  });
}
