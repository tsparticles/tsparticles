import type { Engine } from "tsparticles-engine";
import { SimplexNoiseGenerator } from "./SimplexNoiseGenerator";

export const simplexNoisePathName = "simplexNoise";

/**
 *
 * @param engine -
 */
export async function loadSimplexNoisePath(engine: Engine): Promise<void> {
    await engine.addPathGenerator(simplexNoisePathName, new SimplexNoiseGenerator());
}
