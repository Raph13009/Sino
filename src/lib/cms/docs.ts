import "server-only";
import { parseGoogleDoc, type GoogleDocsDocument } from "./docs-parser";
import type { ParsedDoc } from "./docs-ast";
import { googleFetch } from "./google-auth";
import { cmsError } from "./log";

export async function fetchGoogleDoc(documentId: string): Promise<ParsedDoc | null> {
  const url = `https://docs.googleapis.com/v1/documents/${documentId}`;
  const response = await googleFetch(url, { timeoutMs: 12_000 });
  if (!response) return null;
  if (!response.ok) {
    cmsError(`Docs API returned ${response.status} for document ${documentId}`);
    return null;
  }

  const data = (await response.json()) as GoogleDocsDocument;
  return parseGoogleDoc(data);
}
