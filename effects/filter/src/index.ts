import { type Engine } from "@tsparticles/engine";
import { FilterDrawer } from "./FilterDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadFilterEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addEffect("filter", () => {
      return Promise.resolve(new FilterDrawer());
    });
  });
}
