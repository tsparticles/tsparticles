import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { CurvesPathGenerator } from "./CurvesPathGenerator.js";

declare const __VERSION__: string;

export const curvesPathName = "curvesPathGenerator";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCurvesPath(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addPathGenerator(curvesPathName, new CurvesPathGenerator(), refresh);
}
