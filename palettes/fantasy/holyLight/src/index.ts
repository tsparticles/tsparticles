import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "holy-light";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadHolyLightPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
