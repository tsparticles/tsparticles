import type { Engine } from "tsparticles-engine";
import { PerlinNoiseGenerator } from "./PerlinNoiseGenerator";

export const perlinNoisePathName = "perlinNoise";

export function loadPerlinNoisePath(engine: Engine): void {
    engine.addPathGenerator(perlinNoisePathName, new PerlinNoiseGenerator());
}
