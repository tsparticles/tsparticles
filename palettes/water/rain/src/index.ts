import { type Engine } from "@tsparticles/engine";

const paletteName = "rain";

/**
 * @param engine -
 */
export async function loadRainPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
