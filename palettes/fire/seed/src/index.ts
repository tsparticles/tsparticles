import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "fire-seed";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadFireSeedPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
