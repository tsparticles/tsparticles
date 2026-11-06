import type { Engine } from "@tsparticles/engine";
import { HwbColorManager } from "./HwbColorManager.js";

declare const __VERSION__: string;

/**
 * This function is used to load the HWB color plugin
 * @param engine - The engine that will use the plugin
 */
export async function loadHwbColorPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addColorManager("hwb", new HwbColorManager());
  });
}
