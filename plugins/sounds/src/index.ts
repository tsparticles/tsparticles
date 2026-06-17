import { type Engine } from "@tsparticles/engine";
import { SoundsPlugin } from "./SoundsPlugin.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSoundsPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addPlugin(new SoundsPlugin(e));
  });
}
