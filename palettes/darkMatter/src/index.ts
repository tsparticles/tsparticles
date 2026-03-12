import { type Engine } from "@tsparticles/engine";

const paletteName = "dark-matter";

/**
 * @param engine -
 */
export async function loadDarkMatterPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
