import { type Engine } from "@tsparticles/engine";
import { StarDrawer } from "./StarDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadStarShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["star"], () => Promise.resolve(new StarDrawer()));
  });
}
