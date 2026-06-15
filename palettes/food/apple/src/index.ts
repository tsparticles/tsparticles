import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "apple";

/**
 * Register the apple palette only. Red/Green variants live in their own packages.
 * @param engine - The engine to load the shape in
 */
export async function loadApplePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
