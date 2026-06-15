import { type Engine } from "@tsparticles/engine";
import { LineDrawer } from "./LineDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadLineShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["line"], () => Promise.resolve(new LineDrawer()));
  });
}
