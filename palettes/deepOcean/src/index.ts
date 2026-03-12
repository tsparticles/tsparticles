import { type Engine } from "@tsparticles/engine";

const paletteName = "deep-ocean";

/**
 * @param engine -
 */
export async function loadDeepOceanPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
