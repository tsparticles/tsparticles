import { type Engine } from "@tsparticles/engine";
import { HeartDrawer } from "./HeartDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadHeartShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["heart"], () => Promise.resolve(new HeartDrawer()));
  });
}
