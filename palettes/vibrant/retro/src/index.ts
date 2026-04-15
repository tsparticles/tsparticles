import { type Engine } from "@tsparticles/engine";
const paletteName = "vibrant-retro";
/**
 * @param engine -
 */
export async function loadVibrantRetroPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");
    e.pluginManager.addPalette(paletteName, options);
  });
}
