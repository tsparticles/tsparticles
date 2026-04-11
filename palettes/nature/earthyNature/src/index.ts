import { type Engine } from "@tsparticles/engine";
const paletteName = "earthy-nature";
/**
 * @param engine -
 */
export async function loadEarthyNaturePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");
    e.pluginManager.addPalette(paletteName, options);
  });
}
