import { type Engine } from "@tsparticles/engine";

const paletteName = "volcanic-ash";

/**
 * @param engine -
 */
export async function loadVolcanicAshPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
