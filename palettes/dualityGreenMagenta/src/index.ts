import { type Engine } from "@tsparticles/engine";

const paletteName = "duality-green-magenta";

/**
 * @param engine -
 */
export async function loadDualityGreenMagentaPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
