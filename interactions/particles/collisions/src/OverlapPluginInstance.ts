import { type Container, type IContainerPlugin, type ICoordinates, double, getDistance } from "@tsparticles/engine";
import type { CollisionParticle } from "./Types.js";

const minRetries = 0;

export class OverlapPluginInstance implements IContainerPlugin {
  private readonly _container: Container;

  constructor(container: Container) {
    this._container = container;
  }

  checkParticlePosition(particle: CollisionParticle, position: ICoordinates, tryCount: number): boolean {
    return !this._hasOverlaps(particle, position, tryCount);
  }

  private readonly _hasOverlaps: (particle: CollisionParticle, position: ICoordinates, tryCount: number) => boolean = (
    particle,
    pos,
    tryCount,
  ) => {
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

    const radius = particle.getRadius(),
      candidates = this._container.particles.grid.queryCircle(
        pos,
        particle.getRadius() * double,
        p => p !== particle && getDistance(pos, p.position) < radius + p.getRadius(),
      );

    return !!candidates.length;
  };
}
