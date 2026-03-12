import { type Engine } from "@tsparticles/engine";

const paletteName = "ice-triad";

/**
 * @param engine -
 */
export async function loadIceTriadPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
