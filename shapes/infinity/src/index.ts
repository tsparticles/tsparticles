import { type Engine } from "@tsparticles/engine";
import { InfinityDrawer } from "./InfinityDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadInfinityShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["infinity"], () => Promise.resolve(new InfinityDrawer()));
  });
}
