/* eslint-disable sort-imports */
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { loadParticlesBundle } from "@tsparticles/rollup-plugin";
import { type OutputOptions, type RollupOptions, rollup } from "rollup";

const rollupConfigCandidates = ["rollup.config.mjs", "rollup.config.js", "rollup.config.cjs"] as const,
  emptyCount = 0;

/**
 * @param configData - The configData
 * @returns -
 */
function normalizeRollupConfigs(configData: RollupOptions | RollupOptions[]): RollupOptions[] {
  return Array.isArray(configData) ? configData : [configData];
}

/**
 * @param basePath - The basePath
 * @returns -
 */
async function loadRollupConfig(basePath: string): Promise<RollupOptions[]> {
  for (const configName of rollupConfigCandidates) {
    const configPath = path.join(basePath, configName);

    if (!existsSync(configPath)) {
      continue;
    }

    const importedConfig = (await import(pathToFileURL(configPath).href)) as {
      default?: RollupOptions | RollupOptions[];
    };

    if (importedConfig.default) {
      return normalizeRollupConfigs(importedConfig.default);
    }
  }

  const packageJsonPath = path.join(basePath, "package.json");

  if (!existsSync(packageJsonPath)) {
    throw new Error("No rollup config file found and package.json is missing");
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
async function writeRollupOutput(
  bundleResult: Awaited<ReturnType<typeof rollup>>,
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
export async function bundleRollup(basePath: string, silent: boolean): Promise<boolean> {
  if (!silent) {
    console.info("Rollup bundling started");
  }

  try {
    const configs = await loadRollupConfig(basePath);

    for (const config of configs) {
      const bundleResult = await rollup(config);
      let outputs: OutputOptions[] = [];

      if (config.output) {
        outputs = Array.isArray(config.output) ? config.output : [config.output];
      }

      if (outputs.length === emptyCount) {
        throw new Error("Rollup config is missing output settings");
      }

      for (const output of outputs) {
        await writeRollupOutput(bundleResult, output);
      }

      await bundleResult.close();
    }
  } catch (e) {
    console.error(e);

    return false;
  }

  if (!silent) {
    console.info("Rollup bundling completed");
  }

  return true;
}
