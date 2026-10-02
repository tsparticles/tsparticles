/* eslint-disable jsdoc/require-jsdoc */
import type { ProjectConfiguration } from "@nx/devkit";

interface TsParticlesAliasDefinition {
  alias: string;
  candidates: readonly string[];
  description: string;
}

const pnpmRunPrefix = "pnpm run",
  cliPrefixLength = 4;

export const tsParticlesAliasDefinitions: readonly TsParticlesAliasDefinition[] = [
  {
    alias: "clean",
    candidates: ["clear:dist"],
    description: "Canonical tsParticles clean target.",
  },
  {
    alias: "prettify",
    candidates: ["prettify:src", "format"],
    description: "Canonical tsParticles source formatting target.",
  },
  {
    alias: "prettify:ci",
    candidates: ["prettify:ci:src"],
    description: "Canonical tsParticles CI formatting target.",
  },
  {
    alias: "tsc",
    candidates: ["compile", "build:ts", "typecheck"],
    description: "Canonical tsParticles TypeScript build target.",
  },
  {
    alias: "bundle:webpack",
    candidates: ["build:bundle:webpack"],
    description: "Canonical tsParticles Webpack bundle target.",
  },
  {
    alias: "bundle:rollup",
    candidates: ["build:bundle:rollup"],
    description: "Canonical tsParticles Rollup bundle target.",
  },
  {
    alias: "bundle:rolldown",
    candidates: ["build:bundle:rolldown"],
    description: "Canonical tsParticles Rolldown bundle target.",
  },
  {
    alias: "distfiles",
    candidates: ["build:distfiles"],
    description: "Canonical tsParticles dist files target.",
  },
] as const;

function createAliasTarget(
  scriptName: string,
  scriptContent: string,
  description: string,
): NonNullable<ProjectConfiguration["targets"]>[string] {
  return {
    executor: "nx:run-script",
    options: {
      script: scriptName,
    },
    metadata: {
      description,
      runCommand: `${pnpmRunPrefix} ${scriptName}`,
      scriptContent,
    },
    parallelism: true,
  };
}

export function createCanonicalAliasTargets(
  scripts?: Record<string, string>,
): NonNullable<ProjectConfiguration["targets"]> {
  const targets: NonNullable<ProjectConfiguration["targets"]> = {};

  if (!scripts) {
    return targets;
  }

  for (const definition of tsParticlesAliasDefinitions) {
    if (scripts[definition.alias]) {
      continue;
    }

    const scriptName = definition.candidates.find(candidate => !!scripts[candidate]);

    if (!scriptName) {
      continue;
    }

    const scriptContent = scripts[scriptName];

    if (!scriptContent) {
      continue;
    }

    targets[definition.alias] = createAliasTarget(scriptName, scriptContent, definition.description);
  }

  return targets;
}

export function isTsParticlesWorkspacePackage(packageJsonPath: string): boolean {
  const normalizedPath = packageJsonPath.replaceAll("\\", "/"),
    pathFromWorkspaceRoot = normalizedPath.startsWith("cli/") ? normalizedPath.slice(cliPrefixLength) : normalizedPath;

  if (normalizedPath.includes("/files/")) {
    return false;
  }

  return (
    pathFromWorkspaceRoot.startsWith("commands/") ||
    pathFromWorkspaceRoot.startsWith("packages/") ||
    pathFromWorkspaceRoot.startsWith("utils/")
  );
}
