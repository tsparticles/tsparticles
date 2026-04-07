import { type Engine } from "@tsparticles/engine";

const paletteName = "okabe-ito-accessible";

/**
 * @param engine -
 */
export async function loadOkabeItoAccessiblePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
