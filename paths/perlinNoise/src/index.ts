import type { Engine } from "tsparticles";
import { PerlinNoiseGenerator } from "./PerlinNoiseGenerator";

export const perlinNoisePathName = "perlinNoise";

export function loadPerlinNoisePath(engine: Engine): void {
    engine.addPathGenerator(perlinNoisePathName, new PerlinNoiseGenerator());
}
