const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const DUPLICATE_WINDOW_MS = 2 * 60 * 1000;

type Bucket = {
  count: number;
  resetAt: number;
};

const attempts = new Map<string, Bucket>();
const recentSuccess = new Map<string, number>();
const inFlight = new Set<string>();

function prune(now: number) {
  if (attempts.size > 500) {
    for (const [key, bucket] of attempts) {
      if (now >= bucket.resetAt) attempts.delete(key);
    }
  }
  if (recentSuccess.size > 500) {
    for (const [key, at] of recentSuccess) {
      if (now - at > DUPLICATE_WINDOW_MS) recentSuccess.delete(key);
    }
  }
}

export function allowContactAttempt(ip: string): boolean {
  const now = Date.now();
  prune(now);

  const existing = attempts.get(ip);
  if (!existing || now >= existing.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (existing.count >= MAX_ATTEMPTS) {
    return false;
  }

  existing.count += 1;
  return true;
}

export function wasRecentlySubmitted(key: string): boolean {
  const last = recentSuccess.get(key);
  return Boolean(last && Date.now() - last < DUPLICATE_WINDOW_MS);
}

export function markSubmitted(key: string) {
  recentSuccess.set(key, Date.now());
}

export function beginSubmission(key: string): boolean {
  if (inFlight.has(key)) return false;
  inFlight.add(key);
  return true;
}

export function endSubmission(key: string) {
  inFlight.delete(key);
}

export function getClientIp(headerList: Headers) {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return headerList.get("x-real-ip")?.trim() || "unknown";
}

export function submissionKey(ip: string, email: string) {
  return `${ip}:${email.trim().toLowerCase()}`;
}
