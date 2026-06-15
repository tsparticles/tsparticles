import { type Engine } from "@tsparticles/engine";
import { OrbitUpdater } from "./OrbitUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadOrbitUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("orbit", container => {
      return Promise.resolve(new OrbitUpdater(e.pluginManager, container));
    });
  });
}
