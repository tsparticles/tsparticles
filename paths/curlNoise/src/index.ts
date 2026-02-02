import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const curlNoisePathName = "curlNoise";

/**
 * @param engine -
 */
export async function loadCurlNoisePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addPathGenerator(curlNoisePathName, async container => {
      const { CurlNoiseGenerator } = await import("./CurlNoiseGenerator.js");

      return new CurlNoiseGenerator(container);
    });
  });
}
