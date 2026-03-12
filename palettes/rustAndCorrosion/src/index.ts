import { type Engine } from "@tsparticles/engine";

const paletteName = "rust-and-corrosion";

/**
 * @param engine -
 */
export async function loadRustAndCorrosionPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
