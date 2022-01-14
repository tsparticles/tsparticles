import type { Engine } from "tsparticles";
import { simplexNoiseGenerator } from "./pathGen";

export const simplexNoisePathName = "simplexNoise";

export function loadSimplexNoisePath(engine: Engine): void {
    engine.addPathGenerator(simplexNoisePathName, simplexNoiseGenerator);
}
