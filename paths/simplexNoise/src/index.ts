import type { Engine } from "@tsparticles/engine";

export const simplexNoisePathName = "simplexNoise";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSimplexNoisePath(engine: Engine, refresh = true): Promise<void> {
    const { SimplexNoiseGenerator } = await import("./SimplexNoiseGenerator.js");

    await engine.addPathGenerator(simplexNoisePathName, new SimplexNoiseGenerator(), refresh);
}
