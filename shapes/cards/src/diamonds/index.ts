import { DiamondDrawer } from "./DiamondDrawer.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadDiamondsSuitShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["diamond", "diamonds"], () => Promise.resolve(new DiamondDrawer()));
  });
}
