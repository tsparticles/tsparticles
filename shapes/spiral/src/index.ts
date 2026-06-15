import { type Engine } from "@tsparticles/engine";
import { SpiralDrawer } from "./SpiralDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSpiralShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["spiral"], () => Promise.resolve(new SpiralDrawer()));
  });
}
