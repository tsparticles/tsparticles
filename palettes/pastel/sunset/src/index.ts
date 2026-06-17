import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";
const paletteName = "pastel-sunset";
/**
 * @param engine - The engine to load the shape in
 */
export async function loadPastelSunsetPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
