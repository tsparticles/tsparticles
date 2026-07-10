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
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";

import { suggestPlugins } from "./tools/suggestPlugins.js";
import { listPackages } from "./tools/listPackages.js";
import { getPackageInfo } from "./tools/getPackageInfo.js";
import { getPackageCatalogResource } from "./resources/packageCatalog.js";
import { getOptionsGuideResource } from "./resources/optionsGuide.js";
import { getBundlesGuideResource } from "./resources/bundlesGuide.js";
import { generateOptionsPrompt } from "./prompts/generateOptions.js";
import { diagnoseIssues } from "./tools/diagnoseIssues.js";

import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

const PACKAGE_VERSION = "0.1.0";
const MAX_REQUEST_BODY_BYTES = 1024 * 1024; // 1 MB

function parseArgs() {
  const args = process.argv.slice(2);
  const result: { mode: "stdio" | "http"; port?: number } = { mode: "stdio" };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--stdio") {
      result.mode = "stdio";
    } else if (args[i] === "--port" && i + 1 < args.length) {
      result.mode = "http";
      result.port = parseInt(args[++i], 10);
    } else if (args[i].startsWith("--port=")) {
      result.mode = "http";
      result.port = parseInt(args[i].split("=")[1], 10);
    }
  }

  return result;
}

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

// ── Tools ──────────────────────────────────────────────────────────

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
          content: [
            {
              type: "text",
              text: "Missing required argument: options",
            },
          ],
          isError: true,
        };
      }
      const result = suggestPlugins(options);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    case "list_packages": {
      const filters: { category?: string; query?: string } = {};
      if (args?.category) filters.category = args.category as string;
      if (args?.query) filters.query = args.query as string;
      const result = listPackages(filters);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    case "get_package_info": {
      const pkg = args?.package as string;
      if (!pkg) {
        return {
          content: [
            {
              type: "text",
              text: "Missing required argument: package",
            },
          ],
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
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    case "diagnose_issues": {
      const options = args?.options as Record<string, unknown>;
      if (!options) {
        return {
          content: [
            {
              type: "text",
              text: "Missing required argument: options",
            },
          ],
          isError: true,
        };
      }
      const issues = diagnoseIssues(options);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ issues, total: issues.length }, null, 2),
          },
        ],
      };
    }

    default:
      return {
        content: [
          {
            type: "text",
            text: `Unknown tool: ${name}`,
          },
        ],
        isError: true,
      };
  }
});

// ── Resources ──────────────────────────────────────────────────────

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
    return {
      content: [
        {
          type: "text",
          text: `Resource not found: ${uri}`,
        },
      ],
      isError: true,
    };
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

// ── Prompts ────────────────────────────────────────────────────────

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [generateOptionsPrompt],
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const promptName = request.params.name;

  if (promptName !== "generate-options") {
    return {
      content: [
        {
          type: "text",
          text: `Unknown prompt: ${promptName}`,
        },
      ],
      isError: true,
    };
  }

  const description =
    request.params.arguments?.description || "a particle animation";

  return {
    messages: [
      {
        role: "system",
        content: {
          type: "text",
          text: generateOptionsPrompt.messages[0].content.text,
        },
      },
      {
        role: "user",
        content: {
          type: "text",
          text: `Generate tsParticles options for: ${description}`,
        },
      },
    ],
  };
});

// ── Start Server ───────────────────────────────────────────────────

async function startStdio() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("tsParticles MCP server running on stdio");
}

async function startHttp(port: number) {
  const sessions = new Map<string, StreamableHTTPServerTransport>();
  const requestToSession = new Map<string | number, string>();

  const routingTransport: Transport = {
    start: async () => {},
    close: async () => {
      for (const transport of sessions.values()) {
        await transport.close();
      }
      sessions.clear();
      requestToSession.clear();
    },
    send: async (message, options) => {
      const msg = message as { id?: string | number };
      const requestId = msg.id ?? options?.relatedRequestId;
      if (requestId !== undefined) {
        const sessionId = requestToSession.get(requestId);
        if (sessionId) {
          const transport = sessions.get(sessionId);
          if (transport) {
            await transport.send(message, options);
          }
        }
      }
    },
    onclose: undefined,
    onerror: undefined,
    onmessage: undefined,
    sessionId: undefined,
  };

  await server.connect(routingTransport);

  const httpServer = createServer(async (req, res) => {
    // Health check endpoint
    if (req.method === "GET" && req.url === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", version: PACKAGE_VERSION }));
      return;
    }

    // MCP endpoint — accept POST with JSON body
    if (req.method === "POST" && req.url === "/mcp") {
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

      const sessionIdHeader = req.headers["mcp-session-id"];
      const sessionId = Array.isArray(sessionIdHeader) ? sessionIdHeader[0] : sessionIdHeader;

      if (sessionId) {
        const transport = sessions.get(sessionId);
        if (!transport) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Session not found" }));
          return;
        }
        await transport.handleRequest(req, res, parsedBody);
      } else {
        let currentSessionId: string | undefined;
        const transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
          onsessioninitialized: (newSessionId: string) => {
            currentSessionId = newSessionId;
            sessions.set(newSessionId, transport);
          },
          onsessionclosed: (closedSessionId: string) => {
            sessions.delete(closedSessionId);
            for (const [rid, sid] of requestToSession) {
              if (sid === closedSessionId) {
                requestToSession.delete(rid);
              }
            }
          },
        });

        transport.onmessage = (message, extra) => {
          const msg = message as { id?: string | number };
          if (msg.id !== undefined && currentSessionId) {
            requestToSession.set(msg.id, currentSessionId);
          }
          routingTransport.onmessage?.(message, extra);
        };

        transport.onerror = (error) => {
          routingTransport.onerror?.(error);
        };

        await transport.handleRequest(req, res, parsedBody);
      }
      return;
    }

    res.writeHead(404);
    res.end("Not found");
  });

  httpServer.listen(port, "0.0.0.0", () => {
    console.error(`tsParticles MCP server running on http://0.0.0.0:${port}/mcp`);
    console.error(`Health check: http://0.0.0.0:${port}/health`);
  });
}

async function main() {
  const args = parseArgs();

  if (args.mode === "http" && args.port) {
    await startHttp(args.port);
  } else {
    await startStdio();
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
