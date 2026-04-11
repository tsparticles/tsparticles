import { type Engine } from "@tsparticles/engine";

const paletteName = "fireworks-copper";

/**
 * @param engine -
 */
export async function loadFireworksCopperPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
