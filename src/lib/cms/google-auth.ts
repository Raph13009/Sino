import "server-only";
import { JWT } from "google-auth-library";
import { cmsError, cmsWarn } from "./log";
import { CMS_CACHE_TAG, getGoogleCredentials, GOOGLE_SCOPES } from "./config";

let jwtClient: JWT | null = null;
let missingCredsWarned = false;

export function getJwtClient(): JWT | null {
  const creds = getGoogleCredentials();
  if (!creds) {
    if (!missingCredsWarned) {
      cmsWarn(
        "Google CMS credentials are missing. Set GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY. Insights will stay empty until they are configured.",
      );
      missingCredsWarned = true;
    }
    return null;
  }

  if (!jwtClient) {
    jwtClient = new JWT({
      email: creds.clientEmail,
      key: creds.privateKey,
      scopes: [...GOOGLE_SCOPES],
    });
  }

  return jwtClient;
}

export async function getGoogleAccessToken(): Promise<string | null> {
  const client = getJwtClient();
  if (!client) return null;

  try {
    const token = await client.getAccessToken();
    const value =
      typeof token === "string" ? token : token && "token" in token ? token.token : null;
    if (!value) {
      cmsError("Google access token was empty.");
      return null;
    }
    return value;
  } catch (error) {
    cmsError("Failed to obtain Google access token.", error);
    return null;
  }
}

export async function googleFetch(
  url: string,
  init: RequestInit & { timeoutMs?: number } = {},
): Promise<Response | null> {
  const token = await getGoogleAccessToken();
  if (!token) return null;

  const { timeoutMs = 10_000, headers, ...rest } = init;
  try {
    const response = await fetch(url, {
      ...rest,
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      signal: AbortSignal.timeout(timeoutMs),
      next: { revalidate: 600, tags: [CMS_CACHE_TAG] },
    } as RequestInit);
    return response;
  } catch (error) {
    cmsError(`Google request failed: ${url}`, error);
    return null;
  }
}
