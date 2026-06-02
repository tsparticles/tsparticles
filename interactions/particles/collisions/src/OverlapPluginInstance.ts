import { type Container, type IContainerPlugin, type ICoordinates, getDistance } from "@tsparticles/engine";
import type { CollisionParticle } from "./Types.js";

const minRetries = 0;

export class OverlapPluginInstance implements IContainerPlugin {
  readonly #container: Container;

  constructor(container: Container) {
    this.#container = container;
  }

  checkParticlePosition(particle: CollisionParticle, position: ICoordinates, tryCount: number): boolean {
    return !this.#hasOverlaps(particle, position, tryCount);
  }

  #hasOverlaps(particle: CollisionParticle, pos: ICoordinates, tryCount: number): boolean {
    const collisionsOptions = particle.options.collisions;

    if (!collisionsOptions?.enable) {
      return false;
    }

    const overlapOptions = collisionsOptions.overlap;

    if (overlapOptions.enable) {
      return false;
    }

    const retries = overlapOptions.retries;

    if (retries >= minRetries && tryCount > retries) {
      throw new Error(`Particle is overlapping and can't be placed`);
    }

    return !!this.#container.particles.find(p => getDistance(pos, p.position) < particle.getRadius() + p.getRadius());
  }
}
