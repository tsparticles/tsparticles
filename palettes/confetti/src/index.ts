import { type Engine } from "@tsparticles/engine";

const paletteName = "confetti";

/**
 * @param engine -
 */
export async function loadConfettiPalette(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { options } = await import("./options.js");

    e.addPalette(paletteName, options);
  });
}
