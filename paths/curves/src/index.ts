import type { Engine } from "tsparticles";
import { CurvesPathGenerator } from "./pathGen";

export const curvesPathName = "curvesPathGenerator";

export function loadCurvesPath(engine: Engine): void {
    engine.addPathGenerator(curvesPathName, new CurvesPathGenerator());
}
