import "server-only";
import { Resend } from "resend";
import {
  getFromAddress,
  getResendApiKey,
} from "@/lib/contact/config";
import type { BroadcastPayload } from "./schema";
import { listActiveSubscribers } from "./sheets";
import { buildInsightBroadcastEmail } from "./template";

const BATCH_PAUSE_MS = 120;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function broadcastInsightToNewsletter(
  payload: BroadcastPayload,
): Promise<{
  ok: true;
  sent: number;
  failed: number;
  skipped: number;
} | {
  ok: false;
  reason: "missing_key" | "sheet" | "empty";
}> {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    console.error("[newsletter] RESEND_API_KEY is not configured");
    return { ok: false, reason: "missing_key" };
  }

  const subscribers = await listActiveSubscribers();
  if (!subscribers) {
    return { ok: false, reason: "sheet" };
  }

  if (subscribers.length === 0) {
    return { ok: false, reason: "empty" };
  }

  const resend = new Resend(apiKey);
  const from = getFromAddress();
  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const subscriber of subscribers) {
    if (!subscriber.unsubToken) {
      skipped += 1;
      continue;
    }

    const content = buildInsightBroadcastEmail(payload, subscriber.unsubToken);
    const result = await resend.emails.send({
      from,
      to: subscriber.email,
      subject: content.subject,
      text: content.text,
      html: content.html,
      headers: {
        "List-Unsubscribe": `<${getSiteUnsubscribeUrl(subscriber.unsubToken)}>`,
      },
    });

    if (result.error) {
      failed += 1;
      console.error("[newsletter] broadcast send failed", {
        name: result.error.name,
      });
    } else {
      sent += 1;
    }

    await sleep(BATCH_PAUSE_MS);
  }

  return { ok: true, sent, failed, skipped };
}

function getSiteUnsubscribeUrl(token: string) {
  return `https://www.opopa-partners.com/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
}
