import type { Engine } from "@tsparticles/engine";
import { TrailPlugin } from "./TrailPlugin.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export async function loadTrailPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addPlugin(new TrailPlugin(e.pluginManager));
  });
}
