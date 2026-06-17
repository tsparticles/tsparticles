import { type Engine } from "@tsparticles/engine/lazy";

const paletteName = "pastel-warm";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadPastelWarmPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
