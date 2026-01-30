/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type Container, type IMovePathGenerator, Vector, getRandom } from "@tsparticles/engine";
import type { BranchesPathParticle } from "./BranchesPathParticle.js";
import type { IBranchesPathOptions } from "./IBranchesPathOptions.js";

const defaultOptions = {
  segmentLength: 20,
  branchChance: 0.2,
  maxAngle: Math.PI / 3,
  speedVariation: 0.3,
};

export class BranchesPathGenerator implements IMovePathGenerator {
  readonly options: IBranchesPathOptions;
  private readonly _container;

  constructor(container: Container) {
    this._container = container;

    this.options = { ...defaultOptions };
  }

  generate(p: BranchesPathParticle): Vector {
    const opts = this.options;

    p.branching ??= {
      angle: getRandom() * Math.PI * 2,
      remaining: opts.segmentLength,
      speed: p.velocity.length,
    };

    const b = p.branching;

    // New segment
    if (b.remaining <= 0) {
      const branch = getRandom() < (opts.branchChance ?? 0),
        maxAngle = opts.maxAngle ?? defaultOptions.maxAngle,
        delta = (getRandom() * 2 - 1) * (branch ? maxAngle : maxAngle * 0.3);

      b.angle += delta;
      b.remaining = opts.segmentLength;

      const speedFactor = 1 + (getRandom() * 2 - 1) * (opts.speedVariation ?? 0);

      b.speed = p.velocity.length * speedFactor;
    }

    b.remaining -= b.speed;

    const vx = Math.cos(b.angle) * b.speed;
    const vy = Math.sin(b.angle) * b.speed;

    p.velocity.x = 0;
    p.velocity.y = 0;

    return Vector.create(vx, vy);
  }

  init(): void {
    const source = this._container.actualOptions.particles.move.path.options;

    this.options.segmentLength = (source["segmentLength"] as number | undefined) ?? this.options.segmentLength;

    this.options.branchChance = (source["branchChance"] as number | undefined) ?? this.options.branchChance;

    this.options.maxAngle = (source["maxAngle"] as number | undefined) ?? this.options.maxAngle;

    this.options.speedVariation = (source["speedVariation"] as number | undefined) ?? this.options.speedVariation;
  }

  reset(p: BranchesPathParticle): void {
    delete p.branching;
  }

  update(): void {
    // nothing to do
  }
}
