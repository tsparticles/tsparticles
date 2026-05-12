import { type Engine } from "@tsparticles/engine";
import { ExportJSONPlugin } from "./ExportJSONPlugin.js";

declare const __VERSION__: string;

/**
 * Loads the JSON export plugin for tsParticles
 * @param engine
 */
export async function loadExportJSONPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addPlugin(new ExportJSONPlugin());
  });
}
