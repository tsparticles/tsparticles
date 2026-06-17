import { type MoveEngine, ensureBaseMoverLoaded } from "@tsparticles/plugin-move";
import { CurlNoiseGenerator } from "./CurlNoiseGenerator.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const curlNoisePathName = "curlNoise";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadCurlNoisePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: MoveEngine) => {
    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(curlNoisePathName, container => {
      return Promise.resolve(new CurlNoiseGenerator(container));
    });
  });
}
