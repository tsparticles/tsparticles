import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "apple-green";

/**
 * Register the apple-green palette
 * @param engine - The engine to load the shape in
 */
export async function loadAppleGreenPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
