import { type Engine } from "@tsparticles/engine/lazy";

const paletteName = "bell-peppers";

/**
 *
 * @param engine - The engine to load the shape in
 */
export async function loadBellPeppersPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
