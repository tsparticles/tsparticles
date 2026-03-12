import { type Engine } from "@tsparticles/engine";

const paletteName = "molten-metal";

/**
 * @param engine -
 */
export async function loadMoltenMetalPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
