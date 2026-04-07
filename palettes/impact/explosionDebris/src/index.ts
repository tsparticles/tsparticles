import { type Engine } from "@tsparticles/engine";

const paletteName = "explosion-debris";

/**
 * @param engine -
 */
export async function loadExplosionDebrisPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
