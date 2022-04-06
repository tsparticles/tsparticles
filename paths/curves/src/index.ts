import { CurvesPathGenerator } from "./CurvesPathGenerator";
import type { Engine } from "tsparticles-engine";

export const curvesPathName = "curvesPathGenerator";

export function loadCurvesPath(engine: Engine): void {
    engine.addPathGenerator(curvesPathName, new CurvesPathGenerator());
}
