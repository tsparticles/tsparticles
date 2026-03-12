import { type Engine } from "@tsparticles/engine";

const paletteName = "blood-and-gore";

/**
 * @param engine -
 */
export async function loadBloodAndGorePalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
