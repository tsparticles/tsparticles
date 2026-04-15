import { type Engine } from "@tsparticles/engine";

const paletteName = "dust-haze";

/**
 * @param engine -
 */
export async function loadDustHazePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
