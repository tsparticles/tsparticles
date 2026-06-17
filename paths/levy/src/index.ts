import { type MoveEngine, ensureBaseMoverLoaded } from "@tsparticles/plugin-move";
import type { Engine } from "@tsparticles/engine";
import { LevyPathGenerator } from "./LevyPathGenerator.js";

declare const __VERSION__: string;

export const levyPathName = "levyPathGenerator";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadLevyPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: MoveEngine) => {
    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(levyPathName, container => {
      return Promise.resolve(new LevyPathGenerator(container));
    });
  });
}
