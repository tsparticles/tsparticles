import { type Engine } from "@tsparticles/engine";

const paletteName = "confetti-monochrome-green";

/**
 * @param engine -
 */
export async function loadConfettiMonochromeGreenPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const { options } = await import("./options.js");

    e.pluginManager.addPalette(paletteName, options);
  });
}
