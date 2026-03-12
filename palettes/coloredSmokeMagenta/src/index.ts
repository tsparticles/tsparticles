import { type Engine } from "@tsparticles/engine";

const paletteName = "colored-smoke-magenta";

/**
 * @param engine -
 */
export async function loadColoredSmokeMagentaPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
