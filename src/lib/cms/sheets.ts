import "server-only";
import { getBlogSheetId, getBlogSheetTab } from "./config";
import { googleFetch } from "./google-auth";
import { cmsError } from "./log";

export type SheetRow = Record<string, string>;

function normalizeHeader(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "_");
}

export function rowsFromValues(values: string[][]): SheetRow[] {
  if (values.length < 2) return [];
  const headers = values[0].map(normalizeHeader);
  const rows: SheetRow[] = [];

  for (let i = 1; i < values.length; i += 1) {
    const raw = values[i] ?? [];
    if (raw.every((cell) => !String(cell ?? "").trim())) continue;
    const row: SheetRow = {};
    headers.forEach((header, index) => {
      if (!header) return;
      row[header] = String(raw[index] ?? "").trim();
    });
    rows.push(row);
  }

  return rows;
}

export async function fetchBlogIndexRows(): Promise<SheetRow[]> {
  const sheetId = getBlogSheetId();
  const range = encodeURIComponent(`${getBlogSheetTab()}!A:Z`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?valueRenderOption=FORMATTED_VALUE`;

  const response = await googleFetch(url);
  if (!response) return [];
  if (!response.ok) {
    cmsError(`Sheets API returned ${response.status} for ${sheetId}`);
    return [];
  }

  const data = (await response.json()) as { values?: string[][] };
  return rowsFromValues(data.values ?? []);
}
