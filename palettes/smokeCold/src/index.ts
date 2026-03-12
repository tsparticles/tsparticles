import { type Engine } from "@tsparticles/engine";

const paletteName = "smoke-cold";

/**
 * @param engine -
 */
export async function loadSmokeColdPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
