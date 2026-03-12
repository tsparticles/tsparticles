import { type Engine } from "@tsparticles/engine";

const paletteName = "lens-flare-dust";

/**
 * @param engine -
 */
export async function loadLensFlareDustPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
