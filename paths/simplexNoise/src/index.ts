import type { Engine } from "@tsparticles/engine";
import { SimplexNoiseGenerator } from "./SimplexNoiseGenerator.js";

export const simplexNoisePathName = "simplexNoise";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSimplexNoisePath(engine: Engine, refresh = true): Promise<void> {
    await engine.addPathGenerator(simplexNoisePathName, new SimplexNoiseGenerator(), refresh);
}
