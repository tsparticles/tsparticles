import {
  HTTP_HEADERS_TIMEOUT_MS,
  HTTP_KEEP_ALIVE_TIMEOUT_MS,
  HTTP_REQUEST_TIMEOUT_MS,
  MAX_CONCURRENT_HTTP_SESSIONS,
  MAX_REQUEST_BODY_BYTES,
  SESSION_IDLE_TIMEOUT_MS,
  SESSION_SWEEP_INTERVAL_MS,
} from "./constants.js";
import { type Server as HttpServer, type IncomingMessage, type ServerResponse, createServer } from "node:http";
import {
  RateLimiter,
  extractBearerToken,
  isInitializeRequest,
  isOriginAllowed,
  isValidAuthToken,
  parseSessionIdHeader,
} from "./security.js";
import type { SessionEntry, StartHttpServerParams } from "./types.js";

import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { randomUUID } from "node:crypto";

enum HttpStatusCode {
  OK = 200,
  NotFound = 404,
  Unauthorized = 401,
  Forbidden = 403,
  BadRequest = 400,
  TooManyRequests = 429,
  NoContent = 204,
  MethodNotAllowed = 405,
  UnsupportedMediaType = 415,
  PayloadTooLarge = 413,
  ServiceUnavailable = 503,
  InternalServerError = 500,
}

const HTTP_BIND_HOST = "0.0.0.0",
  RATE_LIMIT_RETRY_AFTER_SECONDS = "60",
  FORCE_EXIT_TIMEOUT_MS = 10_000,
  FIRST_HEADER_VALUE_INDEX = 0,
  EXIT_CODE_SUCCESS = 0,
  EXIT_CODE_FAILURE = 1;

class RequestBodyTooLargeError extends Error {
  constructor() {
    super("Request body too large");
    this.name = "RequestBodyTooLargeError";
  }
}

/**
 *
 * @param root0
 * @param root0.port
 * @param root0.allowedOrigins
 * @param root0.authToken
 * @param root0.trustedProxies
 * @param root0.createMcpServer
 */
