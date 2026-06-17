import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

const paletteName = "monochrome-noir";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadMonochromeNoirPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
