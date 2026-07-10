#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { suggestPlugins } from "./tools/suggestPlugins.js";
import { listPackages } from "./tools/listPackages.js";
import { getPackageInfo } from "./tools/getPackageInfo.js";
import { getPackageCatalogResource } from "./resources/packageCatalog.js";
import { getOptionsGuideResource } from "./resources/optionsGuide.js";
import { getBundlesGuideResource } from "./resources/bundlesGuide.js";
import { generateOptionsPrompt, generateOptionsSystemText } from "./prompts/generateOptions.js";
import { diagnoseIssues } from "./tools/diagnoseIssues.js";

import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

const PACKAGE_VERSION = "0.1.0";
const MAX_REQUEST_BODY_BYTES = 1024 * 1024; // 1 MB
const SESSION_IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const SESSION_SWEEP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

// ── CLI args ───────────────────────────────────────────────────────

interface ParsedArgs {
  mode: "stdio" | "http";
  port?: number;
  allowedOrigins?: string[];
}

function parseArgs(): ParsedArgs {
  const args = process.argv.slice(2);
  const result: ParsedArgs = { mode: "stdio" };
  let rawPort: string | undefined;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--stdio") {
      result.mode = "stdio";
    } else if (args[i] === "--port" && i + 1 < args.length) {
      result.mode = "http";
      rawPort = args[++i];
    } else if (args[i].startsWith("--port=")) {
      result.mode = "http";
      rawPort = args[i].split("=")[1];
    } else if (args[i] === "--allowed-origin" && i + 1 < args.length) {
      result.allowedOrigins = (result.allowedOrigins ?? []).concat(args[++i]);
    }
  }

  if (result.mode === "http") {
    const port = rawPort !== undefined ? Number(rawPort) : NaN;
    if (!Number.isInteger(port) || port <= 0 || port > 65535) {
      console.error(
        `Invalid --port value: ${rawPort ?? "(missing)"}. Expected an integer between 1 and 65535.`,
      );
      process.exit(1);
    }
    result.port = port;
  }

  return result;
}

// ── Resources (shared, read-only content — safe to share across sessions) ──

const RESOURCES = [
  {
    uri: "tsparticles://packages",
    name: "Complete tsParticles Package Catalog",
    description:
      "Every tsParticles package organized by category with descriptions, load functions, and bundle inclusion info",
    mimeType: "text/markdown",
    getText: getPackageCatalogResource,
  },
  {
    uri: "tsparticles://options/guide",
    name: "tsParticles Options Guide",
    description:
      "Complete structural guide to tsParticles options with tables, defaults, and examples",
    mimeType: "text/markdown",
    getText: getOptionsGuideResource,
  },
  {
    uri: "tsparticles://bundles",
    name: "tsParticles Bundle Guide",
    description:
      "Guide to all tsParticles bundles with hierarchy, selection advice, and usage examples",
    mimeType: "text/markdown",
    getText: getBundlesGuideResource,
  },
];

// ── Server factory ─────────────────────────────────────────────────
//
// IMPORTANT: each transport (stdio, or each individual HTTP session) gets
// its OWN Server instance. The MCP SDK's Server binds a single transport
// per instance internally, and swapping that binding at runtime (as the
// previous implementation did via a private `_transport` field) is not
// safe: request handlers are async and may resolve after the field has
// already been reassigned to another session's transport, causing
// responses to be delivered to the wrong client or dropped entirely.
// Creating one lightweight Server per session avoids that class of bug
// at the cost of a small amount of extra memory per connection.