export async function startHttpServer({
  port,
  allowedOrigins,
  authToken,
  trustedProxies,
  createMcpServer,
}: StartHttpServerParams): Promise<HttpServer> {
  const sessions = new Map<string, SessionEntry>(),
    rateLimiter = new RateLimiter();

  if (!authToken) {
    console.error(
      "WARNING: no auth token configured (--auth-token / MCP_AUTH_TOKEN). " +
        "The /mcp endpoint is unauthenticated — only use this in trusted network " +
        "environments (e.g. behind a firewall) or set an auth token before exposing it publicly.",
    );
  }

  /**
   *
   * @param sessionId
   */
  function touchSession(sessionId: string): void {
    const entry = sessions.get(sessionId);
    if (entry) entry.lastActivity = Date.now();
  }

  /**
   *
   * @param sessionId
   */
  async function closeSession(sessionId: string): Promise<void> {
    const entry = sessions.get(sessionId);
    if (!entry) return;
    sessions.delete(sessionId);
    try {
      await entry.transport.close();
    } catch (err) {
      console.error("Error closing session:", err);
    }
  }

  // Periodically sweep idle sessions so a client that disconnects
  // without a clean DELETE doesn't leak memory indefinitely.
  const sweepInterval = setInterval(() => {
    const now = Date.now();
    for (const [sessionId, entry] of sessions) {
      if (now - entry.lastActivity > SESSION_IDLE_TIMEOUT_MS) {
        void closeSession(sessionId);
      }
    }
    rateLimiter.sweep();
  }, SESSION_SWEEP_INTERVAL_MS);
  sweepInterval.unref();

  /**
   *
   * @param req
   * @param res
   */
  async function handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      // Basic per-IP rate limiting, ahead of auth/origin checks so a
      // flood of requests can't be used to brute-force the auth token
      // or exhaust the session table.  When the request arrives through
      // a trusted reverse proxy the real client IP is read from the
      // first value in the X-Forwarded-For header. The limiter also
      // bounds the /health endpoint, which otherwise would be open to
      // unlimited unauthenticated remote requests.
      let clientIp: string;
      const remoteAddress = req.socket.remoteAddress;
      if (trustedProxies?.length && remoteAddress && trustedProxies.includes(remoteAddress)) {
        const forwardedFor = req.headers["x-forwarded-for"];
        clientIp =
          typeof forwardedFor === "string"
            ? forwardedFor.split(",")[FIRST_HEADER_VALUE_INDEX]?.trim() || remoteAddress
            : remoteAddress;
      } else {
        clientIp = remoteAddress ?? "unknown";
      }
      if (!rateLimiter.allow(clientIp)) {
        res.writeHead(HttpStatusCode.TooManyRequests, {
          "Content-Type": "application/json",
          "Retry-After": RATE_LIMIT_RETRY_AFTER_SECONDS,
        });
        res.end(JSON.stringify({ error: "Too many requests" }));
        return;
      }

      // Health check endpoint
      if (req.method === "GET" && req.url === "/health") {
        res.writeHead(HttpStatusCode.OK, { "Content-Type": "application/json" });
        // Deliberately no version/build info here — an exact version string
        // aids fingerprinting of known-vulnerable releases.
        res.end(JSON.stringify({ status: "ok" }));
        return;
      }

      if (req.url !== "/mcp") {
        res.writeHead(HttpStatusCode.NotFound);
        res.end("Not found");
        return;
      }

      // Optional bearer token auth. When configured, this is the primary
      // access control for the endpoint — the Origin check below only
      // meaningfully applies to browser-originated requests.
      if (authToken) {
        const provided = extractBearerToken(req.headers.authorization);
        if (!provided || !isValidAuthToken(provided, authToken)) {
          res.writeHead(HttpStatusCode.Unauthorized, {
            "Content-Type": "application/json",
            "WWW-Authenticate": "Bearer",
          });
          res.end(JSON.stringify({ error: "Unauthorized" }));
          return;
        }
      }

      // Defend against DNS rebinding: reject browser-originated requests
      // from origins we don't recognize.
      const originHeader = req.headers.origin;
      if (!isOriginAllowed(originHeader, allowedOrigins)) {
        res.writeHead(HttpStatusCode.Forbidden, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Origin not allowed" }));
        return;
      }

      const sessionIdHeader = req.headers["mcp-session-id"],
        { value: sessionId, error: sessionIdError } = parseSessionIdHeader(sessionIdHeader);
      if (sessionIdError) {
        res.writeHead(HttpStatusCode.BadRequest, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: sessionIdError }));
        return;
      }

      // GET is used by clients to open the server->client SSE stream on an
      // existing session.
      if (req.method === "GET") {
        if (!sessionId || !sessions.has(sessionId)) {
          res.writeHead(HttpStatusCode.NotFound, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Session not found" }));
          return;
        }
        touchSession(sessionId);
        const entry = sessions.get(sessionId);
        if (!entry) return;
        await entry.transport.handleRequest(req, res);
        return;
      }

      // DELETE is used by clients to explicitly terminate a session.
      if (req.method === "DELETE") {
        if (!sessionId || !sessions.has(sessionId)) {
          res.writeHead(HttpStatusCode.NotFound, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Session not found" }));
          return;
        }
        await closeSession(sessionId);
        res.writeHead(HttpStatusCode.NoContent);
        res.end();
        return;
      }

      if (req.method !== "POST") {
        res.writeHead(HttpStatusCode.MethodNotAllowed, {
          "Content-Type": "application/json",
          Allow: "GET, POST, DELETE",
        });
        res.end(JSON.stringify({ error: "Method not allowed" }));
        return;
      }

      const contentTypeHeader = req.headers["content-type"],
        contentType = contentTypeHeader?.split(";")[FIRST_HEADER_VALUE_INDEX]?.trim().toLowerCase();

      if (contentType !== "application/json") {
        res.writeHead(HttpStatusCode.UnsupportedMediaType, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Unsupported media type, expected application/json" }));
        return;
      }

      // POST: either an existing session's message, or a new session's
      // initialize request.
      let body: string;
      try {
        body = await new Promise<string>((resolve, reject) => {
          const chunks: Buffer[] = [];
          let receivedBytes = 0,
            tooLarge = false;
          req.on("data", (chunk: Buffer) => {
            receivedBytes += chunk.length;
            if (receivedBytes > MAX_REQUEST_BODY_BYTES) {
              // Keep draining the request (so the connection can be reused
              // or closed cleanly) but stop buffering. The response is only
              // written once the body has been fully read, so the client
              // gets a proper 413 instead of a reset connection.
              tooLarge = true;
              return;
            }
            chunks.push(chunk);
          });
          req.on("end", () => {
            if (tooLarge) {
              reject(new RequestBodyTooLargeError());
              return;
            }
            resolve(Buffer.concat(chunks).toString("utf8"));
          });
          req.on("error", reject);
        });
      } catch (error) {
        if (error instanceof RequestBodyTooLargeError) {
          res.writeHead(HttpStatusCode.PayloadTooLarge, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Request body too large" }));
        }
        // Any other error means the client/connection is gone — there is
        // nobody left to send a response to.
        return;
      }

      let parsedBody: unknown;
      try {
        parsedBody = body ? JSON.parse(body) : undefined;
      } catch {
        res.writeHead(HttpStatusCode.BadRequest, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
        return;
      }

      if (sessionId) {
        const entry = sessions.get(sessionId);
        if (!entry) {
          res.writeHead(HttpStatusCode.NotFound, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Session not found" }));
          return;
        }
        touchSession(sessionId);
        await entry.transport.handleRequest(req, res, parsedBody);
        return;
      }

      if (!isInitializeRequest(parsedBody)) {
        res.writeHead(HttpStatusCode.BadRequest, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing session, expected initialize request" }));
        return;
      }

      if (sessions.size >= MAX_CONCURRENT_HTTP_SESSIONS) {
        res.writeHead(HttpStatusCode.ServiceUnavailable, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Server busy, try again later" }));
        return;
      }

      // No session id: this must be an initialize request. Spin up a
      // brand new Server + Transport pair dedicated to this session so
      // that response routing can never cross sessions.  If setup or
      // request processing fails before onsessioninitialized fires the
      // pair is cleaned up explicitly since it was never registered in
      // the sessions map and would otherwise leak.
      const newServer = createMcpServer(),
        sessionRegistered = { value: false },
        transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: (): string => randomUUID(),
          onsessioninitialized: (newSessionId: string): void => {
            sessionRegistered.value = true;
            sessions.set(newSessionId, { server: newServer, transport, lastActivity: Date.now() });
          },
          onsessionclosed: (closedSessionId: string): void => {
            sessions.delete(closedSessionId);
          },
        });

      try {
        await newServer.connect(transport);
        await transport.handleRequest(req, res, parsedBody);
      } catch (error) {
        if (!sessionRegistered.value) {
          void transport.close().catch(() => undefined);
        }
        throw error;
      }
    } catch (error) {
      console.error("Unhandled HTTP request error:", error);

      if (!res.headersSent) {
        res.writeHead(HttpStatusCode.InternalServerError, { "Content-Type": "application/json" });
      }

      if (!res.writableEnded) {
        res.end(JSON.stringify({ error: "Internal server error" }));
      }
    }
  }

  const httpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
    void handleRequest(req, res);
  });

  httpServer.on("close", () => {
    clearInterval(sweepInterval);
  });

  httpServer.on("clientError", (_error, socket) => {
    if (socket.writable) {
      socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
    }
  });

  httpServer.requestTimeout = HTTP_REQUEST_TIMEOUT_MS;
  httpServer.headersTimeout = HTTP_HEADERS_TIMEOUT_MS;
  httpServer.keepAliveTimeout = HTTP_KEEP_ALIVE_TIMEOUT_MS;

  await new Promise<void>(resolve => {
    httpServer.listen(port, HTTP_BIND_HOST, () => {
      console.error(`tsParticles MCP server running on http://${HTTP_BIND_HOST}:${port}/mcp`);
      console.error(`Health check: http://${HTTP_BIND_HOST}:${port}/health`);
      resolve();
    });
  });

  // Graceful shutdown: close all active sessions and stop accepting new
  // connections on SIGTERM/SIGINT (e.g. `docker stop`, Ctrl+C) instead of
  // dropping in-flight requests and leaking transport resources.
  if (process.env.NODE_ENV !== "test") {
    let shuttingDown = false;
    const shutdown = (signal: NodeJS.Signals): void => {
      if (shuttingDown) return;
      shuttingDown = true;
      console.error(`Received ${signal}, shutting down gracefully...`);

      clearInterval(sweepInterval);

      const closeSessions = Promise.all([...sessions.keys()].map(id => closeSession(id))),
        forceExitTimer = setTimeout(() => {
          console.error("Graceful shutdown timed out, forcing exit.");
          process.exit(EXIT_CODE_FAILURE);
        }, FORCE_EXIT_TIMEOUT_MS);
      forceExitTimer.unref();

      void closeSessions.finally(() => {
        httpServer.close(err => {
          clearTimeout(forceExitTimer);
          if (err) {
            console.error("Error closing HTTP server:", err);
            process.exit(EXIT_CODE_FAILURE);
          }
          process.exit(EXIT_CODE_SUCCESS);
        });
      });
    };

    process.on("SIGTERM", () => {
      shutdown("SIGTERM");
    });
    process.on("SIGINT", () => {
      shutdown("SIGINT");
    });
  }

  return httpServer;
}
