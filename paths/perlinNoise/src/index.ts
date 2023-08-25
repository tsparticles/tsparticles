import type { Engine } from "@tsparticles/engine";
import { PerlinNoiseGenerator } from "./PerlinNoiseGenerator.js";

export const perlinNoisePathName = "perlinNoise";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadPerlinNoisePath(engine: Engine, refresh = true): Promise<void> {
    await engine.addPathGenerator(perlinNoisePathName, new PerlinNoiseGenerator(), refresh);
}
