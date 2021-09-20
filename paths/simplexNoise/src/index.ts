import type { Main } from "tsparticles-engine";
import { simplexNoiseGenerator } from "./pathGen";

export const simplexNoisePathName = "simplexNoise";

export function loadSimplexNoisePath(tsParticles: Main): void {
    tsParticles.addPathGenerator(simplexNoisePathName, simplexNoiseGenerator);
}
