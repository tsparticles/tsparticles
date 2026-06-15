import { type MoveEngine, ensureBaseMoverLoaded } from "@tsparticles/plugin-move";
import { CurvesPathGenerator } from "./CurvesPathGenerator.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const curvesPathName = "curvesPathGenerator";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadCurvesPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: MoveEngine) => {
    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(curvesPathName, container => {
      return Promise.resolve(new CurvesPathGenerator(container));
    });
  });
}
