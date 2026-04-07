import { type Engine } from "@tsparticles/engine";
const paletteName = "monochrome-greens";
/**
 * @param engine -
 */
export async function loadMonochromeGreensPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");
    e.pluginManager.addPalette(paletteName, options);
  });
}
