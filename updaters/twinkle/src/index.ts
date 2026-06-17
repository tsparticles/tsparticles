import { type Engine } from "@tsparticles/engine";
import { TwinkleUpdater } from "./TwinkleUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadTwinkleUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("twinkle", container => {
      return Promise.resolve(new TwinkleUpdater(e.pluginManager, container));
    });
  });
}
