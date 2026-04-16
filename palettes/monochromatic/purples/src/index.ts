import { type Engine } from "@tsparticles/engine";
const paletteName = "monochrome-purples";
/**
 * @param engine -
 */
export async function loadMonochromePurplesPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");
    e.pluginManager.addPalette(paletteName, options);
  });
}
