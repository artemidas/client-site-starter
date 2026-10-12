type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const HOUR_MS = 60 * 60 * 1000;

export function checkRateLimit(key: string, limit: number): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt < now) {
    const next: Bucket = { count: 1, resetAt: now + HOUR_MS };
    buckets.set(key, next);
    return { ok: true, remaining: limit - 1, resetAt: next.resetAt };
  }
  existing.count += 1;
  const ok = existing.count <= limit;
  return { ok, remaining: Math.max(0, limit - existing.count), resetAt: existing.resetAt };
}

export function clientKeyFromRequest(req: { headers: Record<string, string | string[] | undefined> }): string {
  const xff = req.headers["x-forwarded-for"];
  const ip = (Array.isArray(xff) ? xff[0] : xff)?.split(",")[0]?.trim() || "unknown";
  return `ip:${ip}`;
}
