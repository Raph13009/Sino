import "server-only";
import { JWT } from "google-auth-library";
import { cmsError, cmsWarn } from "./log";
import {
  CMS_CACHE_TAG,
  CMS_REVALIDATE_SECONDS,
  getGoogleCredentials,
  GOOGLE_SCOPES,
} from "./config";

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
  init: RequestInit & {
    timeoutMs?: number;
    retries?: number;
    revalidate?: number;
    tags?: string[];
  } = {},
): Promise<Response | null> {
  const token = await getGoogleAccessToken();
  if (!token) return null;

  const {
    timeoutMs = 20_000,
    retries = 2,
    revalidate = CMS_REVALIDATE_SECONDS,
    tags = [CMS_CACHE_TAG],
    headers,
    ...rest
  } = init;

  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...rest,
        headers: {
          Authorization: `Bearer ${token}`,
          ...headers,
        },
        signal: AbortSignal.timeout(timeoutMs),
        next: { revalidate, tags },
      } as RequestInit);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
        continue;
      }
    }
  }

  cmsError(`Google request failed: ${url}`, lastError);
  return null;
}
