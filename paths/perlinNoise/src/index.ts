import type { Main } from "tsparticles-engine";
import { perlinNoiseGenerator } from "./pathGen";

export const perlinNoisePathName = "perlinNoise";

export function loadPerlinNoisePath(tsParticles: Main): void {
    tsParticles.addPathGenerator(perlinNoisePathName, perlinNoiseGenerator);
}
