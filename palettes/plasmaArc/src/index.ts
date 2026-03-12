import { type Engine } from "@tsparticles/engine";

const paletteName = "plasma-arc";

/**
 * @param engine -
 */
export async function loadPlasmaArcPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
