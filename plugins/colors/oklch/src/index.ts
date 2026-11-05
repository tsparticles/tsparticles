import type { Engine } from "@tsparticles/engine";
import { OklchColorManager } from "./OklchColorManager.js";

declare const __VERSION__: string;

/**
 * This function is used to load the Oklch color plugin
 * @param engine - The engine, used to add the color manager
 */
export async function loadOklchColorPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addColorManager("oklch", new OklchColorManager());
  });
}
