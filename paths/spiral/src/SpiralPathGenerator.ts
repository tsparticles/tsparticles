import {
  type Container,
  type IDelta,
  type RangeValue,
  Vector,
  deepExtend,
  doublePI,
  getRandom,
  getRangeValue,
} from "@tsparticles/engine";
import { type IMovePathGenerator } from "@tsparticles/plugin-move";
import type { ISpiralOptions } from "./ISpiralOptions.js";
import { SpiralDirection } from "./SpiralDirection.js";
import type { SpiralParticle } from "./SpiralParticle.js";

const minRadius = 0,
  speedFactor = 0.01,
  defaultOptions: ISpiralOptions = {
    maxRadius: { min: 10, max: 50 },
    angularSpeed: { min: 0.01, max: 0.04 },
    radialSpeed: { min: 0.1, max: 0.3 },
  };

/** Spiral path generator plugin */
export class SpiralPathGenerator implements IMovePathGenerator {
  /** Spiral path options */
  readonly options;
  /** The particles container */
  private readonly _container;
  /** The result vector */
  private readonly _res: Vector;

  /**
   * SpiralPathGenerator constructor
   * @param container
   */
  constructor(container: Container) {
    this._container = container;
    this._res = Vector.origin;
    this.options = deepExtend({}, defaultOptions) as ISpiralOptions;
  }

  /**
   * Generates the next movement vector with spiral oscillation
   * @param particle
   * @param delta
   */
  generate(particle: SpiralParticle, delta: IDelta): Vector {
    const { options } = this;

    particle.spiral ??= {
      angle: getRandom() * doublePI,
      radius: minRadius,
      direction: SpiralDirection.positive,
      maxRadius: getRangeValue(options.maxRadius),
      angularSpeed: getRangeValue(options.angularSpeed) * speedFactor,
      radialSpeed: getRangeValue(options.radialSpeed) * speedFactor,
    };

    const spiral = particle.spiral;

    // advance rotation
    spiral.angle += spiral.angularSpeed * delta.factor;

    // advance radial oscillation
    spiral.radius += spiral.radialSpeed * spiral.direction * delta.factor;

    if (spiral.radius > spiral.maxRadius && spiral.direction === SpiralDirection.positive) {
      spiral.radius = spiral.maxRadius;
      spiral.direction = SpiralDirection.negative;
    } else if (spiral.radius < minRadius && spiral.direction === SpiralDirection.negative) {
      spiral.radius = minRadius;
      spiral.direction = SpiralDirection.positive;
    }

    // compute spiral offset relative to velocity direction
    const offsetX = Math.cos(spiral.angle) * spiral.radius,
      offsetY = Math.sin(spiral.angle) * spiral.radius;

    // apply offset orthogonally around natural motion
    particle.position.x += offsetX;
    particle.position.y += offsetY;

    this._res.x = 0;
    this._res.y = 0;

    return this._res;
  }

  /** Initializes the path generator options */
  init(): void {
    const sourceOptions = this._container.actualOptions.particles.move.path.options;

    this.options.maxRadius = (sourceOptions["maxRadius"] as RangeValue | undefined) ?? this.options.maxRadius;
    this.options.angularSpeed = (sourceOptions["angularSpeed"] as RangeValue | undefined) ?? this.options.angularSpeed;
    this.options.radialSpeed = (sourceOptions["radialSpeed"] as RangeValue | undefined) ?? this.options.radialSpeed;
  }

  /**
   * Resets the particle spiral state
   * @param particle
   */
  reset(particle: SpiralParticle): void {
    delete particle.spiral;
  }

  /** Updates the path generator (no-op) */
  update(): void {
    // no-op
  }
}
