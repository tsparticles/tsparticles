import { type Engine } from "@tsparticles/engine";

const paletteName = "water-splash";

/**
 * @param engine -
 */
export async function loadWaterSplashPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
