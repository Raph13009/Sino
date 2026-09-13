import { NextResponse } from "next/server";
import { isGoogleFileId } from "@/lib/cms/ids";
import { getCachedDriveImage } from "@/lib/insights/service";
import { shouldNoIndexDeployment } from "@/lib/site";

type RouteContext = {
  params: Promise<{ fileId: string }>;
};

export const revalidate = 86400;

export async function GET(_request: Request, context: RouteContext) {
  const { fileId } = await context.params;
  if (!isGoogleFileId(fileId)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const image = await getCachedDriveImage(fileId);
  if (!image) {
    return new NextResponse("Not found", { status: 404 });
  }

  const headers = new Headers();
  headers.set("Content-Type", image.mimeType);
  headers.set(
    "Cache-Control",
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
  );
  headers.set("Content-Length", String(image.bytes.byteLength));
  if (shouldNoIndexDeployment()) {
    headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return new NextResponse(Buffer.from(image.bytes), { status: 200, headers });
}
