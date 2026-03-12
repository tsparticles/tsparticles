import { type Engine } from "@tsparticles/engine";

const paletteName = "explosion-debris";

/**
 * @param engine -
 */
export async function loadExplosionDebrisPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
