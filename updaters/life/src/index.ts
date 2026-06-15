import { type Engine } from "@tsparticles/engine";
import { LifeUpdater } from "./LifeUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadLifeUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("life", container => {
      return Promise.resolve(new LifeUpdater(container));
    });
  });
}
