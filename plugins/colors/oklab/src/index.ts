import type { Engine } from "@tsparticles/engine";
import { OklabColorManager } from "./OklabColorManager.js";

declare const __VERSION__: string;

/**
 * This function is used to load the Oklab color plugin
 * @param engine - The engine, used to add the color manager
 */
export async function loadOklabColorPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addColorManager("oklab", new OklabColorManager());
  });
}
