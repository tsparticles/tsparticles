import { type Engine } from "@tsparticles/engine";

const paletteName = "duality-blue-yellow";

/**
 * @param engine -
 */
export async function loadDualityBlueYellowPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
