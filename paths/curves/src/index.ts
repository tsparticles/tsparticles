import { type Engine } from "@tsparticles/engine";
import { type MoveEngine } from "@tsparticles/move-base";

declare const __VERSION__: string;

export const curvesPathName = "curvesPathGenerator";

/**
 * @param engine -
 */
export async function loadCurvesPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/move-base");

    ensureBaseMoverLoaded(e);

    e.addPathGenerator?.(curvesPathName, async container => {
      const { CurvesPathGenerator } = await import("./CurvesPathGenerator.js");

      return new CurvesPathGenerator(container);
    });
  });
}
