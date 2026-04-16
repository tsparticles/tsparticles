import { type Engine } from "@tsparticles/engine";

const paletteName = "monochrome-reds";

/**
 * @param engine -
 */
export async function loadMonochromeRedsPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
