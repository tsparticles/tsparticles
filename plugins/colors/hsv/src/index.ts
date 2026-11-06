import type { Engine } from "@tsparticles/engine";
import { HsvColorManager } from "./HsvColorManager.js";

declare const __VERSION__: string;

/**
 * This function is used to load the HSV color plugin
 * @param engine - The engine that will use the plugin
 */
export async function loadHsvColorPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addColorManager("hsv", new HsvColorManager());
  });
}
