import { NoiseFieldGenerator } from "@tsparticles/noise-field";
import { SimplexNoise } from "@tsparticles/simplex-noise";

export class SimplexNoiseGenerator extends NoiseFieldGenerator {
  constructor() {
    const simplex = new SimplexNoise();

    super({
      noise4d: (x, y, z, w) => simplex.noise4d.noise(x, y, z, w),
      seed: seed => {
        simplex.noise4d.seed(seed);
      },
    });
  }
}
