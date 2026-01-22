import { FractalNoise } from "@tsparticles/fractal-noise";
import { NoiseFieldGenerator } from "@tsparticles/noise-field";

export class FractalNoiseGenerator extends NoiseFieldGenerator {
  constructor() {
    const fractalNoise = new FractalNoise();

    super({
      noise4d: (x, y, z, w) => fractalNoise.noise4d(x, y, z, w),
      seed: seed => {
        fractalNoise.seed(seed);
      },
    });
  }
}
