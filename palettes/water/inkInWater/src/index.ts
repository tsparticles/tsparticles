import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "ink-in-water";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadInkInWaterPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
