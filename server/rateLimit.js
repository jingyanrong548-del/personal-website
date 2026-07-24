/** Simple sliding-window rate limit (per IP). */

const hits = new Map();

export function rateLimitOk(ip) {
  const limit = Number(process.env.RATE_LIMIT_PER_MIN || 30);
  const windowMs = 60_000;
  const now = Date.now();
  let bucket = hits.get(ip);
  if (!bucket || now - bucket.start > windowMs) {
    bucket = { start: now, count: 0 };
    hits.set(ip, bucket);
  }
  bucket.count += 1;
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (now - v.start > windowMs) hits.delete(k);
    }
  }
  return bucket.count <= limit;
}
