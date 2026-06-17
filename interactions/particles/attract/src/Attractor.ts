import type { AttractParticle, IParticlesAttractOptions, ParticlesAttractOptions } from "./Types.js";
import {
  type Container,
  type RecursivePartial,
  getDistances,
  getRangeValue,
  isNull,
  loadOptionProperty,
} from "@tsparticles/engine";
import { Attract } from "./Options/Classes/Attract.js";
import { ParticlesInteractorBase } from "@tsparticles/plugin-interactivity";

const attractFactor = 1000,
  identity = 1;

/** Particle attract interactor */
export class Attractor extends ParticlesInteractorBase<Container, AttractParticle> {
  #maxDistance;

  constructor(container: Container) {
    super(container);

    this.#maxDistance = 0;
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

  interact(p1: AttractParticle): void {
    if (!p1.options.attract?.enable) {
      return;
    }

    const container = this.container;

    if (isNull(p1.attractDistance)) {
      const attractDistance = getRangeValue(p1.options.attract.distance);

      if (attractDistance > this.#maxDistance) {
        this.#maxDistance = attractDistance;
      }

      p1.attractDistance = attractDistance * container.retina.pixelRatio;
    }

    const distance = p1.attractDistance,
      pos1 = p1.getPosition(),
      query = container.particles.grid.queryCircle(pos1, distance) as AttractParticle[];

    for (const p2 of query) {
      if (p1 === p2 || !p2.options.attract?.enable || p2.destroyed || p2.spawning) {
        continue;
      }

      const pos2 = p2.getPosition(),
        { dx, dy } = getDistances(pos1, pos2),
        rotate = p1.options.attract.rotate,
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

  isEnabled(particle: AttractParticle): boolean {
    return particle.options.attract?.enable ?? false;
  }

  loadParticlesOptions(
    options: ParticlesAttractOptions,
    ...sources: (RecursivePartial<IParticlesAttractOptions> | undefined)[]
  ): void {
    loadOptionProperty(options, "attract", Attract, ...sources);
  }

  reset(): void {
    // do nothing
  }
}
