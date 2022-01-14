import type { Engine } from "tsparticles-engine";
import { simplexNoiseGenerator } from "./pathGen";

export const simplexNoisePathName = "simplexNoise";

export function loadSimplexNoisePath(engine: Engine): void {
    engine.addPathGenerator(simplexNoisePathName, simplexNoiseGenerator);
}
