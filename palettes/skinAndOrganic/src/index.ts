import { type Engine } from "@tsparticles/engine";

const paletteName = "skin-and-organic";

/**
 * @param engine -
 */
export async function loadSkinAndOrganicPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
