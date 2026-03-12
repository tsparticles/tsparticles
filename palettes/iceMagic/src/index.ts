import { type Engine } from "@tsparticles/engine";

const paletteName = "ice-magic";

/**
 * @param engine -
 */
export async function loadIceMagicPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
