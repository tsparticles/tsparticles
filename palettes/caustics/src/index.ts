import { type Engine } from "@tsparticles/engine";

const paletteName = "caustics";

/**
 * @param engine -
 */
export async function loadCausticsPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
