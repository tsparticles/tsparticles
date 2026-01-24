import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const curlNoisePathName = "curlNoise";

/**
 * @param engine -
 */
export async function loadCurlNoisePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { CurlNoiseGenerator } = await import("./CurlNoiseGenerator.js");

    e.addPathGenerator(curlNoisePathName, new CurlNoiseGenerator());
  });
}
