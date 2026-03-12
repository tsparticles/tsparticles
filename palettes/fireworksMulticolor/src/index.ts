import { type Engine } from "@tsparticles/engine";

const paletteName = "fireworks-multicolor";

/**
 * @param engine -
 */
export async function loadFireworksMulticolorPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
