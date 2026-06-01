import {
  type Container,
  type IDelta,
  OutMode,
  type OutModeDirection,
  type Particle,
  ParticleOutType,
  getDistances,
  minVelocity,
} from "@tsparticles/engine";
import type { IOutModeManager } from "./IOutModeManager.js";

export class DestroyOutMode implements IOutModeManager {
  modes: (OutMode | keyof typeof OutMode)[];

  constructor(_container: Container) {
    this.modes = [OutMode.destroy];
  }

  update(
    particle: Particle,
    direction: OutModeDirection,
    _delta: IDelta,
    outMode: OutMode | keyof typeof OutMode,
  ): void {
    if (!this.modes.includes(outMode)) {
      return;
    }

    switch (particle.outType) {
      case ParticleOutType.normal:
      case ParticleOutType.outside:
        if (particle.isInsideCanvasForOutMode(outMode, direction)) {
          return;
        }

        break;
      case ParticleOutType.inside: {
        const { dx, dy } = getDistances(particle.position, particle.moveCenter),
          { x: vx, y: vy } = particle.velocity;

        if (
          (vx < minVelocity && dx > particle.moveCenter.radius) ||
          (vy < minVelocity && dy > particle.moveCenter.radius) ||
          (vx >= minVelocity && dx < -particle.moveCenter.radius) ||
          (vy >= minVelocity && dy < -particle.moveCenter.radius)
        ) {
          return;
        }

        break;
      }
    }

    particle.destroy(true);
  }
}
