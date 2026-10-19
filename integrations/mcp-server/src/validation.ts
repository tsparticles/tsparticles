import { z } from "zod";

// ── Shared primitives ──────────────────────────────────────────────
//
// Tool inputs arrive as untyped JSON over the wire (stdio or HTTP), so
// they must be validated at runtime rather than merely cast with `as`.
// `z.record(z.string(), z.unknown())` accepts any plain object while
// still rejecting arrays, strings, numbers, null, etc. — the previous
// `args?.options as Record<string, unknown>` cast happily "accepted"
// any of those and let malformed input reach the tool implementations.

const optionsObjectSchema = z.record(z.string(), z.unknown()).describe("A tsParticles options object (ISourceOptions)");

export const suggestPluginsArgsSchema = z.object({
  options: optionsObjectSchema,
});

export const diagnoseIssuesArgsSchema = z.object({
  options: optionsObjectSchema,
});

export const getPackageInfoArgsSchema = z.object({
  package: z.string().min(1, "package must be a non-empty string"), // eslint-disable-line @typescript-eslint/no-magic-numbers
});

export const categorySchema = z.enum([
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
]);

// Keep the schema a plain (all-optional) object: wrapping it (e.g. with
// `.default({})`) would make the SDK's JSON-schema converter emit an empty
// tool schema, hiding `category`/`query` from MCP clients.
export const listPackagesArgsSchema = z.object({
  category: categorySchema.optional(),
  query: z.string().optional(),
});

export const generateCodeArgsSchema = z.object({
  description: z.string().trim().min(1, "description must be a non-empty string"), // eslint-disable-line @typescript-eslint/no-magic-numbers
  framework: z.enum(["vanilla", "react", "vue3", "svelte", "angular"]).optional(),
  typescript: z.boolean().optional(),
});

export type SuggestPluginsArgs = z.infer<typeof suggestPluginsArgsSchema>;
export type DiagnoseIssuesArgs = z.infer<typeof diagnoseIssuesArgsSchema>;
export type GetPackageInfoArgs = z.infer<typeof getPackageInfoArgsSchema>;
export type ListPackagesArgs = z.infer<typeof listPackagesArgsSchema>;
export type GenerateCodeArgs = z.infer<typeof generateCodeArgsSchema>;

/**
 * Formats a ZodError into a single human-readable string suitable for
 * returning as tool call error text (MCP tool errors are plain text,
 * not structured JSON).
 * @param error
 */
export function formatZodError(error: z.ZodError): string {
  return error.issues
    .map(issue => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "(root)"; // eslint-disable-line @typescript-eslint/no-magic-numbers
      return `${path}: ${issue.message}`;
    })
    .join("; ");
}
