import { type Engine } from "@tsparticles/engine";
const paletteName = "vibrant-neon";
/**
 * @param engine -
 */
export async function loadVibrantNeonPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");
    e.pluginManager.addPalette(paletteName, options);
  });
}
