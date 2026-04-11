import { type Engine } from "@tsparticles/engine";

const paletteName = "fog-morning";

/**
 * @param engine -
 */
export async function loadFogMorningPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
