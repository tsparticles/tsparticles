import type { Container } from "@tsparticles/engine";
import { NoiseFieldGenerator } from "@tsparticles/noise-field";
import { PerlinNoise } from "@tsparticles/perlin-noise";

export class PerlinNoiseGenerator extends NoiseFieldGenerator {
  constructor(container: Container) {
    const perlinNoise = new PerlinNoise();

    super(container, {
      noise4d: (x, y, z, w) => perlinNoise.noise4d(x, y, z, w),
      seed: seed => {
        perlinNoise.seed(seed);
      },
    });
  }
}
