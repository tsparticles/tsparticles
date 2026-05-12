import { type Engine } from "@tsparticles/engine";
import { ExportImagePlugin } from "./ExportImagePlugin.js";

declare const __VERSION__: string;

/**
 * Loads the image export plugin for tsParticles
 * @param engine
 */
export async function loadExportImagePlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addPlugin(new ExportImagePlugin());
  });
}
