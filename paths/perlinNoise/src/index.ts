import type { Engine } from "@tsparticles/engine";

export const perlinNoisePathName = "perlinNoise";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadPerlinNoisePath(engine: Engine, refresh = true): Promise<void> {
    const { PerlinNoiseGenerator } = await import("./PerlinNoiseGenerator.js");

    await engine.addPathGenerator(perlinNoisePathName, new PerlinNoiseGenerator(), refresh);
}
