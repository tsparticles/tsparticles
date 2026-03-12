import { type Engine } from "@tsparticles/engine";

const paletteName = "sunset-binary";

/**
 * @param engine -
 */
export async function loadSunsetBinaryPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
