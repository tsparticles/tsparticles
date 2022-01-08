import type { Engine } from "tsparticles";
import { perlinNoiseGenerator } from "./pathGen";

export const perlinNoisePathName = "perlinNoise";

export function loadPerlinNoisePath(tsParticles: Engine): void {
    tsParticles.addPathGenerator(perlinNoisePathName, perlinNoiseGenerator);
}
