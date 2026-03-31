import { type Engine } from "@tsparticles/engine";

const paletteName = "plasma-arc";

/**
 * @param engine -
 */
export async function loadPlasmaArcPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
