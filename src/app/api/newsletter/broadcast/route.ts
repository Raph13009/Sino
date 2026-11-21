import { NextResponse } from "next/server";
import { broadcastInsightToNewsletter } from "@/lib/newsletter/broadcast";
import { getBroadcastSecret } from "@/lib/newsletter/config";
import { parseBroadcastPayload } from "@/lib/newsletter/schema";

export async function POST(request: Request) {
  const secret = getBroadcastSecret();
  if (!secret) {
    return NextResponse.json(
      { error: "Newsletter broadcast is not configured." },
      { status: 501 },
    );
  }

  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (token !== secret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const payload = parseBroadcastPayload(body);
  if (!payload) {
    return NextResponse.json(
      {
        error:
          "Invalid payload. Required: enTitle, enUrl, zhUrl, publishedAt.",
      },
      { status: 400 },
    );
  }

  const result = await broadcastInsightToNewsletter(payload);
  if (!result.ok) {
    if (result.reason === "empty") {
      return NextResponse.json({
        ok: true,
        sent: 0,
        failed: 0,
        skipped: 0,
        note: "No active subscribers.",
      });
    }
    const status = result.reason === "missing_key" ? 501 : 502;
    return NextResponse.json({ error: result.reason }, { status });
  }

  return NextResponse.json(result);
}
