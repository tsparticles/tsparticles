import { type Engine } from "@tsparticles/engine";

const paletteName = "neon-city";

/**
 * @param engine -
 */
export async function loadNeonCityPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
