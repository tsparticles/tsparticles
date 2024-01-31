import type { Engine } from "@tsparticles/engine";

export const curvesPathName = "curvesPathGenerator";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCurvesPath(engine: Engine, refresh = true): Promise<void> {
    const { CurvesPathGenerator } = await import("./CurvesPathGenerator.js");

    await engine.addPathGenerator(curvesPathName, new CurvesPathGenerator(), refresh);
}
