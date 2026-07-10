#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { suggestPlugins } from "./tools/suggestPlugins.js";
import { listPackages } from "./tools/listPackages.js";
import { getPackageInfo } from "./tools/getPackageInfo.js";
import { getPackageCatalogResource } from "./resources/packageCatalog.js";
import { getOptionsGuideResource } from "./resources/optionsGuide.js";
import { getBundlesGuideResource } from "./resources/bundlesGuide.js";
import { generateOptionsPrompt, generateOptionsSystemText } from "./prompts/generateOptions.js";
import { diagnoseIssues } from "./tools/diagnoseIssues.js";
import { startHttpServer } from "./http/server.js";
import { normalizeOrigin } from "./http/security.js";
import {
  diagnoseIssuesArgsSchema,
  formatZodError,
  getPackageInfoArgsSchema,
  listPackagesArgsSchema,
  suggestPluginsArgsSchema,
} from "./validation.js";

// Read the package version from package.json at runtime instead of
// hardcoding a value here, so `/health` and the MCP handshake never
// drift out of sync with the published package version. Falls back to
// "0.0.0" if, for some reason, package.json can't be located/parsed —
// this must never throw and prevent the server from starting.
function readPackageVersion(): string {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    // dist/index.js -> ../package.json (works both from src via ts-node
    // style resolution and from the compiled dist/ output).
    const pkgPath = join(__dirname, "..", "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as { version?: string };
    return typeof pkg.version === "string" ? pkg.version : "0.0.0";
  } catch {
    return "0.0.0";
  }
}

const PACKAGE_VERSION = readPackageVersion();

// ── CLI args ───────────────────────────────────────────────────────

interface ParsedArgs {
  mode: "stdio" | "http";
  port?: number;
  allowedOrigins?: string[];
  authToken?: string;
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
    } else if (args[i] === "--auth-token" && i + 1 < args.length) {
      result.authToken = args[++i];
    } else if (args[i].startsWith("--auth-token=")) {
      result.authToken = args[i].slice("--auth-token=".length);
    }
  }

  // Allow the token to be supplied via environment variable too, so it
  // doesn't need to appear in shell history / process listings. The CLI
  // flag takes precedence if both are set.
  if (!result.authToken && process.env.MCP_AUTH_TOKEN) {
    result.authToken = process.env.MCP_AUTH_TOKEN;
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

    if (result.allowedOrigins && result.allowedOrigins.length > 0) {
      const normalized = result.allowedOrigins.map((origin) => normalizeOrigin(origin));

      if (normalized.some((origin) => !origin)) {
        console.error("Invalid --allowed-origin value. Use full origin like http://localhost:3000");
        process.exit(1);
      }

      result.allowedOrigins = [...new Set(normalized as string[])];
    }
  } else {
    if (result.allowedOrigins && result.allowedOrigins.length > 0) {
      console.error("--allowed-origin can only be used with HTTP mode (--port <number>)");
      process.exit(1);
    }
    if (result.authToken) {
      console.error("--auth-token can only be used with HTTP mode (--port <number>)");
      process.exit(1);
    }
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
                  "interaction-light",
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

    try {
      switch (name) {
        case "suggest_plugins": {
          const parsed = suggestPluginsArgsSchema.safeParse(args);
          if (!parsed.success) {
            return {
              content: [{ type: "text", text: `Invalid arguments: ${formatZodError(parsed.error)}` }],
              isError: true,
            };
          }
          const result = suggestPlugins(parsed.data.options);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        }

        case "list_packages": {
          const parsed = listPackagesArgsSchema.safeParse(args ?? {});
          if (!parsed.success) {
            return {
              content: [{ type: "text", text: `Invalid arguments: ${formatZodError(parsed.error)}` }],
              isError: true,
            };
          }
          const result = listPackages(parsed.data);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        }

        case "get_package_info": {
          const parsed = getPackageInfoArgsSchema.safeParse(args);
          if (!parsed.success) {
            return {
              content: [{ type: "text", text: `Invalid arguments: ${formatZodError(parsed.error)}` }],
              isError: true,
            };
          }
          const result = getPackageInfo(parsed.data.package);
          if (!result) {
            return {
              content: [
                {
                  type: "text",
                  text: `Package "${parsed.data.package}" not found. Use list_packages to see all available packages.`,
                },
              ],
              isError: true,
            };
          }
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        }

        case "diagnose_issues": {
          const parsed = diagnoseIssuesArgsSchema.safeParse(args);
          if (!parsed.success) {
            return {
              content: [{ type: "text", text: `Invalid arguments: ${formatZodError(parsed.error)}` }],
              isError: true,
            };
          }
          const issues = diagnoseIssues(parsed.data.options);
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
    } catch (error) {
      // Tool implementations are expected to be pure/synchronous and
      // shouldn't normally throw, but a malformed-yet-schema-valid
      // options object (or a future bug) could still trigger an
      // unexpected exception. Without this guard, that exception would
      // propagate out of the handler and either crash the transport or
      // produce a malformed JSON-RPC response instead of a clean
      // `isError: true` tool result.
      console.error(`Error running tool "${name}":`, error);
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Internal error running tool "${name}": ${message}` }],
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

// ── Entry point ──────────────────────────────────────────────────────

async function main() {
  const args = parseArgs();

  if (args.mode === "http" && args.port) {
    await startHttpServer({
      port: args.port,
      allowedOrigins: args.allowedOrigins,
      authToken: args.authToken,
      packageVersion: PACKAGE_VERSION,
      createMcpServer,
    });
  } else {
    await startStdio();
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
