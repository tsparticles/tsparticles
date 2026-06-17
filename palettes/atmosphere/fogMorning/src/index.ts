import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "fog-morning";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadFogMorningPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
