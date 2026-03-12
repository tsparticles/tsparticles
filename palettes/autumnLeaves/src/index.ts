import { type Engine } from "@tsparticles/engine";

const paletteName = "autumn-leaves";

/**
 * @param engine -
 */
export async function loadAutumnLeavesPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
