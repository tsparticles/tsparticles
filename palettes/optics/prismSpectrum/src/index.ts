import { type Engine } from "@tsparticles/engine";

const paletteName = "prism-spectrum";

/**
 * @param engine -
 */
export async function loadPrismSpectrumPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
