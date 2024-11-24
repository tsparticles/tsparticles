import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { PerlinNoiseGenerator } from "./PerlinNoiseGenerator.js";

declare const __VERSION__: string;

export const perlinNoisePathName = "perlinNoise";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadPerlinNoisePath(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addPathGenerator(perlinNoisePathName, new PerlinNoiseGenerator(), refresh);
}
