import { type Engine } from "@tsparticles/engine/lazy";

const paletteName = "lava-lamp";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadLavaLampPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
