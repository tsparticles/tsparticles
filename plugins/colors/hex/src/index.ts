import type { Engine } from "@tsparticles/engine";
import { HexColorManager } from "./HexColorManager.js";

declare const __VERSION__: string;

/**
 * This function is used to load the hex color plugin
 * @param engine - The engine that will use the plugin
 */
export async function loadHexColorPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addColorManager("hex", new HexColorManager());
  });
}
