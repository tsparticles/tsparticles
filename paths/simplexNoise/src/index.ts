import { type Engine } from "@tsparticles/engine";
import { SimplexNoiseGenerator } from "./SimplexNoiseGenerator.js";

declare const __VERSION__: string;

export const simplexNoisePathName = "simplexNoise";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSimplexNoisePath(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPathGenerator(simplexNoisePathName, new SimplexNoiseGenerator(), refresh);
}
