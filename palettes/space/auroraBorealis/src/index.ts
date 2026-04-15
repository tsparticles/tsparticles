import { type Engine } from "@tsparticles/engine";

const paletteName = "aurora-borealis";

/**
 * @param engine -
 */
export async function loadAuroraBorealisPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
