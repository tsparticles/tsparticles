import { type Engine } from "@tsparticles/engine";
import { WobbleUpdater } from "./WobbleUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadWobbleUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("wobble", container => {
      return Promise.resolve(new WobbleUpdater(container));
    });
  });
}
