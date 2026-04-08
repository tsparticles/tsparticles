import { type Engine } from "@tsparticles/engine";

const paletteName = "fireworks-copper-stroke";

/**
 * @param engine -
 */
export async function loadFireworksCopperStrokePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
