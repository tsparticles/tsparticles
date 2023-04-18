import type { Engine } from "tsparticles-engine";
import { PerlinNoiseGenerator } from "./PerlinNoiseGenerator";

export const perlinNoisePathName = "perlinNoise";

/**
 * @param engine -
 */
export async function loadPerlinNoisePath(engine: Engine): Promise<void> {
    await engine.addPathGenerator(perlinNoisePathName, new PerlinNoiseGenerator());
}
