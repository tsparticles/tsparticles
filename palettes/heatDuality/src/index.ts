import { type Engine } from "@tsparticles/engine";

const paletteName = "heat-duality";

/**
 * @param engine -
 */
export async function loadHeatDualityPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
