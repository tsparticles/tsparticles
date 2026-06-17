import { type Engine } from "@tsparticles/engine";
import { PathDrawer } from "./PathDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadPathShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["path"], () => Promise.resolve(new PathDrawer()));
  });
}
