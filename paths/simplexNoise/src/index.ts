import type { Engine } from "tsparticles";
import { simplexNoiseGenerator } from "./pathGen";

export const simplexNoisePathName = "simplexNoise";

export function loadSimplexNoisePath(tsParticles: Engine): void {
    tsParticles.addPathGenerator(simplexNoisePathName, simplexNoiseGenerator);
}
