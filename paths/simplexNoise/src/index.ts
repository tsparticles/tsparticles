import { type MoveEngine, ensureBaseMoverLoaded } from "@tsparticles/plugin-move";
import { type Engine } from "@tsparticles/engine";
import { SimplexNoiseGenerator } from "./SimplexNoiseGenerator.js";

declare const __VERSION__: string;

export const simplexNoisePathName = "simplexNoise";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSimplexNoisePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: MoveEngine) => {
    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(simplexNoisePathName, container => {
      return Promise.resolve(new SimplexNoiseGenerator(container));
    });
  });
}
