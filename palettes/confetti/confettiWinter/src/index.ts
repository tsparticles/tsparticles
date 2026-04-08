import { type Engine } from "@tsparticles/engine";

const paletteName = "confetti-winter";

/**
 * @param engine -
 */
export async function loadConfettiWinterPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
