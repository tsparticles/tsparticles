import { type Engine } from "@tsparticles/engine";

const paletteName = "cmy-secondaries";

/**
 * @param engine -
 */
export async function loadCmySecondariesPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
