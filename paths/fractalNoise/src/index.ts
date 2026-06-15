import { type MoveEngine, ensureBaseMoverLoaded } from "@tsparticles/plugin-move";
import { type Engine } from "@tsparticles/engine";
import { FractalNoiseGenerator } from "./FractalNoiseGenerator.js";

declare const __VERSION__: string;

export const fractalNoisePathName = "fractalNoise";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadFractalNoisePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: MoveEngine) => {
    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(fractalNoisePathName, container => {
      return Promise.resolve(new FractalNoiseGenerator(container));
    });
  });
}
