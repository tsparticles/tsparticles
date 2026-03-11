import { type Engine } from "@tsparticles/engine";

const paletteName = "duality-red-cyan";

/**
 * @param engine -
 */
export async function loadDualityRedCyanPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
