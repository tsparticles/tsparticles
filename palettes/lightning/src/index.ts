import { type Engine } from "@tsparticles/engine";

const paletteName = "lightning";

/**
 * @param engine -
 */
export async function loadLightningPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
