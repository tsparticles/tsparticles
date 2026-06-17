import { type MoveEngine, ensureBaseMoverLoaded } from "@tsparticles/plugin-move";
import { type Engine } from "@tsparticles/engine";
import { RandomPathGenerator } from "./RandomPathGenerator.js";

declare const __VERSION__: string;

export const randomPathName = "randomPathGenerator";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadRandomPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: MoveEngine) => {
    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(randomPathName, () => {
      return Promise.resolve(new RandomPathGenerator());
    });
  });
}
