import type { Engine } from "@tsparticles/engine";
import { MotionPlugin } from "./MotionPlugin.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export async function loadMotionPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addPlugin(new MotionPlugin());
  });
}
