import { type Engine } from "@tsparticles/engine";

const paletteName = "rain";

/**
 * @param engine -
 */
export async function loadRainPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
