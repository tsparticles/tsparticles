/* eslint-disable @typescript-eslint/no-magic-numbers */
import { SmoothValueNoise } from "@tsparticles/smooth-value-noise";

export class FractalNoise {
  readonly #smoothValueNoise: SmoothValueNoise;

  constructor() {
    this.#smoothValueNoise = new SmoothValueNoise();
  }

  noise2d(x: number, y: number, octaves = 5, persistence = 0.5, lacunarity = 2): number {
    let total = 0,
      frequency = 1,
      amplitude = 1,
      maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      total += this.#smoothValueNoise.noise2d(x * frequency, y * frequency) * amplitude;
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= lacunarity;
    }

    return total / maxValue;
  }

  noise3d(x: number, y: number, z: number, octaves = 5, persistence = 0.5, lacunarity = 2): number {
    let total = 0,
      frequency = 1,
      amplitude = 1,
      maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      total += this.#smoothValueNoise.noise3d(x * frequency, y * frequency, z * frequency) * amplitude;
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= lacunarity;
    }

    return total / maxValue;
  }

  noise4d(x: number, y: number, z: number, w: number, octaves = 5, persistence = 0.5, lacunarity = 2): number {
    let total = 0,
      frequency = 1,
      amplitude = 1,
      maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      total += this.#smoothValueNoise.noise4d(x * frequency, y * frequency, z * frequency, w * frequency) * amplitude;
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= lacunarity;
    }

    return total / maxValue;
  }

  seed(seed: number): void {
    this.#smoothValueNoise.seed(seed);
  }
}
