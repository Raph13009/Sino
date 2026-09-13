import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import {
  CMS_CACHE_TAG,
  CMS_DOC_CACHE_TAG,
  CMS_IMAGE_CACHE_TAG,
} from "@/lib/cms/config";

export async function POST(request: Request) {
  const secret = process.env.INSIGHTS_REVALIDATE_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ error: "Revalidation is not configured." }, { status: 501 });
  }

  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (token !== secret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  revalidateTag(CMS_CACHE_TAG, "max");
  revalidateTag(CMS_DOC_CACHE_TAG, "max");
  revalidateTag(CMS_IMAGE_CACHE_TAG, "max");
  revalidatePath("/insights");
  revalidatePath("/zh/insights");
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true });
}
