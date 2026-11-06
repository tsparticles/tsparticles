import type { Engine } from "@tsparticles/engine";
import { TiltUpdater } from "./TiltUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the updater for
 */
export async function loadTiltUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("tilt", container => {
      return Promise.resolve(new TiltUpdater(container));
    });
  });
}
