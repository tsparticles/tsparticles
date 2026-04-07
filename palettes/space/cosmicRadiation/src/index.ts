import { type Engine } from "@tsparticles/engine";

const paletteName = "cosmic-radiation";

/**
 * @param engine -
 */
export async function loadCosmicRadiationPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
