export const MAX_REQUEST_BODY_BYTES = 1024 * 1024; // 1 MB
export const SESSION_IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
export const SESSION_SWEEP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
export const MAX_CONCURRENT_HTTP_SESSIONS = 500;

export const HTTP_REQUEST_TIMEOUT_MS = 30_000;
export const HTTP_HEADERS_TIMEOUT_MS = 15_000;
export const HTTP_KEEP_ALIVE_TIMEOUT_MS = 5_000;

export const MAX_SESSION_ID_LENGTH = 128;
export const SESSION_ID_PATTERN = /^[A-Za-z0-9._:-]+$/;

// Simple in-memory per-IP token-bucket rate limiting. This does not
// replace a real edge/reverse-proxy rate limiter for internet-facing
// deployments, but it stops a single misbehaving client from
// monopolizing the server when no such proxy is in front of it.
export const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
export const RATE_LIMIT_MAX_REQUESTS_PER_WINDOW = 120;
