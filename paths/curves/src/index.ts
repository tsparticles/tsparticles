import type { Engine } from "tsparticles-engine";
import { curvesPathGenerator } from "./pathGen";

export const curvesPathName = "curvesPathGenerator";

export function loadCurvesPath(tsParticles: Engine): void {
    tsParticles.addPathGenerator(curvesPathName, curvesPathGenerator);
}
