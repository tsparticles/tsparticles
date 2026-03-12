import { type Engine } from "@tsparticles/engine";

const paletteName = "embers-and-ash";

/**
 * @param engine -
 */
export async function loadEmbersAndAshPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
