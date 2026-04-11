import { type Engine } from "@tsparticles/engine";

const paletteName = "colored-smoke-blue";

/**
 * @param engine -
 */
export async function loadColoredSmokeBluePalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
