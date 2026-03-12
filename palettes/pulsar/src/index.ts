import { type Engine } from "@tsparticles/engine";

const paletteName = "pulsar";

/**
 * @param engine -
 */
export async function loadPulsarPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
