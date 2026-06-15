import { type Engine } from "@tsparticles/engine";
import { ShadowDrawer } from "./ShadowDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadShadowEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addEffect("shadow", container => {
      return Promise.resolve(new ShadowDrawer(e.pluginManager, container));
    });
  });
}
