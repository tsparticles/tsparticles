import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

import {
  HTTP_HEADERS_TIMEOUT_MS,
  HTTP_KEEP_ALIVE_TIMEOUT_MS,
  HTTP_REQUEST_TIMEOUT_MS,
  MAX_CONCURRENT_HTTP_SESSIONS,
  MAX_REQUEST_BODY_BYTES,
  SESSION_IDLE_TIMEOUT_MS,
  SESSION_SWEEP_INTERVAL_MS,
} from "./constants.js";
import {
  extractBearerToken,
  isInitializeRequest,
  isOriginAllowed,
  isValidAuthToken,
  parseSessionIdHeader,
  RateLimiter,
} from "./security.js";
import type { SessionEntry, StartHttpServerParams } from "./types.js";

export async function startHttpServer({
  port,
  allowedOrigins,
  authToken,
  packageVersion,
  createMcpServer,
}: StartHttpServerParams): Promise<void> {
  const sessions = new Map<string, SessionEntry>();
  const rateLimiter = new RateLimiter();

  if (!authToken) {
    console.error(
      "WARNING: no auth token configured (--auth-token / MCP_AUTH_TOKEN). " +
        "The /mcp endpoint is unauthenticated — only use this in trusted network " +
        "environments (e.g. behind a firewall) or set an auth token before exposing it publicly.",
    );
  }

  function touchSession(sessionId: string) {
    const entry = sessions.get(sessionId);
    if (entry) entry.lastActivity = Date.now();
  }

  async function closeSession(sessionId: string) {
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

  const httpServer = createServer(async (req, res) => {
    try {
      // Health check endpoint
      if (req.method === "GET" && req.url === "/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "ok", version: packageVersion }));
        return;
      }

      if (req.url !== "/mcp") {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      // Basic per-IP rate limiting, ahead of auth/origin checks so a
      // flood of requests can't be used to brute-force the auth token
      // or exhaust the session table.
      const clientIp = req.socket.remoteAddress ?? "unknown";
      if (!rateLimiter.allow(clientIp)) {
        res.writeHead(429, { "Content-Type": "application/json", "Retry-After": "60" });
        res.end(JSON.stringify({ error: "Too many requests" }));
        return;
      }

      // Optional bearer token auth. When configured, this is the primary
      // access control for the endpoint — the Origin check below only
      // meaningfully applies to browser-originated requests.
      if (authToken) {
        const provided = extractBearerToken(req.headers.authorization);
        if (!provided || !isValidAuthToken(provided, authToken)) {
          res.writeHead(401, { "Content-Type": "application/json", "WWW-Authenticate": "Bearer" });
          res.end(JSON.stringify({ error: "Unauthorized" }));
          return;
        }
      }

      // Defend against DNS rebinding: reject browser-originated requests
      // from origins we don't recognize.
      const originHeader = req.headers.origin;
      if (!isOriginAllowed(originHeader, allowedOrigins)) {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Origin not allowed" }));
        return;
      }

      const sessionIdHeader = req.headers["mcp-session-id"];
      const { value: sessionId, error: sessionIdError } = parseSessionIdHeader(sessionIdHeader);
      if (sessionIdError) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: sessionIdError }));
        return;
      }

      // GET is used by clients to open the server->client SSE stream on an
      // existing session.
      if (req.method === "GET") {
        if (!sessionId || !sessions.has(sessionId)) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Session not found" }));
          return;
        }
        touchSession(sessionId);
        await sessions.get(sessionId)!.transport.handleRequest(req, res);
        return;
      }

      // DELETE is used by clients to explicitly terminate a session.
      if (req.method === "DELETE") {
        if (!sessionId || !sessions.has(sessionId)) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Session not found" }));
          return;
        }
        await closeSession(sessionId);
        res.writeHead(204);
        res.end();
        return;
      }

      if (req.method !== "POST") {
        res.writeHead(405, { "Content-Type": "application/json", Allow: "GET, POST, DELETE" });
        res.end(JSON.stringify({ error: "Method not allowed" }));
        return;
      }

      const contentTypeHeader = req.headers["content-type"];
      const contentType = (Array.isArray(contentTypeHeader) ? contentTypeHeader[0] : contentTypeHeader)
        ?.split(";")[0]
        ?.trim()
        .toLowerCase();

      if (contentType !== "application/json") {
        res.writeHead(415, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Unsupported media type, expected application/json" }));
        return;
      }

      // POST: either an existing session's message, or a new session's
      // initialize request.
      let body: string;
      try {
        body = await new Promise<string>((resolve, reject) => {
          const chunks: Buffer[] = [];
          let receivedBytes = 0;
          req.on("data", (chunk: Buffer) => {
            receivedBytes += chunk.length;
            if (receivedBytes > MAX_REQUEST_BODY_BYTES) {
              req.destroy(new Error("Request body too large"));
              return;
            }
            chunks.push(chunk);
          });
          req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
          req.on("error", reject);
        });
      } catch {
        res.writeHead(413, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Request body too large" }));
        return;
      }

      let parsedBody: unknown;
      try {
        parsedBody = body ? JSON.parse(body) : undefined;
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
        return;
      }

      if (sessionId) {
        const entry = sessions.get(sessionId);
        if (!entry) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Session not found" }));
          return;
        }
        touchSession(sessionId);
        await entry.transport.handleRequest(req, res, parsedBody);
        return;
      }

      if (!isInitializeRequest(parsedBody)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing session, expected initialize request" }));
        return;
      }

      if (sessions.size >= MAX_CONCURRENT_HTTP_SESSIONS) {
        res.writeHead(503, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Server busy, try again later" }));
        return;
      }

      // No session id: this must be an initialize request. Spin up a
      // brand new Server + Transport pair dedicated to this session so
      // that response routing can never cross sessions.
      const newServer = createMcpServer();
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (newSessionId: string) => {
          sessions.set(newSessionId, { server: newServer, transport, lastActivity: Date.now() });
        },
        onsessionclosed: (closedSessionId: string) => {
          sessions.delete(closedSessionId);
        },
      });

      await newServer.connect(transport);
      await transport.handleRequest(req, res, parsedBody);
    } catch (error) {
      console.error("Unhandled HTTP request error:", error);

      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
      }

      if (!res.writableEnded) {
        res.end(JSON.stringify({ error: "Internal server error" }));
      }
    }
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

  httpServer.listen(port, "0.0.0.0", () => {
    console.error(`tsParticles MCP server running on http://0.0.0.0:${port}/mcp`);
    console.error(`Health check: http://0.0.0.0:${port}/health`);
  });

  // Graceful shutdown: close all active sessions and stop accepting new
  // connections on SIGTERM/SIGINT (e.g. `docker stop`, Ctrl+C) instead of
  // dropping in-flight requests and leaking transport resources.
  let shuttingDown = false;
  const shutdown = (signal: NodeJS.Signals) => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.error(`Received ${signal}, shutting down gracefully...`);

    clearInterval(sweepInterval);

    const closeSessions = Promise.all([...sessions.keys()].map(id => closeSession(id)));

    const forceExitTimer = setTimeout(() => {
      console.error("Graceful shutdown timed out, forcing exit.");
      process.exit(1);
    }, 10_000);
    forceExitTimer.unref();

    void closeSessions.finally(() => {
      httpServer.close(err => {
        clearTimeout(forceExitTimer);
        if (err) {
          console.error("Error closing HTTP server:", err);
          process.exit(1);
        }
        process.exit(0);
      });
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}
