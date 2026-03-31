import { type Engine } from "@tsparticles/engine";

const paletteName = "acid-pair";

/**
 * @param engine -
 */
export async function loadAcidPairPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
