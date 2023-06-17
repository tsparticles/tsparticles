import { CurvesPathGenerator } from "./CurvesPathGenerator";
import type { Engine } from "tsparticles-engine";

export const curvesPathName = "curvesPathGenerator";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCurvesPath(engine: Engine, refresh = false): Promise<void> {
    await engine.addPathGenerator(curvesPathName, new CurvesPathGenerator(), refresh);
}
