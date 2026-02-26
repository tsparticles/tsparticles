/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type Container, Vector, doublePI, getRandom, identity } from "@tsparticles/engine";
import type { BrownianPathParticle } from "./BrownianPathParticle.js";
import type { IBrownianPathOptions } from "./IBrownianPathOptions.js";
import { type IMovePathGenerator } from "@tsparticles/plugin-move";

export class BrownianPathGenerator implements IMovePathGenerator {
  readonly options: IBrownianPathOptions;
  private readonly _container: Container;
  private readonly _res: Vector;

  constructor(container: Container) {
    this._container = container;
    this._res = Vector.origin;

    this.options = {
      angleDelta: Math.PI / 12,
      damping: identity,
    };
  }

  generate(p: BrownianPathParticle): Vector {
    p.brownian ??= {
      angle: getRandom() * doublePI,
      speed: p.velocity.length,
    };

    const b = p.brownian,
      delta = (getRandom() * 2 - 1) * (this.options.angleDelta ?? 0);

    b.angle += delta;

    const damping = this.options.damping ?? identity;

    p.velocity.x = 0;
    p.velocity.y = 0;

    this._res.length = b.speed * damping;
    this._res.angle = b.angle;

    return this._res;
  }

  init(): void {
    const source = this._container.actualOptions.particles.move.path.options;

    this.options.angleDelta = (source["angleDelta"] as number | undefined) ?? this.options.angleDelta;
    this.options.damping = (source["damping"] as number | undefined) ?? this.options.damping;
  }

  reset(p: BrownianPathParticle): void {
    delete p.brownian;
  }

  update(): void {
    // nothing to do
  }
}
