/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type Container, Vector, doublePI, getRandom } from "@tsparticles/engine";
import type { IBranchesInertiaOptions, IBranchesPathOptions } from "./IBranchesPathOptions.js";
import type { BranchesPathParticle } from "./BranchesPathParticle.js";
import { type IMovePathGenerator } from "@tsparticles/plugin-move";

const defaultOptions = {
  segmentLength: 20,
  branchChance: 0.2,
  maxAngle: Math.PI / 3,
  speedVariation: 0.3,
  inertia: {
    enable: false,
    factor: 0.1,
  },
};

export class BranchesPathGenerator implements IMovePathGenerator {
  readonly options: IBranchesPathOptions;
  private readonly _container;
  private readonly _res: Vector;

  constructor(container: Container) {
    this._container = container;
    this._res = Vector.origin;

    this.options = {
      ...defaultOptions,
      inertia: { ...defaultOptions.inertia },
    };
  }

  generate(p: BranchesPathParticle): Vector {
    const opts = this.options;

    p.branching ??= {
      angle: getRandom() * doublePI,
      remaining: opts.segmentLength,
      baseSpeed: p.velocity.length,
      speed: p.velocity.length,
    };

    const b = p.branching;

    if (b.remaining <= 0) {
      const branch = getRandom() < (opts.branchChance ?? 0),
        maxAngle = opts.maxAngle ?? defaultOptions.maxAngle,
        delta = (getRandom() * 2 - 1) * (branch ? maxAngle : maxAngle * 0.3);

      b.angle += delta;
      b.remaining = opts.segmentLength;

      const speedFactor = 1 + (getRandom() * 2 - 1) * (opts.speedVariation ?? 0);

      b.speed = b.baseSpeed * speedFactor;
    }

    b.remaining -= b.speed;

    const targetX = Math.cos(b.angle) * b.speed,
      targetY = Math.sin(b.angle) * b.speed,
      inertia = opts.inertia;

    if (inertia?.enable) {
      const factor = inertia.factor ?? 0.1;

      p.velocity.x += (targetX - p.velocity.x) * factor;
      p.velocity.y += (targetY - p.velocity.y) * factor;

      this._res.x = p.velocity.x;
      this._res.y = p.velocity.y;
    } else {
      p.velocity.x = 0;
      p.velocity.y = 0;

      this._res.x = targetX;
      this._res.y = targetY;
    }

    return this._res;
  }

  init(): void {
    const source = this._container.actualOptions.particles.move.path.options;

    this.options.segmentLength = (source["segmentLength"] as number | undefined) ?? this.options.segmentLength;
    this.options.branchChance = (source["branchChance"] as number | undefined) ?? this.options.branchChance;
    this.options.maxAngle = (source["maxAngle"] as number | undefined) ?? this.options.maxAngle;
    this.options.speedVariation = (source["speedVariation"] as number | undefined) ?? this.options.speedVariation;

    const inertiaSource = source["inertia"] as IBranchesInertiaOptions | undefined;

    if (inertiaSource) {
      const inertiaOptions = { ...defaultOptions.inertia };

      inertiaOptions.enable = inertiaSource.enable ?? inertiaOptions.enable;
      inertiaOptions.factor = inertiaSource.factor ?? inertiaOptions.factor;

      this.options.inertia = inertiaOptions;
    }
  }

  reset(p: BranchesPathParticle): void {
    delete p.branching;
  }

  update(): void {
    // nothing to do
  }
}
