import { type Engine } from "@tsparticles/engine";
import { RoundedPolygonDrawer } from "./RoundedPolygonDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadRoundedPolygonShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["rounded-polygon"], () => Promise.resolve(new RoundedPolygonDrawer()));
  });
}
