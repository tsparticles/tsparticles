import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const curvesPathName = "curvesPathGenerator";

/**
 * @param engine -
 */
export async function loadCurvesPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addPathGenerator(curvesPathName, async container => {
      const { CurvesPathGenerator } = await import("./CurvesPathGenerator.js");

      return new CurvesPathGenerator(container);
    });
  });
}
