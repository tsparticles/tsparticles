import type { Engine } from "@tsparticles/engine";

export const curlNoisePathName = "curlNoise";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCurlNoisePath(engine: Engine, refresh = true): Promise<void> {
    const { CurlNoiseGenerator } = await import("./CurlNoiseGenerator.js");

    await engine.addPathGenerator(curlNoisePathName, new CurlNoiseGenerator(), refresh);
}
