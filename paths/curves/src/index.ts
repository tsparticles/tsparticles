import type { Engine } from "tsparticles";
import { curvesPathGenerator } from "./pathGen";

export const curvesPathName = "curvesPathGenerator";

export function loadCurvesPath(engine: Engine): void {
    engine.addPathGenerator(curvesPathName, curvesPathGenerator);
}
