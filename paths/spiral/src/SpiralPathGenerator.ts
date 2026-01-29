import { type Container, type IMovePathGenerator, Vector, doublePI, getRandom } from "@tsparticles/engine";
import type { ISpiralOptions } from "./ISpiralOptions.js";
import type { SpiralPathParticle } from "./SpiralPathParticle.js";

export class SpiralPathGenerator implements IMovePathGenerator {
  readonly options: ISpiralOptions;

  constructor() {
    this.options = {
      angularSpeed: 0.1,
      radialSpeed: 0.05,
      initialRadius: 0,
    };
  }

  generate(p: SpiralPathParticle): Vector {
    p.spiralAngle ??= getRandom() * doublePI;
    p.spiralRadius ??= this.options.initialRadius;

    p.spiralAngle += this.options.angularSpeed;
    p.spiralRadius += this.options.radialSpeed;

    const x = Math.cos(p.spiralAngle) * p.spiralRadius,
      y = Math.sin(p.spiralAngle) * p.spiralRadius;

    // tsParticles expects velocity vector
    p.velocity.x = 0;
    p.velocity.y = 0;

    return Vector.create(x, y);
  }

  init(container: Container): void {
    const sourceOptions = container.actualOptions.particles.move.path.options;
    const { options } = this;

    options.angularSpeed = (sourceOptions["angularSpeed"] as number | undefined) ?? options.angularSpeed;

    options.radialSpeed = (sourceOptions["radialSpeed"] as number | undefined) ?? options.radialSpeed;

    options.initialRadius = (sourceOptions["initialRadius"] as number | undefined) ?? options.initialRadius;
  }

  reset(particle: SpiralPathParticle): void {
    delete particle.spiralAngle;
    delete particle.spiralRadius;
  }

  update(): void {
    // nothing
  }
}
