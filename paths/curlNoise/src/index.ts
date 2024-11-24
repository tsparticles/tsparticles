import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { CurlNoiseGenerator } from "./CurlNoiseGenerator.js";

declare const __VERSION__: string;

export const curlNoisePathName = "curlNoise";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCurlNoisePath(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addPathGenerator(curlNoisePathName, new CurlNoiseGenerator(), refresh);
}
