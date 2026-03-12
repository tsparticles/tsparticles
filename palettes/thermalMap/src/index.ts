import { type Engine } from "@tsparticles/engine";

const paletteName = "thermal-map";

/**
 * @param engine -
 */
export async function loadThermalMapPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
