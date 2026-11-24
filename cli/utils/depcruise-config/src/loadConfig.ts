import type { IConfiguration } from "dependency-cruiser";
import { defaultConfig } from "./defaultConfig.js";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const CONFIG_FILES = [
  ".dependency-cruiser.cjs",
  ".dependency-cruiser.js",
  ".dependency-cruiser.mjs",
];

/**
 * Type guard for config module import.
 * @param value - the imported module
 * @returns true if the imported module is a config object
 */
function isConfigModule(value: unknown): value is { default?: IConfiguration } {
  return typeof value === "object" && value !== null;
}

/**
 * Loads the Dependency Cruiser configuration.
 * @param cwd - The current working directory.
 * @returns The loaded Dependency Cruiser configuration or the default one.
 */
export async function loadDependencyCruiserConfig(
  cwd = process.cwd(),
): Promise<IConfiguration> {
  for (const file of CONFIG_FILES) {
    const fullPath = path.join(cwd, file);

    if (fs.existsSync(fullPath)) {
      const mod: unknown = await import(pathToFileURL(fullPath).href);

      if (isConfigModule(mod) && mod.default) {
        return mod.default;
      }

      if (isConfigModule(mod)) {
        return mod as IConfiguration;
      }
    }
  }

  return defaultConfig;
}
