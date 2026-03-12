import { type Engine } from "@tsparticles/engine";

const paletteName = "ink-in-water";

/**
 * @param engine -
 */
export async function loadInkInWaterPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
