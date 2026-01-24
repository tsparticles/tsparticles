import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const perlinNoisePathName = "perlinNoise";

/**
 * @param engine -
 */
export async function loadPerlinNoisePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { PerlinNoiseGenerator } = await import("./PerlinNoiseGenerator.js");

    e.addPathGenerator(perlinNoisePathName, new PerlinNoiseGenerator());
  });
}
