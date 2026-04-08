import { type Engine } from "@tsparticles/engine";

const paletteName = "fireworks-purple";

/**
 * @param engine -
 */
export async function loadFireworksPurplePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
