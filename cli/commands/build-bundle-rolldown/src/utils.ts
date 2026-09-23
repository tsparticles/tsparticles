/* eslint-disable sort-imports */
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { loadParticlesBundle, type RolldownConfig } from "@tsparticles/rolldown-plugin";
import { type OutputOptions, rolldown } from "rolldown";

const rolldownConfigCandidates = ["rolldown.config.mjs", "rolldown.config.js", "rolldown.config.cjs"] as const,
  // Existing rollup.config files are bundler-agnostic (same input/output option names) and can be
  // consumed by Rolldown as-is, so they are used as an intermediate fallback.
  rollupConfigCandidates = ["rollup.config.mjs", "rollup.config.js", "rollup.config.cjs"] as const,
  emptyCount = 0;

/**
 * @param configData - The configData
 * @returns -
 */
function normalizeRolldownConfigs(configData: RolldownConfig | RolldownConfig[]): RolldownConfig[] {
  return Array.isArray(configData) ? configData : [configData];
}

/**
 * @param basePath - The basePath
 * @returns -
 */
async function loadRolldownConfig(basePath: string): Promise<RolldownConfig[]> {
  for (const configName of [...rolldownConfigCandidates, ...rollupConfigCandidates]) {
    const configPath = path.join(basePath, configName);

    if (!existsSync(configPath)) {
      continue;
    }

    const importedConfig = (await import(pathToFileURL(configPath).href)) as {
      default?: RolldownConfig | RolldownConfig[];
    };

    if (importedConfig.default) {
      return normalizeRolldownConfigs(importedConfig.default);
    }
  }

  const packageJsonPath = path.join(basePath, "package.json");

  if (!existsSync(packageJsonPath)) {
    throw new Error("No rolldown config file found and package.json is missing");
  }

  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8")) as {
      version?: string;
    },
    version = packageJson.version ?? "0.0.0";

  return loadParticlesBundle({
    dir: basePath,
    version,
  });
}

/**
 * @param bundleResult - The bundleResult
 * @param output - The output
 * @returns -
 */
async function writeRolldownOutput(
  bundleResult: Awaited<ReturnType<typeof rolldown>>,
  output: OutputOptions,
): Promise<void> {
  if (output.file || output.dir) {
    await bundleResult.write(output);

    return;
  }

  await bundleResult.generate(output);
}

/**
 * @param basePath - The basePath
 * @param silent - The silent
 * @returns true if the bundle was created
 */
export async function bundleRolldown(basePath: string, silent: boolean): Promise<boolean> {
  if (!silent) {
    console.info("Rolldown bundling started");
  }

  try {
    const configs = await loadRolldownConfig(basePath);

    for (const config of configs) {
      const bundleResult = await rolldown(config.input);

      if (config.outputs.length === emptyCount) {
        throw new Error("Rolldown config is missing output settings");
      }

      for (const output of config.outputs) {
        await writeRolldownOutput(bundleResult, output);
      }

      await bundleResult.close();
    }
  } catch (e) {
    console.error(e);

    return false;
  }

  if (!silent) {
    console.info("Rolldown bundling completed");
  }

  return true;
}
