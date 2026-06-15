import { type Engine } from "@tsparticles/engine/lazy";

const paletteName = "cmy-secondaries";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadCmySecondariesPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
