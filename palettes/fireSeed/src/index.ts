import { type Engine } from "@tsparticles/engine";

const paletteName = "fire-seed";

/**
 * @param engine -
 */
export async function loadFireSeedPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
