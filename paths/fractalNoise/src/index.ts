import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const fractalNoisePathName = "fractalNoise";

/**
 * @param engine -
 */
export async function loadFractalNoisePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { FractalNoiseGenerator } = await import("./FractalNoiseGenerator.js");

    e.addPathGenerator(fractalNoisePathName, new FractalNoiseGenerator());
  });
}
