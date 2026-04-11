import { type Engine } from "@tsparticles/engine";

const paletteName = "fireworks-neon";

/**
 * @param engine -
 */
export async function loadFireworksNeonPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
