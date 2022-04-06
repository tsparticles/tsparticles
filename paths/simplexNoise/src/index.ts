import type { Engine } from "tsparticles-engine";
import { SimplexNoiseGenerator } from "./SimplexNoiseGenerator";

export const simplexNoisePathName = "simplexNoise";

export function loadSimplexNoisePath(engine: Engine): void {
    engine.addPathGenerator(simplexNoisePathName, new SimplexNoiseGenerator());
}
