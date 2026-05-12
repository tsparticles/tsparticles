import { type Engine } from "@tsparticles/engine";
import { ExportVideoPlugin } from "./ExportVideoPlugin.js";

declare const __VERSION__: string;

/**
 * Loads the video export plugin for tsParticles
 * @param engine
 */
export async function loadExportVideoPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addPlugin(new ExportVideoPlugin());
  });
}
