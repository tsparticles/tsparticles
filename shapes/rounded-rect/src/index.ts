import { type Engine } from "@tsparticles/engine";
import { RoundedRectDrawer } from "./RoundedRectDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadRoundedRectShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["rounded-rect"], () => Promise.resolve(new RoundedRectDrawer()));
  });
}
