import { type Container, type Particle, Vector, deepExtend, double, getRandom } from "@tsparticles/engine";
import type { ICurlOptions } from "./ICurlOptions.js";
import { type IMovePathGenerator } from "@tsparticles/plugin-move";
import { SimplexNoise } from "@tsparticles/simplex-noise";

const defaultOptions: ICurlOptions = {
  speed: 0.2,
  step: 250,
};

/** Curl noise path generator for particle motion */
export class CurlNoiseGenerator implements IMovePathGenerator {
  /** Curl noise configuration options */
  readonly options;

  readonly #container;
  readonly #res: Vector;
  readonly #simplex;

  constructor(container: Container) {
    this.#container = container;
    this.#res = Vector.origin;

    const simplex = new SimplexNoise();

    this.#simplex = simplex.noise2d;
    this.options = deepExtend({}, defaultOptions) as ICurlOptions;
  }

  /**
   * Generates a curl noise vector for the given particle
   * @param particle - The particle to process
   * @returns The result
   */
  generate(particle: Particle): Vector {
    const pos = particle.getPosition(),
      { speed, step } = this.options,
      x = pos.x / step,
      y = pos.y / step,
      eps = 0.001,
      n1a = this.#simplex.noise(x, y + eps),
      n2a = this.#simplex.noise(x, y - eps),
      a = (n1a - n2a) / (double * eps),
      n1b = this.#simplex.noise(x + eps, y),
      n2b = this.#simplex.noise(x - eps, y),
      b = (n1b - n2b) / (double * eps);

    particle.velocity.x = 0;
    particle.velocity.y = 0;

    this.#res.x = speed * a;
    this.#res.y = speed * -b;

    return this.#res;
  }

  /** Initializes the curl noise generator with container options */
  init(): void {
    const container = this.#container,
      sourceOptions = container.actualOptions.particles.move.path.options;

    this.options.seed = sourceOptions["seed"] as number | undefined;
    this.options.speed =
      ((sourceOptions["speed"] as number | undefined) ?? defaultOptions.speed) * container.retina.pixelRatio;
    this.options.step = (sourceOptions["step"] as number | undefined) ?? defaultOptions.step;

    this.#simplex.seed(this.options.seed ?? getRandom());
  }

  /** Resets the generator state */
  reset(): void {
    // nothing to do
  }

  /** Updates the generator state */
  update(): void {
    // nothing to do
  }
}
