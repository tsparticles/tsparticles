import type { Container } from "@tsparticles/engine";
import { FractalNoise } from "@tsparticles/fractal-noise";
import { NoiseFieldGenerator } from "@tsparticles/noise-field";

/** Fractal noise path generator for particle motion */
export class FractalNoiseGenerator extends NoiseFieldGenerator {
  constructor(container: Container) {
    const fractalNoise = new FractalNoise();

    super(container, {
      noise4d: (x, y, z, w) => fractalNoise.noise4d(x, y, z, w),
      seed: seed => {
        fractalNoise.seed(seed);
      },
    });
  }
}
