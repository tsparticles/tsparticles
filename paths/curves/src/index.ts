import { CurvesPathGenerator } from "./CurvesPathGenerator";
import type { Engine } from "tsparticles-engine";

export const curvesPathName = "curvesPathGenerator";

/**
 *
 * @param engine
 */
export async function loadCurvesPath(engine: Engine): Promise<void> {
    await engine.addPathGenerator(curvesPathName, new CurvesPathGenerator());
}
