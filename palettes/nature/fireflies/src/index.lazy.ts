import { type Engine } from "@tsparticles/engine/lazy";

const paletteName = "fireflies";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadFirefliesPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
