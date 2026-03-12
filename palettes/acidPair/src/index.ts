import { type Engine } from "@tsparticles/engine";

const paletteName = "acid-pair";

/**
 * @param engine -
 */
export async function loadAcidPairPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
