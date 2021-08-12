import type { Main } from "tsparticles";
import { curvesPathGenerator } from "./pathGen";

export const curvesPathName = "curvesPathGenerator";

export function loadCurvesPath(tsParticles: Main): void {
    tsParticles.addPathGenerator(curvesPathName, curvesPathGenerator);
}
