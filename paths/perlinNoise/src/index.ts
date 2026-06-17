import { type MoveEngine, ensureBaseMoverLoaded } from "@tsparticles/plugin-move";
import { type Engine } from "@tsparticles/engine";
import { PerlinNoiseGenerator } from "./PerlinNoiseGenerator.js";

declare const __VERSION__: string;

export const perlinNoisePathName = "perlinNoise";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadPerlinNoisePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: MoveEngine) => {
    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(perlinNoisePathName, container => {
      return Promise.resolve(new PerlinNoiseGenerator(container));
    });
  });
}
