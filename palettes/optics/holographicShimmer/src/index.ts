import { type Engine } from "@tsparticles/engine";

const paletteName = "holographic-shimmer";

/**
 * @param engine -
 */
export async function loadHolographicShimmerPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
