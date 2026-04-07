import { type Engine } from "@tsparticles/engine";

const paletteName = "spring-bloom";

/**
 * @param engine -
 */
export async function loadSpringBloomPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
