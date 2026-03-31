import { type Engine } from "@tsparticles/engine";

const paletteName = "lava-lamp";

/**
 * @param engine -
 */
export async function loadLavaLampPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
