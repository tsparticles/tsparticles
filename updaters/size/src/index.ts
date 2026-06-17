import { type Engine } from "@tsparticles/engine";
import { SizeUpdater } from "./SizeUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSizeUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("size", container => {
      return Promise.resolve(new SizeUpdater(container));
    });
  });
}
