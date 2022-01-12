import type { Engine } from "tsparticles";
import { perlinNoiseGenerator } from "./pathGen";

export const perlinNoisePathName = "perlinNoise";

export function loadPerlinNoisePath(engine: Engine): void {
    engine.addPathGenerator(perlinNoisePathName, perlinNoiseGenerator);
}
