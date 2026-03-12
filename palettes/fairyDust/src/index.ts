import { type Engine } from "@tsparticles/engine";

const paletteName = "fairy-dust";

/**
 * @param engine -
 */
export async function loadFairyDustPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
