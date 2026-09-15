#!/usr/bin/env node

import {
  diagnoseIssuesArgsSchema,
  generateCodeArgsSchema,
  getPackageInfoArgsSchema,
  listPackagesArgsSchema,
  suggestPluginsArgsSchema,
} from "./validation.js";
import { dirname, join } from "node:path";
import { generateOptionsArgsShape, generateOptionsSystemText } from "./prompts/generateOptions.js";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { diagnoseIssues } from "./tools/diagnoseIssues.js";
import { fileURLToPath } from "node:url";
import { generateCode } from "./tools/generateCode.js";
import { getBundlesGuideResource } from "./resources/bundlesGuide.js";
import { getOptionsGuideResource } from "./resources/optionsGuide.js";
import { getPackageCatalogResource } from "./resources/packageCatalog.js";
import { getPackageInfo } from "./tools/getPackageInfo.js";
import { listPackages } from "./tools/listPackages.js";
import { normalizeOrigin } from "./http/security.js";
import { readFileSync } from "node:fs";
import { sanitizeReflection } from "./utils/sanitize.js";
import { startHttpServer } from "./http/server.js";
import { suggestPlugins } from "./tools/suggestPlugins.js";

// ── Module constants ────────────────────────────────────────────────

/** Process exit code used when the CLI terminates with an error. */
enum ExitCode {
  Failure = 1,
}

const MIN_PORT = 1,
  MAX_PORT = 65535,
  JSON_INDENT = 2;

// Read the package version from package.json at runtime instead of
// hardcoding a value here, so `/health` and the MCP handshake never
// drift out of sync with the published package version. Falls back to
// "0.0.0" if, for some reason, package.json can't be located/parsed —
// this must never throw and prevent the server from starting.
/**
 *
 */
function readPackageVersion(): string {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url)),
      // dist/index.js -> ../package.json (works both from src via ts-node
      // style resolution and from the compiled dist/ output).
      pkgPath = join(__dirname, "..", "package.json"),
      pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as { version?: string };
    return typeof pkg.version === "string" ? pkg.version : "0.0.0";
  } catch {
    return "0.0.0";
  }
}

const PACKAGE_VERSION = readPackageVersion();

// ── CLI args ───────────────────────────────────────────────────────

interface ParsedArgs {
  allowedOrigins?: string[];
  authToken?: string;
  mode: "stdio" | "http";
  port?: number;
}

/**
 *
 */
function parseArgs(): ParsedArgs {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const args = process.argv.slice(2),
    result: ParsedArgs = { mode: "stdio" };
  let rawPort: string | undefined;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--stdio") {
      result.mode = "stdio";
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    } else if (args[i] === "--port" && i + 1 < args.length) {
      result.mode = "http";
      rawPort = args[++i];
    } else if (args[i].startsWith("--port=")) {
      result.mode = "http";
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      rawPort = args[i].split("=")[1];
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    } else if (args[i] === "--allowed-origin" && i + 1 < args.length) {
      result.allowedOrigins = (result.allowedOrigins ?? []).concat(args[++i]);
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
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
    if (!Number.isInteger(port) || port < MIN_PORT || port > MAX_PORT) {
      console.error(
        `Invalid --port value: ${rawPort ?? "(missing)"}. Expected an integer between ${MIN_PORT} and ${MAX_PORT}.`,
      );
      process.exit(ExitCode.Failure);
    }
    result.port = port;

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (result.allowedOrigins && result.allowedOrigins.length > 0) {
      const normalized = result.allowedOrigins.map(origin => normalizeOrigin(origin));

      if (normalized.some(origin => !origin)) {
        console.error("Invalid --allowed-origin value. Use full origin like http://localhost:3000");
        process.exit(ExitCode.Failure);
      }

      result.allowedOrigins = [...new Set(normalized as string[])];
    }
  } else {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (result.allowedOrigins && result.allowedOrigins.length > 0) {
      console.error("--allowed-origin can only be used with HTTP mode (--port <number>)");
      process.exit(ExitCode.Failure);
    }
    if (result.authToken) {
      console.error("--auth-token can only be used with HTTP mode (--port <number>)");
      process.exit(ExitCode.Failure);
    }
  }

  return result;
}

// ── Tool dispatch ─────────────────────────────────────────────────

/** The subset of the MCP tool result shape this server emits. */
// A type alias is required here: the MCP SDK expects the tool result to stay
// assignable to its union result type for `tools/call`, which an interface
// (possibly augmented via declaration merging) is not.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ToolResult = { content: { text: string; type: "text" }[]; isError?: boolean };

/**
 *
 * @param text
 * @param isError
 */
function toolResult(text: string, isError = false): ToolResult {
  return { content: [{ type: "text", text }], isError };
}

// ── Server factory ─────────────────────────────────────────────────
//
// IMPORTANT: each transport (stdio, or each individual HTTP session) gets
// its OWN server instance. The MCP SDK binds a single transport per
// instance internally, and swapping that binding at runtime (as the
// previous implementation did via a private `_transport` field) is not
// safe: request handlers are async and may resolve after the field has
// already been reassigned to another session's transport, causing
// responses to be delivered to the wrong client or dropped entirely.
// Creating one lightweight McpServer per session avoids that class of bug
// at the cost of a small amount of extra memory per connection.
//
// Resources and prompts are static, so they could be shared — but every
// session gets its own instance anyway (see above), which keeps the
// registration code identical across stdio and HTTP modes.

