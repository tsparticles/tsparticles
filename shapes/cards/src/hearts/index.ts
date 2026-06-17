import { type Engine } from "@tsparticles/engine";
import { HeartDrawer } from "./HeartDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadHeartsSuitShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["heart", "hearts"], () => Promise.resolve(new HeartDrawer()));
  });
}
