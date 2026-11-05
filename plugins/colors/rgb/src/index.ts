import type { Engine } from "@tsparticles/engine";
import { RgbColorManager } from "./RgbColorManager.js";

declare const __VERSION__: string;

/**
 * This function is used to load the RGB color plugin
 * @param engine - The engine that will use the plugin
 */
export async function loadRgbColorPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addColorManager("rgb", new RgbColorManager());
  });
}
