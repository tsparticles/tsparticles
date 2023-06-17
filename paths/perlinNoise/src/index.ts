import type { Engine } from "tsparticles-engine";
import { PerlinNoiseGenerator } from "./PerlinNoiseGenerator";

export const perlinNoisePathName = "perlinNoise";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadPerlinNoisePath(engine: Engine, refresh = false): Promise<void> {
    await engine.addPathGenerator(perlinNoisePathName, new PerlinNoiseGenerator(), refresh);
}
