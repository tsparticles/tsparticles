import type { Engine } from "@tsparticles/engine";
import { RollUpdater } from "./RollUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export async function loadRollUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("roll", () => {
      return Promise.resolve(new RollUpdater(e.pluginManager));
    });
  });
}
