import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const simplexNoisePathName = "simplexNoise";

/**
 * @param engine -
 */
export async function loadSimplexNoisePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { SimplexNoiseGenerator } = await import("./SimplexNoiseGenerator.js");

    e.addPathGenerator(simplexNoisePathName, new SimplexNoiseGenerator());
  });
}
