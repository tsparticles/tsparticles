import type { IRepulseParticlesOptions, RepulseParticlesOptions } from "./Types.js";
import { type InteractivityContainer, ParticlesInteractorBase } from "@tsparticles/plugin-interactivity";
import {
  type Particle,
  type RecursivePartial,
  Vector,
  clamp,
  getRangeValue,
  identity,
  loadOptionProperty,
  minDistance,
  minVelocity,
} from "@tsparticles/engine";
import { ParticlesRepulse } from "./Options/Classes/ParticlesRepulse.js";

/** Repulse particle extension type */
export type RepulseParticle = Particle & {
  options: RepulseParticlesOptions;
  /** Repulse interaction data for this particle */
  repulse?: {
    /** Repulse distance */
    distance: number;
    /** Repulse factor */
    factor: number;
    /** Repulse speed */
    speed: number;
  };
};

/** Particles repulse interactor */
export class Repulser extends ParticlesInteractorBase {
  #maxDistance;
  readonly #normVec: Vector;
  readonly #velocityVec: Vector;

  constructor(container: InteractivityContainer) {
    super(container);

    this.#maxDistance = 0;
    this.#normVec = Vector.origin;
    this.#velocityVec = Vector.origin;
  }

  get maxDistance(): number {
    return this.#maxDistance;
  }

  clear(): void {
    // do nothing
  }

  init(): void {
    // do nothing
  }

  interact(p1: RepulseParticle): void {
    const container = this.container;

    if (!p1.repulse) {
      const repulseOpt1 = p1.options.repulse;

      if (!repulseOpt1) {
        return;
      }

      const repulseDistance = getRangeValue(repulseOpt1.distance);

      if (repulseDistance > this.maxDistance) {
        this.#maxDistance = repulseDistance;
      }

      p1.repulse = {
        distance: repulseDistance * container.retina.pixelRatio,
        speed: getRangeValue(repulseOpt1.speed),
        factor: getRangeValue(repulseOpt1.factor),
      };
    }

    const pos1 = p1.getPosition(),
      query = container.particles.grid.queryCircle(pos1, p1.repulse.distance),
      p1DistanceFactor = identity / p1.repulse.distance,
      p1DistanceFactorSq = p1DistanceFactor * p1DistanceFactor,
      velocity = p1.repulse.speed * p1.repulse.factor;

    for (const p2 of query) {
      if (p1 === p2 || p2.destroyed) {
        continue;
      }

      const pos2 = p2.getPosition(),
        dx = pos2.x - pos1.x,
        dy = pos2.y - pos1.y,
        distanceSq = dx * dx + dy * dy;

      if (distanceSq > minDistance) {
        const repulseFactor =
          clamp((identity - distanceSq * p1DistanceFactorSq) * velocity, minVelocity, velocity) / Math.sqrt(distanceSq);

        this.#normVec.x = dx * repulseFactor;
        this.#normVec.y = dy * repulseFactor;

        p2.position.addTo(this.#normVec);
      } else {
        this.#velocityVec.x = velocity;
        this.#velocityVec.y = velocity;

        p2.position.addTo(this.#velocityVec);
      }
    }
  }

  isEnabled(particle: RepulseParticle): boolean {
    return particle.options.repulse?.enabled ?? false;
  }

  loadParticlesOptions(
    options: RepulseParticlesOptions,
    ...sources: (RecursivePartial<IRepulseParticlesOptions> | undefined)[]
  ): void {
    loadOptionProperty(options, "repulse", ParticlesRepulse, ...sources);
  }

  reset(): void {
    // do nothing
  }
}
