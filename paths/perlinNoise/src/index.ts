import type { Engine } from "tsparticles-engine";
import { perlinNoiseGenerator } from "./pathGen";

export const perlinNoisePathName = "perlinNoise";

export async function loadPerlinNoisePath(engine: Engine): Promise<void> {
    await engine.addPathGenerator(perlinNoisePathName, perlinNoiseGenerator);
}
