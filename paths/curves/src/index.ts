import type { Engine } from "tsparticles-engine";
import { CurvesPathGenerator } from "./CurvesPathGenerator";

export const curvesPathName = "curvesPathGenerator";

export function loadCurvesPath(engine: Engine): void {
    engine.addPathGenerator(curvesPathName, new CurvesPathGenerator());
}
