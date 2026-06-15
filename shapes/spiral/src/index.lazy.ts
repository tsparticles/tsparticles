import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSpiralShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { SpiralDrawer } = await import("./SpiralDrawer.js");

    e.pluginManager.addShape(["spiral"], () => Promise.resolve(new SpiralDrawer()));
  });
}
