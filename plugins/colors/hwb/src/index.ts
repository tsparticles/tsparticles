import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * This function is used to load the HWB color plugin
 * @param engine - The engine that will use the plugin
 */
export async function loadHwbColorPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { HwbColorManager } = await import("./HwbColorManager.js");

    e.addColorManager("hwb", new HwbColorManager());
  });
}
