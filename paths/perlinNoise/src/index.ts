import type { Main } from "tsparticles";
import { perlinNoiseGenerator } from "./pathGen";

export const perlinNoisePathName = "perlinNoise";

export function loadPerlinNoisePath(tsParticles: Main): void {
    tsParticles.addPathGenerator(perlinNoisePathName, perlinNoiseGenerator);
}
