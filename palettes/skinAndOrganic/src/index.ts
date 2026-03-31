import { type Engine } from "@tsparticles/engine";

const paletteName = "skin-and-organic";

/**
 * @param engine -
 */
export async function loadSkinAndOrganicPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
