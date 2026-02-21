import { type Container, type Particle, getDistances, getRangeValue, isNull } from "@tsparticles/engine";
import type { AttractParticle } from "./AttractParticle.js";
import { ParticlesInteractorBase } from "@tsparticles/plugin-interactivity";

const attractFactor = 1000,
  identity = 1;

/**
 */
export class Attractor extends ParticlesInteractorBase<Container, AttractParticle> {
  private _maxDistance;

  constructor(container: Container) {
    super(container);

    this._maxDistance = 0;
  }

  get maxDistance(): number {
    return this._maxDistance;
  }

  clear(): void {
    // do nothing
  }

  init(): void {
    // do nothing
  }

  interact(p1: AttractParticle): void {
    const container = this.container;

    if (isNull(p1.attractDistance)) {
      const attractDistance = getRangeValue(p1.options.move.attract.distance);

      if (attractDistance > this._maxDistance) {
        this._maxDistance = attractDistance;
      }

      p1.attractDistance = attractDistance * container.retina.pixelRatio;
    }

    const distance = p1.attractDistance,
      pos1 = p1.getPosition(),
      query = container.particles.grid.queryCircle(pos1, distance);

    for (const p2 of query) {
      if (p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
        continue;
      }

      const pos2 = p2.getPosition(),
        { dx, dy } = getDistances(pos1, pos2),
        rotate = p1.options.move.attract.rotate,
        ax = dx / (rotate.x * attractFactor),
        ay = dy / (rotate.y * attractFactor),
        p1Factor = p2.size.value / p1.size.value,
        p2Factor = identity / p1Factor;

      p1.velocity.x -= ax * p1Factor;
      p1.velocity.y -= ay * p1Factor;
      p2.velocity.x += ax * p2Factor;
      p2.velocity.y += ay * p2Factor;
    }
  }

  isEnabled(particle: Particle): boolean {
    return particle.options.move.attract.enable;
  }

  reset(): void {
    // do nothing
  }
}
