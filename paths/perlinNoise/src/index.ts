import type { Engine } from "tsparticles-engine";
import { perlinNoiseGenerator } from "./pathGen";

export const perlinNoisePathName = "perlinNoise";

export async function loadPerlinNoisePath(tsParticles: Engine): Promise<void> {
    await tsParticles.addPathGenerator(perlinNoisePathName, perlinNoiseGenerator);
}
