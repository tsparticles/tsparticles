/* eslint-disable sort-imports, @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url),
  __dirname = path.dirname(__filename),
  packageRoot = path.resolve(__dirname, ".."),
  workspaceRoot = path.resolve(packageRoot, "..", "..", ".."),
  localDist = path.join(packageRoot, "dist", "webpack-tsparticles.js"),
  pnpmStorePath = path.join(workspaceRoot, "node_modules", ".pnpm");

/**
 * Finds the built webpack-plugin entrypoint from the workspace package or pnpm store.
 * @returns The resolved entrypoint path, if found.
 */
function findPublishedDist() {
  if (!fs.existsSync(pnpmStorePath)) {
    return undefined;
  }

  const candidates = fs
    .readdirSync(pnpmStorePath)
    .filter((entry) => entry.startsWith("@tsparticles+webpack-plugin@"))
    .map((entry) =>
      path.join(
        pnpmStorePath,
        entry,
        "node_modules",
        "@tsparticles",
        "webpack-plugin",
        "dist",
        "webpack-tsparticles.js",
      ),
    );

  return candidates.find((candidate) => fs.existsSync(candidate));
}

const resolvedEntry = fs.existsSync(localDist) ? localDist : findPublishedDist();

if (!resolvedEntry) {
  throw new Error("Cannot resolve a built webpack-plugin entrypoint from the workspace package or pnpm store.");
}

const moduleExports = await import(pathToFileURL(resolvedEntry).href);

export const loadParticlesBundle = moduleExports.loadParticlesBundle;
export const loadParticlesEffect = moduleExports.loadParticlesEffect;
export const loadParticlesEngine = moduleExports.loadParticlesEngine;
export const loadParticlesInteraction = moduleExports.loadParticlesInteraction;
export const loadParticlesInteractionExternal = moduleExports.loadParticlesInteractionExternal;
export const loadParticlesInteractionParticles = moduleExports.loadParticlesInteractionParticles;
export const loadParticlesPalette = moduleExports.loadParticlesPalette;
export const loadParticlesPath = moduleExports.loadParticlesPath;
export const loadParticlesPlugin = moduleExports.loadParticlesPlugin;
export const loadParticlesPluginEasing = moduleExports.loadParticlesPluginEasing;
export const loadParticlesPluginEmittersShape = moduleExports.loadParticlesPluginEmittersShape;
export const loadParticlesPluginExport = moduleExports.loadParticlesPluginExport;
export const loadParticlesPreset = moduleExports.loadParticlesPreset;
export const loadParticlesShape = moduleExports.loadParticlesShape;
export const loadParticlesTemplate = moduleExports.loadParticlesTemplate;
export const loadParticlesUpdater = moduleExports.loadParticlesUpdater;
