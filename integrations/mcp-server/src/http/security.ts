import { MAX_SESSION_ID_LENGTH, RATE_LIMIT_MAX_REQUESTS_PER_WINDOW, RATE_LIMIT_WINDOW_MS, SESSION_ID_PATTERN } from "./constants.js";
import { timingSafeEqual } from "node:crypto";

export function normalizeOrigin(origin: string): string | undefined {
  try {
    const parsed = new URL(origin);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return undefined;
    }

    if (parsed.username || parsed.password) {
      return undefined;
    }

    return parsed.origin.toLowerCase();
  } catch {
    return undefined;
  }
}

export function parseSessionIdHeader(header: string | string[] | undefined): { value?: string; error?: string } {
  if (Array.isArray(header)) {
    if (header.length !== 1) {
      return { error: "Invalid mcp-session-id header" };
    }

    return parseSessionIdHeader(header[0]);
  }

  if (header === undefined) {
    return {};
  }

  const sessionId = header.trim();

  if (sessionId.length === 0) {
    return { error: "Invalid mcp-session-id header" };
  }

  if (sessionId.length > MAX_SESSION_ID_LENGTH || !SESSION_ID_PATTERN.test(sessionId)) {
    return { error: "Invalid mcp-session-id header" };
  }

  return { value: sessionId };
}

export function isInitializeRequest(payload: unknown): boolean {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return false;
  }

  const method = (payload as { method?: unknown }).method;

  return method === "initialize";
}

export function isOriginAllowed(origin: string | undefined, allowedOrigins?: string[]): boolean {
  // No Origin header at all (e.g. non-browser clients, curl) is allowed —
  // the Origin check exists to defend against DNS-rebinding attacks from
  // browser contexts, which always send this header.
  if (!origin) return true;

  const normalizedOrigin = normalizeOrigin(origin);
  if (!normalizedOrigin) {
    return false;
  }

  if (allowedOrigins && allowedOrigins.length > 0) {
    return allowedOrigins.includes(normalizedOrigin);
  }

  // Default: only allow local origins when no explicit allow-list is
  // configured, since the server binds to 0.0.0.0 with no auth.
  try {
    const { hostname } = new URL(normalizedOrigin);
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1" || hostname === "[::1]";
  } catch {
    return false;
  }
}

/**
 * Constant-time comparison of a bearer token supplied on an incoming
 * request against the configured expected token. Using a plain `===`
 * here would leak timing information proportional to the number of
 * matching leading characters, allowing a remote attacker to recover
 * the token byte-by-byte; `timingSafeEqual` avoids that class of
 * side-channel. Returns `false` (rather than throwing) whenever the
 * lengths differ, since `timingSafeEqual` requires equal-length buffers.
 */
export function isValidAuthToken(provided: string, expected: string): boolean {
  const providedBuf = Buffer.from(provided, "utf8");
  const expectedBuf = Buffer.from(expected, "utf8");

  if (providedBuf.length !== expectedBuf.length) {
    return false;
  }

  return timingSafeEqual(providedBuf, expectedBuf);
}

/**
 * Extracts the bearer token from an `Authorization` header value, or
 * `undefined` if the header is missing/malformed.
 */
export function extractBearerToken(header: string | string[] | undefined): string | undefined {
  const value = Array.isArray(header) ? header[0] : header;
  if (!value) return undefined;

  const match = /^Bearer\s+(.+)$/i.exec(value.trim());
  return match ? match[1] : undefined;
}

/**
 * Minimal in-memory fixed-window rate limiter keyed by client IP. Not a
 * substitute for a proper edge rate limiter (it resets per-process and
 * doesn't account for proxies unless `trust proxy`-style forwarding is
 * handled by the caller), but it bounds the request rate a single
 * client can sustain against this process.
 */
export class RateLimiter {
  private readonly hits = new Map<string, { count: number; windowStart: number }>();

  constructor(
    private readonly windowMs: number = RATE_LIMIT_WINDOW_MS,
    private readonly maxRequests: number = RATE_LIMIT_MAX_REQUESTS_PER_WINDOW,
  ) {}

  /** Returns true if the request should be allowed, false if rate-limited. */
  allow(key: string): boolean {
    const now = Date.now();
    const entry = this.hits.get(key);

    if (!entry || now - entry.windowStart >= this.windowMs) {
      this.hits.set(key, { count: 1, windowStart: now });
      return true;
    }

    if (entry.count >= this.maxRequests) {
      return false;
    }

    entry.count++;
    return true;
  }

  /** Drops stale entries so the map doesn't grow unbounded over time. */
  sweep(): void {
    const now = Date.now();
    for (const [key, entry] of this.hits) {
      if (now - entry.windowStart >= this.windowMs) {
        this.hits.delete(key);
      }
    }
  }

  get size(): number {
    return this.hits.size;
  }
}
