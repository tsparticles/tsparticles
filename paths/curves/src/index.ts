import { CurvesPathGenerator } from "./CurvesPathGenerator.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const curvesPathName = "curvesPathGenerator";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCurvesPath(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPathGenerator(curvesPathName, new CurvesPathGenerator(), refresh);
}
