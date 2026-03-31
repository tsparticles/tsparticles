import { type Engine } from "@tsparticles/engine";

const paletteName = "foam-and-bubbles";

/**
 * @param engine -
 */
export async function loadFoamAndBubblesPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
