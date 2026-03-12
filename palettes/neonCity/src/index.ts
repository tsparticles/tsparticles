import { type Engine } from "@tsparticles/engine";

const paletteName = "neon-city";

/**
 * @param engine -
 */
export async function loadNeonCityPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
