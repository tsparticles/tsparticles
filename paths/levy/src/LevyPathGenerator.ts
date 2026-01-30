/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type Container, type IMovePathGenerator, Vector, getRandom } from "@tsparticles/engine";
import type { ILevyPathOptions } from "./ILevyPathOptions.js";
import type { LevyPathParticle } from "./LevyPathParticle.js";

const defaultScale = 1,
  defaultLevyAlpha = 1.5;

export class LevyPathGenerator implements IMovePathGenerator {
  readonly options: ILevyPathOptions;
  private readonly _container: Container;

  constructor(container: Container) {
    this._container = container;

    this.options = {
      alpha: defaultLevyAlpha,
      scale: defaultScale,
      maxStep: 10,
    };
  }

  generate(p: LevyPathParticle): Vector {
    p.levy ??= {
      angle: getRandom() * Math.PI * 2,
      baseSpeed: p.velocity.length,
    };

    const opts = this.options,
      l = p.levy;

    // Direction: uniform
    l.angle += (getRandom() - 0.5) * 0.2;

    // Lévy step length
    const u = Math.max(getRandom(), 1e-6),
      scale = opts.scale ?? defaultScale,
      levyAlpha = opts.alpha ?? defaultLevyAlpha;
    let step = scale / Math.pow(u, 1 / levyAlpha);

    if (opts.maxStep !== undefined) {
      step = Math.min(step, opts.maxStep);
    }

    const speed = l.baseSpeed * step;

    p.velocity.x = 0;
    p.velocity.y = 0;

    return Vector.create(Math.cos(l.angle) * speed, Math.sin(l.angle) * speed);
  }

  init(): void {
    const source = this._container.actualOptions.particles.move.path.options;

    this.options.alpha = (source["alpha"] as number | undefined) ?? this.options.alpha;
    this.options.scale = (source["scale"] as number | undefined) ?? this.options.scale;
    this.options.maxStep = (source["maxStep"] as number | undefined) ?? this.options.maxStep;
  }

  reset(p: LevyPathParticle): void {
    delete p.levy;
  }

  update(): void {
    // nothing to do
  }
}
