import type { Engine } from "@tsparticles/engine";
import { OpacityUpdater } from "./OpacityUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance to load the updater for
 */
export async function loadOpacityUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("opacity", container => {
      return Promise.resolve(new OpacityUpdater(container));
    });
  });
}
