import type { Engine } from "tsparticles-engine";
import { PerlinNoiseGenerator } from "./PerlinNoiseGenerator";

export const perlinNoisePathName = "perlinNoise";

/**
 *
 * @param engine
 */
export function loadPerlinNoisePath(engine: Engine): void {
    engine.addPathGenerator(perlinNoisePathName, new PerlinNoiseGenerator());
}
