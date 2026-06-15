import { type Engine } from "@tsparticles/engine/lazy";

const paletteName = "bokeh-cold";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadBokehColdPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
