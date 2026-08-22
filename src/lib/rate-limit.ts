import { createHash } from "node:crypto";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * IP rate limiting for /api/ask.
 *
 * The endpoint is backed by a paid API key, so an unprotected version is a
 * direct line from any script to Amol's OpenAI bill. This is the control that
 * has to work before the feature ships.
 *
 * Fails CLOSED in production. If the Upstash env vars are missing, requests
 * are rejected rather than waved through: an unmetered endpoint is a worse
 * outcome than a broken one, and a broken one gets noticed and fixed.
 */

const LIMIT = 10;
const WINDOW = "1 h" as const;

/**
 * Both naming conventions, because which one you get depends on how Redis was
 * provisioned and the difference is silent:
 *
 *   - Installed from the Vercel Marketplace -> KV_REST_API_URL / _TOKEN
 *   - Configured against Upstash directly   -> UPSTASH_REDIS_REST_URL / _TOKEN
 *
 * Reading only one pair means a Marketplace install looks unconfigured, and
 * since this limiter fails closed in production that would take Ask Amol down
 * for everyone with a 503 rather than rate limiting anything.
 */
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const configured = Boolean(url && token);

const limiter = configured
  ? new Ratelimit({
      redis: new Redis({ url: url!, token: token! }),
      limiter: Ratelimit.slidingWindow(LIMIT, WINDOW),
      prefix: "ask-amol",
      analytics: false,
    })
  : null;

/**
 * Client IP from the proxy chain. The leftmost x-forwarded-for entry is the
 * original client; everything after it is infrastructure. Spoofable in
 * principle, but on Vercel the platform rewrites this header, so the leftmost
 * value is the one the edge actually saw.
 */
function clientIp(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || null;
}

/**
 * Rate-limit bucket key. The IP is hashed rather than stored, so Redis never
 * holds a visitor's address in plaintext while still counting them correctly.
 *
 * ASK_RATE_LIMIT_SALT matters: IPv4 has only ~4 billion values, so an unsalted
 * hash is trivially reversible by brute force. Without the salt this still
 * beats plaintext, but set it.
 */
function bucketKey(ip: string): string {
  const salt = process.env.ASK_RATE_LIMIT_SALT ?? "";
  return createHash("sha256").update(`${salt}:${ip}`, "utf8").digest("hex").slice(0, 32);
}

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; reason: "limited"; retryAfterSeconds: number }
  | { ok: false; reason: "unconfigured" };

export async function checkRateLimit(headers: Headers): Promise<RateLimitResult> {
  if (!limiter) {
    // Local development without Upstash provisioned: allow, so the feature is
    // workable offline. Never in production.
    if (process.env.NODE_ENV !== "production") {
      return { ok: true, remaining: LIMIT };
    }
    return { ok: false, reason: "unconfigured" };
  }

  const ip = clientIp(headers);
  if (!ip) {
    // No usable IP in production means no way to meter this caller.
    return process.env.NODE_ENV === "production"
      ? { ok: false, reason: "unconfigured" }
      : { ok: true, remaining: LIMIT };
  }

  const { success, remaining, reset } = await limiter.limit(bucketKey(ip));
  if (success) return { ok: true, remaining };

  return {
    ok: false,
    reason: "limited",
    retryAfterSeconds: Math.max(1, Math.ceil((reset - Date.now()) / 1000)),
  };
}

export const rateLimitConfig = { limit: LIMIT, window: WINDOW, configured } as const;
