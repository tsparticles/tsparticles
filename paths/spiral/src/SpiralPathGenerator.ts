import {
  type Container,
  type IDelta,
  type IMovePathGenerator,
  type RangeValue,
  Vector,
  deepExtend,
  doublePI,
  getRandom,
  getRangeValue,
} from "@tsparticles/engine";
import type { ISpiralOptions } from "./ISpiralOptions.js";
import { SpiralDirection } from "./SpiralDirection.js";
import type { SpiralParticle } from "./SpiralParticle.js";

const minRadius = 0,
  speedFactor = 0.01;

const defaultOptions: ISpiralOptions = {
  maxRadius: { min: 10, max: 50 },
  angularSpeed: { min: 0.01, max: 0.04 },
  radialSpeed: { min: 0.1, max: 0.3 },
};

export class SpiralPathGenerator implements IMovePathGenerator {
  options;

  constructor() {
    this.options = new Map<Container, ISpiralOptions>();
  }

  generate(particle: SpiralParticle, delta: IDelta): Vector {
    const options = this.options.get(particle.container) ?? (deepExtend({}, defaultOptions) as ISpiralOptions);

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

    return Vector.origin;
  }

  init(container: Container): void {
    const sourceOptions = container.actualOptions.particles.move.path.options,
      options = deepExtend({}, defaultOptions) as ISpiralOptions;

    options.maxRadius = (sourceOptions["maxRadius"] as RangeValue | undefined) ?? options.maxRadius;
    options.angularSpeed = (sourceOptions["angularSpeed"] as RangeValue | undefined) ?? options.angularSpeed;
    options.radialSpeed = (sourceOptions["radialSpeed"] as RangeValue | undefined) ?? options.radialSpeed;

    this.options.set(container, options);
  }

  reset(particle: SpiralParticle): void {
    delete particle.spiral;
  }

  update(): void {
    // no-op
  }
}
