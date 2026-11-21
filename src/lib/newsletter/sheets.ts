import "server-only";
import { rowsFromValues, type SheetRow } from "@/lib/cms/sheets";
import { newsletterFetch } from "./auth";
import {
  NEWSLETTER_HEADERS,
  getNewsletterSheetId,
  getNewsletterSheetTab,
} from "./config";

export type NewsletterSubscriber = {
  email: string;
  locale: string;
  status: string;
  subscribedAt: string;
  source: string;
  unsubToken: string;
  rowNumber: number;
};

function sheetRange(range: string) {
  const sheetId = getNewsletterSheetId();
  const tab = getNewsletterSheetTab();
  const encoded = encodeURIComponent(`${tab}!${range}`);
  return `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encoded}`;
}

async function fetchRawValues(): Promise<string[][] | null> {
  const url = `${sheetRange("A:F")}?valueRenderOption=FORMATTED_VALUE`;
  const response = await newsletterFetch(url);
  if (!response) return null;

  if (response.status === 400) {
    const body = await response.text();
    if (/Unable to parse range|Unable to parse sheet/i.test(body)) {
      return [];
    }
    console.error("[newsletter] sheets read failed", {
      status: response.status,
    });
    return null;
  }

  if (!response.ok) {
    console.error("[newsletter] sheets read failed", {
      status: response.status,
    });
    return null;
  }

  const data = (await response.json()) as { values?: string[][] };
  return data.values ?? [];
}

async function ensureSheetWithHeaders(): Promise<boolean> {
  const sheetId = getNewsletterSheetId();
  const tab = getNewsletterSheetTab();
  const metaUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets.properties`;
  const meta = await newsletterFetch(metaUrl);
  if (!meta?.ok) {
    console.error("[newsletter] cannot read spreadsheet metadata", {
      status: meta?.status,
    });
    return false;
  }

  const metaJson = (await meta.json()) as {
    sheets?: { properties?: { title?: string; sheetId?: number } }[];
  };
  const exists = (metaJson.sheets ?? []).some(
    (sheet) => sheet.properties?.title === tab,
  );

  if (!exists) {
    const create = await newsletterFetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`,
      {
        method: "POST",
        body: JSON.stringify({
          requests: [{ addSheet: { properties: { title: tab } } }],
        }),
      },
    );
    if (!create?.ok) {
      console.error("[newsletter] failed to create sheet tab", {
        status: create?.status,
      });
      return false;
    }
  }

  const values = await fetchRawValues();
  if (values === null) return false;
  if (values.length > 0) return true;

  const headerWrite = await newsletterFetch(`${sheetRange("A1:F1")}?valueInputOption=RAW`, {
    method: "PUT",
    body: JSON.stringify({ values: [[...NEWSLETTER_HEADERS]] }),
  });

  if (!headerWrite?.ok) {
    console.error("[newsletter] failed to write headers", {
      status: headerWrite?.status,
    });
    return false;
  }

  return true;
}

function toSubscriber(row: SheetRow, rowNumber: number): NewsletterSubscriber {
  return {
    email: (row.email ?? "").trim().toLowerCase(),
    locale: (row.locale ?? "en").trim() || "en",
    status: (row.status ?? "").trim().toLowerCase() || "active",
    subscribedAt: (row.subscribed_at ?? "").trim(),
    source: (row.source ?? "").trim(),
    unsubToken: (row.unsub_token ?? "").trim(),
    rowNumber,
  };
}

export async function listNewsletterRows(): Promise<NewsletterSubscriber[] | null> {
  const ready = await ensureSheetWithHeaders();
  if (!ready) return null;

  const values = await fetchRawValues();
  if (values === null) return null;

  const rows = rowsFromValues(values);
  return rows.map((row, index) => toSubscriber(row, index + 2));
}

export async function listActiveSubscribers(): Promise<NewsletterSubscriber[] | null> {
  const rows = await listNewsletterRows();
  if (!rows) return null;
  return rows.filter(
    (row) => row.status === "active" && row.email.includes("@") && row.unsubToken,
  );
}

export async function findSubscriberByEmail(
  email: string,
): Promise<
  | { ok: true; subscriber: NewsletterSubscriber | null }
  | { ok: false }
> {
  const rows = await listNewsletterRows();
  if (!rows) return { ok: false };
  const normalized = email.trim().toLowerCase();
  return {
    ok: true,
    subscriber: rows.find((row) => row.email === normalized) ?? null,
  };
}

export async function findSubscriberByToken(
  token: string,
): Promise<
  | { ok: true; subscriber: NewsletterSubscriber | null }
  | { ok: false }
> {
  const rows = await listNewsletterRows();
  if (!rows) return { ok: false };
  const normalized = token.trim();
  if (!normalized) return { ok: false };
  return {
    ok: true,
    subscriber: rows.find((row) => row.unsubToken === normalized) ?? null,
  };
}

export async function appendSubscriber(input: {
  email: string;
  locale: string;
  source: string;
  unsubToken: string;
}): Promise<{ ok: true } | { ok: false; reason: "sheet" | "write" }> {
  const ready = await ensureSheetWithHeaders();
  if (!ready) return { ok: false, reason: "sheet" };

  const today = new Date().toISOString().slice(0, 10);
  const sheetId = getNewsletterSheetId();
  const tab = getNewsletterSheetTab();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(`${tab}!A:F`)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const response = await newsletterFetch(url, {
    method: "POST",
    body: JSON.stringify({
      values: [
        [
          input.email.trim().toLowerCase(),
          input.locale,
          "active",
          today,
          input.source,
          input.unsubToken,
        ],
      ],
    }),
  });

  if (!response?.ok) {
    console.error("[newsletter] append failed", { status: response?.status });
    return { ok: false, reason: "write" };
  }

  return { ok: true };
}

export async function updateSubscriberStatus(
  rowNumber: number,
  status: "active" | "unsubscribed",
): Promise<boolean> {
  const url = `${sheetRange(`C${rowNumber}`)}?valueInputOption=RAW`;
  const response = await newsletterFetch(url, {
    method: "PUT",
    body: JSON.stringify({ values: [[status]] }),
  });
  if (!response?.ok) {
    console.error("[newsletter] status update failed", {
      status: response?.status,
      rowNumber,
    });
    return false;
  }
  return true;
}

export async function reactivateSubscriber(
  rowNumber: number,
  locale: string,
  unsubToken: string,
): Promise<boolean> {
  const today = new Date().toISOString().slice(0, 10);
  const url = `${sheetRange(`B${rowNumber}:F${rowNumber}`)}?valueInputOption=RAW`;
  const response = await newsletterFetch(url, {
    method: "PUT",
    body: JSON.stringify({
      values: [[locale, "active", today, "footer", unsubToken]],
    }),
  });
  if (!response?.ok) {
    console.error("[newsletter] reactivate failed", {
      status: response?.status,
      rowNumber,
    });
    return false;
  }
  return true;
}
