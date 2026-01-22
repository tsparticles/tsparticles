import { NoiseFieldGenerator } from "@tsparticles/noise-field";
import { PerlinNoise } from "@tsparticles/perlin-noise";

export class PerlinNoiseGenerator extends NoiseFieldGenerator {
  constructor() {
    const perlinNoise = new PerlinNoise();

    super({
      noise4d: (x, y, z, w) => perlinNoise.noise4d(x, y, z, w),
      seed: seed => {
        perlinNoise.seed(seed);
      },
    });
  }
}
