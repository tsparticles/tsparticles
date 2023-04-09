import { CurvesPathGenerator } from "./CurvesPathGenerator";
import type { Engine } from "tsparticles-engine";

export const curvesPathName = "curvesPathGenerator";

/**
 *
 * @param engine
 */
export function loadCurvesPath(engine: Engine): void {
    engine.addPathGenerator(curvesPathName, new CurvesPathGenerator());
}
