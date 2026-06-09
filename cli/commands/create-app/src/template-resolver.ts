import { existsSync, readFileSync, readdirSync } from "node:fs";
import type { TemplateInfo } from "./types.js";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url),
  __dirname = path.dirname(__filename),
  repoRoot = path.resolve(__dirname, "..", "..", "..", ".."),
  workspaceTemplateRoot = path.join(repoRoot, "templates"),
  isWorkspaceMode = existsSync(path.join(workspaceTemplateRoot, "scaffold", "package.json"));

/**
 *
 * @param name
 */
export function resolveTemplateRoot(name: string): string {
  if (isWorkspaceMode) {
    const workspacePath = path.join(workspaceTemplateRoot, name);

    if (existsSync(path.join(workspacePath, "package.json"))) {
      return workspacePath;
    }
  }

  const nodeModulesPath = path.join(repoRoot, "node_modules", `@tsparticles/template-${name}`),
    hoistedPath = path.join(repoRoot, "..", "node_modules", `@tsparticles/template-${name}`);

  for (const candidate of [nodeModulesPath, hoistedPath]) {
    if (existsSync(path.join(candidate, "package.json"))) {
      return candidate;
    }
  }

  throw new Error(
    `Template "${name}" not found. Looked in workspace (${path.join(workspaceTemplateRoot, name)}) and installed packages.`,
  );
}

/**
 *
 * @param templateName
 */
export function listAvailableFrameworks(templateName: string): string[] {
  const templateRoot = resolveTemplateRoot(templateName),
    frameworksDir = path.join(templateRoot, "template");

  if (!existsSync(frameworksDir)) {
    return [];
  }

  const entries = readdirSync(frameworksDir),
    result: string[] = [];

  for (const entry of entries) {
    if (existsSync(path.join(frameworksDir, entry, "package.json"))) {
      result.push(entry);
    }
  }

  return result.sort();
}

/**
 *
 */
export function listAvailableTemplates(): TemplateInfo[] {
  const templateMap: Record<string, { displayName: string; type: "scaffold" | "example" }> = {
      scaffold: { displayName: "Scaffold", type: "scaffold" },
      login: { displayName: "Login Page", type: "example" },
      portfolio: { displayName: "Portfolio", type: "example" },
      landing: { displayName: "Landing Page", type: "example" },
      tictactoe: { displayName: "Tic Tac Toe", type: "example" },
      confetti: { displayName: "Confetti", type: "example" },
      ribbons: { displayName: "Ribbons", type: "example" },
      particles: { displayName: "Particles", type: "example" },
    },
    results: TemplateInfo[] = [];

  for (const [name, info] of Object.entries(templateMap)) {
    try {
      const frameworks = listAvailableFrameworks(name);

      results.push({
        displayName: info.displayName,
        frameworks,
        name,
        type: info.type,
      });
    } catch {
      // template not available, skip
    }
  }

  return results;
}

/**
 *
 */
export function resolveEngineVersion(): string {
  if (isWorkspaceMode) {
    const enginePkgPath = path.join(repoRoot, "engine", "package.json");

    if (existsSync(enginePkgPath)) {
      const pkg = JSON.parse(readFileSync(enginePkgPath, "utf-8")) as { version?: string };

      return pkg.version ?? "4.1.3";
    }
  }

  const enginePkgPath = path.join(repoRoot, "node_modules", "@tsparticles", "engine", "package.json");

  if (existsSync(enginePkgPath)) {
    const pkg = JSON.parse(readFileSync(enginePkgPath, "utf-8")) as { version?: string };

    return pkg.version ?? "4.1.3";
  }

  return "4.1.3";
}
