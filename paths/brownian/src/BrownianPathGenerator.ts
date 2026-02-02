/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type Container, type IMovePathGenerator, Vector, getRandom } from "@tsparticles/engine";
import type { BrownianPathParticle } from "./BrownianPathParticle.js";
import type { IBrownianPathOptions } from "./IBrownianPathOptions.js";

export class BrownianPathGenerator implements IMovePathGenerator {
  readonly options: IBrownianPathOptions;
  private readonly _container: Container;

  constructor(container: Container) {
    this._container = container;

    this.options = {
      angleDelta: Math.PI / 12,
      damping: 1,
    };
  }

  generate(p: BrownianPathParticle): Vector {
    p.brownian ??= {
      angle: getRandom() * Math.PI * 2,
      speed: p.velocity.length,
    };

    const b = p.brownian,
      delta = (getRandom() * 2 - 1) * (this.options.angleDelta ?? 0);

    b.angle += delta;

    const damping = this.options.damping ?? 1;

    p.velocity.x = 0;
    p.velocity.y = 0;

    return Vector.create(Math.cos(b.angle) * b.speed * damping, Math.sin(b.angle) * b.speed * damping);
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
