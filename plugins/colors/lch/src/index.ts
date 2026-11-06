import type { Engine } from "@tsparticles/engine";
import { LchColorManager } from "./LchColorManager.js";

declare const __VERSION__: string;

/**
 * This function is used to load the Lch color plugin
 * @param engine - The engine, used to add the color manager
 */
export async function loadLchColorPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addColorManager("lch", new LchColorManager());
  });
}
