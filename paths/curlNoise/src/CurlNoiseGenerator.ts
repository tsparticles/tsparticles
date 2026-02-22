import {
  type Container,
  type IMovePathGenerator,
  type Particle,
  Vector,
  deepExtend,
  double,
  getRandom,
} from "@tsparticles/engine";
import type { ICurlOptions } from "./ICurlOptions.js";
import { SimplexNoise } from "@tsparticles/simplex-noise";

const defaultOptions: ICurlOptions = {
  speed: 0.2,
  step: 250,
};

export class CurlNoiseGenerator implements IMovePathGenerator {
  readonly options;

  private readonly _container;
  private readonly _res: Vector;
  private readonly _simplex;

  constructor(container: Container) {
    this._container = container;
    this._res = Vector.origin;

    const simplex = new SimplexNoise();

    this._simplex = simplex.noise2d;
    this.options = deepExtend({}, defaultOptions) as ICurlOptions;
  }

  generate(particle: Particle): Vector {
    const pos = particle.getPosition(),
      { speed, step } = this.options,
      x = pos.x / step,
      y = pos.y / step,
      eps = 0.001,
      n1a = this._simplex.noise(x, y + eps),
      n2a = this._simplex.noise(x, y - eps),
      a = (n1a - n2a) / (double * eps),
      n1b = this._simplex.noise(x + eps, y),
      n2b = this._simplex.noise(x - eps, y),
      b = (n1b - n2b) / (double * eps);

    particle.velocity.x = 0;
    particle.velocity.y = 0;

    this._res.x = speed * a;
    this._res.y = speed * -b;

    return this._res;
  }

  init(): void {
    const container = this._container,
      sourceOptions = container.actualOptions.particles.move.path.options;

    this.options.seed = sourceOptions["seed"] as number | undefined;
    this.options.speed =
      ((sourceOptions["speed"] as number | undefined) ?? defaultOptions.speed) * container.retina.pixelRatio;
    this.options.step = (sourceOptions["step"] as number | undefined) ?? defaultOptions.step;

    this._simplex.seed(this.options.seed ?? getRandom());
  }

  reset(): void {
    // nothing to do
  }

  update(): void {
    // nothing to do
  }
}
