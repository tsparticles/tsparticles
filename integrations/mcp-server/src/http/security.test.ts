import { describe, it, expect } from "vitest";
import {
  extractBearerToken,
  isInitializeRequest,
  isOriginAllowed,
  isValidAuthToken,
  normalizeOrigin,
  parseSessionIdHeader,
  RateLimiter,
} from "./security.js";

describe("normalizeOrigin", () => {
  it("lowercases and strips path/query from a valid origin", () => {
    expect(normalizeOrigin("http://Localhost:3000/foo?bar=1")).toBe("http://localhost:3000");
  });

  it("rejects non-http(s) protocols", () => {
    expect(normalizeOrigin("ftp://example.com")).toBeUndefined();
  });

  it("rejects origins with embedded credentials", () => {
    expect(normalizeOrigin("http://user:pass@example.com")).toBeUndefined();
  });

  it("returns undefined for unparsable input", () => {
    expect(normalizeOrigin("not a url")).toBeUndefined();
  });
});

describe("parseSessionIdHeader", () => {
  it("returns empty result when header is absent", () => {
    expect(parseSessionIdHeader(undefined)).toEqual({});
  });

  it("accepts a well-formed session id", () => {
    expect(parseSessionIdHeader("abc-123_ABC.def:456")).toEqual({ value: "abc-123_ABC.def:456" });
  });

  it("rejects an empty string", () => {
    expect(parseSessionIdHeader("").error).toBeDefined();
  });

  it("rejects a session id with disallowed characters", () => {
    expect(parseSessionIdHeader("abc/../etc").error).toBeDefined();
  });

  it("rejects a session id over the max length", () => {
    expect(parseSessionIdHeader("a".repeat(129)).error).toBeDefined();
  });

  it("rejects multiple header values", () => {
    expect(parseSessionIdHeader(["a", "b"]).error).toBeDefined();
  });

  it("accepts a single-element array header", () => {
    expect(parseSessionIdHeader(["abc"])).toEqual({ value: "abc" });
  });
});

describe("isInitializeRequest", () => {
  it("returns true for a payload with method: initialize", () => {
    expect(isInitializeRequest({ method: "initialize" })).toBe(true);
  });

  it("returns false for other methods", () => {
    expect(isInitializeRequest({ method: "tools/call" })).toBe(false);
  });

  it("returns false for non-object payloads", () => {
    expect(isInitializeRequest("initialize")).toBe(false);
    expect(isInitializeRequest(null)).toBe(false);
    expect(isInitializeRequest([{ method: "initialize" }])).toBe(false);
  });
});

describe("isOriginAllowed", () => {
  it("allows requests with no Origin header", () => {
    expect(isOriginAllowed(undefined)).toBe(true);
  });

  it("rejects an unparsable Origin header", () => {
    expect(isOriginAllowed("not a url")).toBe(false);
  });

  it("allows localhost by default when no allow-list is configured", () => {
    expect(isOriginAllowed("http://localhost:5173")).toBe(true);
    expect(isOriginAllowed("http://127.0.0.1:5173")).toBe(true);
  });

  it("rejects non-local origins by default", () => {
    expect(isOriginAllowed("https://evil.example.com")).toBe(false);
  });

  it("allows an origin present in the explicit allow-list", () => {
    expect(isOriginAllowed("https://app.example.com", ["https://app.example.com"])).toBe(true);
  });

  it("rejects an origin not present in the explicit allow-list", () => {
    expect(isOriginAllowed("https://other.example.com", ["https://app.example.com"])).toBe(false);
  });
});

describe("extractBearerToken", () => {
  it("extracts the token from a well-formed header", () => {
    expect(extractBearerToken("Bearer abc123")).toBe("abc123");
  });

  it("is case-insensitive on the scheme", () => {
    expect(extractBearerToken("bearer abc123")).toBe("abc123");
  });

  it("returns undefined for a missing header", () => {
    expect(extractBearerToken(undefined)).toBeUndefined();
  });

  it("returns undefined for a malformed header", () => {
    expect(extractBearerToken("Basic abc123")).toBeUndefined();
  });

  it("handles array header values by taking the first entry", () => {
    expect(extractBearerToken(["Bearer abc123", "Bearer other"])).toBe("abc123");
  });
});

describe("isValidAuthToken", () => {
  it("returns true for matching tokens", () => {
    expect(isValidAuthToken("secret-token", "secret-token")).toBe(true);
  });

  it("returns false for non-matching tokens of the same length", () => {
    expect(isValidAuthToken("secret-tokenA", "secret-tokenB")).toBe(false);
  });

  it("returns false for tokens of different lengths", () => {
    expect(isValidAuthToken("short", "much-longer-token")).toBe(false);
  });
});

describe("RateLimiter", () => {
  it("allows requests under the limit", () => {
    const limiter = new RateLimiter(60_000, 3);
    expect(limiter.allow("client-a")).toBe(true);
    expect(limiter.allow("client-a")).toBe(true);
    expect(limiter.allow("client-a")).toBe(true);
  });

  it("blocks requests over the limit within the window", () => {
    const limiter = new RateLimiter(60_000, 2);
    expect(limiter.allow("client-b")).toBe(true);
    expect(limiter.allow("client-b")).toBe(true);
    expect(limiter.allow("client-b")).toBe(false);
  });

  it("tracks separate clients independently", () => {
    const limiter = new RateLimiter(60_000, 1);
    expect(limiter.allow("client-c")).toBe(true);
    expect(limiter.allow("client-d")).toBe(true);
    expect(limiter.allow("client-c")).toBe(false);
  });

  it("resets the window after it elapses", async () => {
    const limiter = new RateLimiter(10, 1);
    expect(limiter.allow("client-e")).toBe(true);
    expect(limiter.allow("client-e")).toBe(false);
    await new Promise(resolve => setTimeout(resolve, 20));
    expect(limiter.allow("client-e")).toBe(true);
  });

  it("sweep() removes stale entries", async () => {
    const limiter = new RateLimiter(10, 1);
    limiter.allow("client-f");
    expect(limiter.size).toBe(1);
    await new Promise(resolve => setTimeout(resolve, 20));
    limiter.sweep();
    expect(limiter.size).toBe(0);
  });
});
