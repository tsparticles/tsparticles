import { type Engine } from "@tsparticles/engine";

const paletteName = "aurora-borealis";

/**
 * @param engine -
 */
export async function loadAuroraBorealisPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
