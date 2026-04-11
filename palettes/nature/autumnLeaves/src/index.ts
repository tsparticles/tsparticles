import { type Engine } from "@tsparticles/engine";

const paletteName = "autumn-leaves";

/**
 * @param engine -
 */
export async function loadAutumnLeavesPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
