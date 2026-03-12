import { type Engine } from "@tsparticles/engine";

const paletteName = "solar-wind";

/**
 * @param engine -
 */
export async function loadSolarWindPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
