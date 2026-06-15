import { type Engine } from "@tsparticles/engine";
import { GradientUpdater } from "./GradientUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadGradientUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("gradient", container => {
      return Promise.resolve(new GradientUpdater(e.pluginManager, container));
    });
  });
}
