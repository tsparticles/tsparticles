import { type Engine } from "@tsparticles/engine";

const paletteName = "portal";

/**
 * @param engine -
 */
export async function loadPortalPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
