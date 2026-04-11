import { type Engine } from "@tsparticles/engine";
const paletteName = "pastel-sunset";
/**
 * @param engine -
 */
export async function loadPastelSunsetPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");
    e.pluginManager.addPalette(paletteName, options);
  });
}
