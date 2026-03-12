import { type Engine } from "@tsparticles/engine";

const paletteName = "snowfall";

/**
 * @param engine -
 */
export async function loadSnowfallPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