function createMcpServer(): Server {
  const server = new Server(
    {
      name: "@tsparticles/mcp-server",
      version: PACKAGE_VERSION,
    },
    {
      capabilities: {
        tools: {},
        resources: {},
        prompts: {},
      },
    },
  );

  // ── Tools ──────────────────────────────────────────────────────

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "suggest_plugins",
          description:
            "Given a tsParticles options object, suggests the npm packages and imports required to use those options. Detects which plugins, interactions, updaters, and shapes are needed.",
          inputSchema: {
            type: "object",
            properties: {
              options: {
                type: "object",
                description: "The tsParticles options object (ISourceOptions)",
              },
            },
            required: ["options"],
          },
        },
        {
          name: "list_packages",
          description:
            "List all available tsParticles packages, optionally filtered by category or search query. Categories: bundle, plugin, interaction-external, interaction-particles, interaction-light, updater, shape, effect, path, emitter-shape, color, easing, preset.",
          inputSchema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description: "Filter by category (optional)",
                enum: [
                  "bundle",
                  "plugin",
                  "interaction-external",
                  "interaction-particles",
                  "updater",
                  "shape",
                  "effect",
                  "path",
                  "emitter-shape",
                  "color",
                  "easing",
                  "preset",
                ],
              },
              query: {
                type: "string",
                description: "Search query for package name or description",
              },
            },
          },
        },
        {
          name: "get_package_info",
          description:
            "Get detailed information about a specific tsParticles package, including its category, load function, option keys, and which bundles include it.",
          inputSchema: {
            type: "object",
            properties: {
              package: {
                type: "string",
                description:
                  "Package name (e.g., @tsparticles/plugin-absorbers, @tsparticles/slim)",
              },
            },
            required: ["package"],
          },
        },
        {
          name: "diagnose_issues",
          description:
            "Analyze tsParticles options for common configuration problems: missing plugins, invisible particles, broken interactivity, incorrect structure, and performance issues. Returns a list of issues with severity, explanation, and suggested fixes.",
          inputSchema: {
            type: "object",
            properties: {
              options: {
                type: "object",
                description: "The tsParticles options object (ISourceOptions) to analyze",
              },
            },
            required: ["options"],
          },
        },
      ],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      case "suggest_plugins": {
        const options = args?.options as Record<string, unknown>;
        if (!options) {
          return {
            content: [{ type: "text", text: "Missing required argument: options" }],
            isError: true,
          };
        }
        const result = suggestPlugins(options);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }

      case "list_packages": {
        const filters: { category?: string; query?: string } = {};
        if (args?.category) filters.category = args.category as string;
        if (args?.query) filters.query = args.query as string;
        const result = listPackages(filters);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }

      case "get_package_info": {
        const pkg = args?.package as string;
        if (!pkg) {
          return {
            content: [{ type: "text", text: "Missing required argument: package" }],
            isError: true,
          };
        }
        const result = getPackageInfo(pkg);
        if (!result) {
          return {
            content: [
              {
                type: "text",
                text: `Package "${pkg}" not found. Use list_packages to see all available packages.`,
              },
            ],
            isError: true,
          };
        }
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }

      case "diagnose_issues": {
        const options = args?.options as Record<string, unknown>;
        if (!options) {
          return {
            content: [{ type: "text", text: "Missing required argument: options" }],
            isError: true,
          };
        }
        const issues = diagnoseIssues(options);
        return {
          content: [{ type: "text", text: JSON.stringify({ issues, total: issues.length }, null, 2) }],
        };
      }

      default:
        return {
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }
  });

  // ── Resources ──────────────────────────────────────────────────

  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: RESOURCES.map((r) => ({
        uri: r.uri,
        name: r.name,
        description: r.description,
        mimeType: r.mimeType,
      })),
    };
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;
    const resource = RESOURCES.find((r) => r.uri === uri);

    if (!resource) {
      // The `resources/read` response schema expects a `contents` array,
      // not the `content`/`isError` shape used by tool call responses.
      // Signal the error by throwing, which the SDK turns into a proper
      // JSON-RPC error response instead of a malformed result payload.
      throw new Error(`Resource not found: ${uri}`);
    }

    return {
      contents: [
        {
          uri: resource.uri,
          mimeType: resource.mimeType,
          text: resource.getText(),
        },
      ],
    };
  });

  // ── Prompts ──────────────────────────────────────────────────────

  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return { prompts: [generateOptionsPrompt] };
  });

  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const promptName = request.params.name;

    if (promptName !== "generate-options") {
      // Same reasoning as above: `prompts/get` expects a `messages` array
      // on success. Throw so the SDK produces a valid JSON-RPC error.
      throw new Error(`Unknown prompt: ${promptName}`);
    }

    const description = request.params.arguments?.description || "a particle animation";
    const systemText = generateOptionsSystemText;

    // The MCP prompt message schema only allows "user" and "assistant"
    // roles — "system" is not part of the spec and a strict client may
    // reject or silently drop such a message. Fold the system guidance
    // into the leading user message instead.
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `${systemText}\n\nGenerate tsParticles options for: ${description}`,
          },
        },
      ],
    };
  });

  return server;
}

// ── Start Server: stdio ─────────────────────────────────────────────

async function startStdio() {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("tsParticles MCP server running on stdio");
}

// ── Start Server: HTTP (Streamable HTTP transport) ──────────────────

interface SessionEntry {
  server: Server;
  transport: StreamableHTTPServerTransport;
  lastActivity: number;
}

function isOriginAllowed(origin: string | undefined, allowedOrigins?: string[]): boolean {
  // No Origin header at all (e.g. non-browser clients, curl) is allowed —
  // the Origin check exists to defend against DNS-rebinding attacks from
  // browser contexts, which always send this header.
  if (!origin) return true;

  if (allowedOrigins && allowedOrigins.length > 0) {
    return allowedOrigins.includes(origin);
  }

  // Default: only allow local origins when no explicit allow-list is
  // configured, since the server binds to 0.0.0.0 with no auth.
  try {
    const { hostname } = new URL(origin);
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
  } catch {
    return false;
  }
}

async function startHttp(port: number, allowedOrigins?: string[]) {
  const sessions = new Map<string, SessionEntry>();

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
      console.error(`Error closing session ${sessionId}:`, err);
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
  }, SESSION_SWEEP_INTERVAL_MS);
  sweepInterval.unref();

  const httpServer = createServer(async (req, res) => {
    // Health check endpoint
    if (req.method === "GET" && req.url === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", version: PACKAGE_VERSION }));
      return;
    }

    if (req.url !== "/mcp") {
      res.writeHead(404);
      res.end("Not found");
      return;
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
    const sessionId = Array.isArray(sessionIdHeader) ? sessionIdHeader[0] : sessionIdHeader;

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
  });

  httpServer.on("close", () => {
    clearInterval(sweepInterval);
  });

  httpServer.listen(port, "0.0.0.0", () => {
    console.error(`tsParticles MCP server running on http://0.0.0.0:${port}/mcp`);
    console.error(`Health check: http://0.0.0.0:${port}/health`);
  });
}

// ── Entry point ──────────────────────────────────────────────────────

async function main() {
  const args = parseArgs();

  if (args.mode === "http" && args.port) {
    await startHttp(args.port, args.allowedOrigins);
  } else {
    await startStdio();
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});