function createMcpServer(): McpServer {
  const server = new McpServer(
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
  //
  // Each tool's zod schema is passed straight to the SDK as its
  // `inputSchema`: the SDK converts it to the JSON schema advertised by
  // `tools/list` AND validates incoming `tools/call` arguments with it
  // before the handler runs, so a schema (and its descriptions) is the
  // single source of truth instead of the manually-maintained JSON
  // schema + `runTool` double-validation of the previous implementation.

  server.registerTool(
    "suggest_plugins",
    {
      title: "Suggest tsParticles plugins",
      description:
        "Given a tsParticles options object, suggests the npm packages and imports required to use those options. Detects which plugins, interactions, updaters, and shapes are needed.",
      inputSchema: suggestPluginsArgsSchema,
    },
    ({ options }) => toolResult(JSON.stringify(suggestPlugins(options), null, JSON_INDENT)),
  );

  server.registerTool(
    "list_packages",
    {
      title: "List tsParticles packages",
      description:
        "List all available tsParticles packages, optionally filtered by category or search query. Categories: bundle, plugin, interaction-external, interaction-particles, interaction-light, updater, shape, effect, path, emitter-shape, color, easing, preset.",
      inputSchema: listPackagesArgsSchema,
    },
    data => toolResult(JSON.stringify(listPackages(data), null, JSON_INDENT)),
  );

  server.registerTool(
    "get_package_info",
    {
      title: "Get tsParticles package info",
      description:
        "Get detailed information about a specific tsParticles package, including its category, load function, option keys, and which bundles include it.",
      inputSchema: getPackageInfoArgsSchema,
    },
    ({ package: packageName }) => {
      const result = getPackageInfo(packageName);

      if (!result) {
        return toolResult(
          `Package ${sanitizeReflection(packageName)} not found. Use list_packages to see all available packages.`,
          true,
        );
      }

      return toolResult(JSON.stringify(result, null, JSON_INDENT));
    },
  );

  server.registerTool(
    "diagnose_issues",
    {
      title: "Diagnose tsParticles configuration issues",
      description:
        "Analyze tsParticles options for common configuration problems: missing plugins, invisible particles, broken interactivity, incorrect structure, and performance issues. Returns a list of issues with severity, explanation, and suggested fixes.",
      inputSchema: diagnoseIssuesArgsSchema,
    },
    ({ options }) => {
      const issues = diagnoseIssues(options);

      return toolResult(JSON.stringify({ issues, total: issues.length }, null, JSON_INDENT));
    },
  );

  server.registerTool(
    "generate_code",
    {
      title: "Generate tsParticles code",
      description:
        "Generate complete, ready-to-use tsParticles code from a natural language description. Automatically selects the best bundle (preferring specialized bundles like @tsparticles/confetti over generic ones) and generates framework-specific code with install commands.",
      inputSchema: generateCodeArgsSchema,
    },
    data => toolResult(JSON.stringify(generateCode(data), null, JSON_INDENT)),
  );

  // ── Resources ──────────────────────────────────────────────────
  //
  // Static markdown documents, registered per-URI. The SDK autogenerates
  // the `resources/list` entries from the metadata below and returns a
  // proper JSON-RPC error for reads of unknown URIs.

  server.registerResource(
    "Complete tsParticles Package Catalog",
    "tsparticles://packages",
    {
      description:
        "Every tsParticles package organized by category with descriptions, load functions, and bundle inclusion info",
      mimeType: "text/markdown",
    },
    uri => ({
      contents: [{ uri: uri.toString(), mimeType: "text/markdown", text: getPackageCatalogResource() }],
    }),
  );

  server.registerResource(
    "tsParticles Options Guide",
    "tsparticles://options/guide",
    {
      description: "Complete structural guide to tsParticles options with tables, defaults, and examples",
      mimeType: "text/markdown",
    },
    uri => ({
      contents: [{ uri: uri.toString(), mimeType: "text/markdown", text: getOptionsGuideResource() }],
    }),
  );

  server.registerResource(
    "tsParticles Bundle Guide",
    "tsparticles://bundles",
    {
      description: "Guide to all tsParticles bundles with hierarchy, selection advice, and usage examples",
      mimeType: "text/markdown",
    },
    uri => ({
      contents: [{ uri: uri.toString(), mimeType: "text/markdown", text: getBundlesGuideResource() }],
    }),
  );

  // ── Prompts ──────────────────────────────────────────────────────

  server.registerPrompt(
    "generate-options",
    {
      description: "Generate tsParticles configuration from a natural language description",
      argsSchema: generateOptionsArgsShape,
    },
    ({ description }) => {
      const systemText = generateOptionsSystemText,
        target = description ?? "a particle animation";

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
              text: `${systemText}\n\nGenerate tsParticles options for: ${target}`,
            },
          },
        ],
      };
    },
  );

  return server;
}

// ── Start Server: stdio ─────────────────────────────────────────────

/**
 *
 */
async function startStdio(): Promise<void> {
  const server = createMcpServer(),
    transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("tsParticles MCP server running on stdio");
}

// ── Entry point ──────────────────────────────────────────────────────

/**
 *
 */
async function main(): Promise<void> {
  const args = parseArgs();

  if (args.mode === "http" && args.port) {
    await startHttpServer({
      port: args.port,
      allowedOrigins: args.allowedOrigins,
      authToken: args.authToken,
      createMcpServer,
    });
  } else {
    await startStdio();
  }
}

main().catch((error: unknown) => {
  console.error("Fatal error:", error);
  process.exit(ExitCode.Failure);
});
