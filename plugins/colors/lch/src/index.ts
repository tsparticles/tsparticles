import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * This function is used to load the Lch color plugin
 * @param engine - The engine, used to add the color manager
 */
export async function loadLchColorPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { LchColorManager } = await import("./LchColorManager.js");

    e.addColorManager("lch", new LchColorManager());
  });
}
