import { type Engine } from "@tsparticles/engine";

const paletteName = "heat-haze";

/**
 * @param engine -
 */
export async function loadHeatHazePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
