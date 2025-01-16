import { CurlNoiseGenerator } from "./CurlNoiseGenerator.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const curlNoisePathName = "curlNoise";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCurlNoisePath(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPathGenerator(curlNoisePathName, new CurlNoiseGenerator(), refresh);
}
