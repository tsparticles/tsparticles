import { type Engine } from "@tsparticles/engine";

const paletteName = "fog-coastal";

/**
 * @param engine -
 */
export async function loadFogCoastalPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
