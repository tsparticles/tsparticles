import { type Engine } from "@tsparticles/engine";
import { PaintUpdater } from "./PaintUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadPaintUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("paint", container => {
      return Promise.resolve(new PaintUpdater(e.pluginManager, container));
    });
  });
}
