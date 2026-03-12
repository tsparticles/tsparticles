import { type Engine } from "@tsparticles/engine";

const paletteName = "dandelion-seeds";

/**
 * @param engine -
 */
export async function loadDandelionSeedsPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
