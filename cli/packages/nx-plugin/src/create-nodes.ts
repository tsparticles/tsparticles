import { type CreateNodesV2, createNodesFromFiles, readJsonFile } from "@nx/devkit";
import { createCanonicalAliasTargets, isTsParticlesWorkspacePackage } from "./canonical-targets.ts";
import { dirname, join } from "node:path";

interface TsParticlesPackageJson {
  name?: string;
  scripts?: Record<string, string>;
}

const emptyCount = 0;

/**
 * @param scriptName - The scriptName
 * @returns -
 */
function createScriptTarget(scriptName: string): Record<string, unknown> {
  return {
    executor: "nx:run-script",
    options: {
      script: scriptName,
    },
    parallelism: true,
  };
}

/**
 * @param scripts - The scripts
 * @returns -
 */
function createFallbackScriptTargets(scripts?: Record<string, string>): Record<string, unknown> {
  const targets: Record<string, unknown> = {};

  if (!scripts) {
    return targets;
  }

  if (scripts["build"]) {
    targets["build"] = createScriptTarget("build");
  }

  if (scripts["build:ci"]) {
    targets["build:ci"] = createScriptTarget("build:ci");
  }

  return targets;
}

/**
 * @param packageJsonPath - The packageJsonPath
 * @param workspaceRoot - The workspaceRoot
 * @returns -
 */
function createProjectAugmentation(packageJsonPath: string, workspaceRoot: string): Record<string, unknown> {
  if (!isTsParticlesWorkspacePackage(packageJsonPath)) {
    return {};
  }

  const packageJson = readJsonFile<TsParticlesPackageJson>(join(workspaceRoot, packageJsonPath)),
    aliasTargets = createCanonicalAliasTargets(packageJson.scripts),
    fallbackTargets = createFallbackScriptTargets(packageJson.scripts),
    aliasTargetNames = Object.keys(aliasTargets),
    fallbackTargetNames = Object.keys(fallbackTargets),
    projectTargets = {
      ...fallbackTargets,
      ...aliasTargets,
    },
    targetNames = Object.keys(projectTargets);

  if (!packageJson.name || targetNames.length === emptyCount) {
    return {};
  }

  const projectRoot = dirname(packageJsonPath);

  return {
    projects: {
      [projectRoot]: {
        name: packageJson.name,
        root: projectRoot,
        targets: projectTargets,
        metadata: {
          targetGroups: {
            ...(fallbackTargetNames.length > emptyCount ? { "tsParticles Nx fallback": fallbackTargetNames } : {}),
            ...(aliasTargetNames.length > emptyCount ? { "tsParticles Nx aliases": aliasTargetNames } : {}),
          },
        },
      },
    },
  };
}

export const createNodesV2: CreateNodesV2 = [
  "**/package.json",
  (configFiles, options, context): ReturnType<typeof createNodesFromFiles> =>
    createNodesFromFiles(
      packageJsonPath => createProjectAugmentation(packageJsonPath, context.workspaceRoot),
      configFiles,
      options,
      context,
    ),
];
