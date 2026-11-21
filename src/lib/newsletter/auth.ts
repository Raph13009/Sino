import "server-only";
import { JWT } from "google-auth-library";
import { getGoogleCredentials } from "@/lib/cms/config";
import { NEWSLETTER_WRITE_SCOPES } from "./config";

let jwtClient: JWT | null = null;

export function getNewsletterJwtClient(): JWT | null {
  const creds = getGoogleCredentials();
  if (!creds) return null;

  if (!jwtClient) {
    jwtClient = new JWT({
      email: creds.clientEmail,
      key: creds.privateKey,
      scopes: [...NEWSLETTER_WRITE_SCOPES],
    });
  }

  return jwtClient;
}

export async function getNewsletterAccessToken(): Promise<string | null> {
  const client = getNewsletterJwtClient();
  if (!client) return null;

  try {
    const token = await client.getAccessToken();
    const value =
      typeof token === "string"
        ? token
        : token && "token" in token
          ? token.token
          : null;
    return value || null;
  } catch (error) {
    console.error("[newsletter] failed to obtain Google access token", {
      name: error instanceof Error ? error.name : "Error",
    });
    return null;
  }
}

export async function newsletterFetch(
  url: string,
  init: RequestInit = {},
): Promise<Response | null> {
  const token = await getNewsletterAccessToken();
  if (!token) return null;

  try {
    return await fetch(url, {
      ...init,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
      signal: AbortSignal.timeout(20_000),
    });
  } catch (error) {
    console.error("[newsletter] Google request failed", {
      url,
      name: error instanceof Error ? error.name : "Error",
    });
    return null;
  }
}
