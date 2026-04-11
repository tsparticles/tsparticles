import { type Engine } from "@tsparticles/engine";

const paletteName = "nuclear-glow";

/**
 * @param engine -
 */
export async function loadNuclearGlowPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
