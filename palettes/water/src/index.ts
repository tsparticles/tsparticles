import { type Engine } from "@tsparticles/engine";

const paletteName = "water";

/**
 * @param engine -
 */
export async function loadWaterPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
