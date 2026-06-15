import {
  type Container,
  type ICoordinates,
  type MoveDirection,
  type Particle,
  type Vector,
  double,
  getDistances,
  half,
} from "@tsparticles/engine";

/**
 *
 * @param container - The container to handle
 * @param direction - The direction
 * @returns the particle created
 */
export function buildParticleWithDirection(container: Container, direction: MoveDirection): Particle | undefined {
  const options = { move: { direction } };

  return container.particles.addParticle(undefined, options);
}

/**
 *
 * @param start - The start value
 * @param stop - The stop
 * @param velocity - The velocity
 */
export function segmentBounce(start: ICoordinates, stop: ICoordinates, velocity: Vector): void {
  const { dx, dy } = getDistances(start, stop),
    wallAngle = Math.atan2(dy, dx) + Math.PI * half,
    wallNormalX = Math.sin(wallAngle),
    wallNormalY = -Math.cos(wallAngle),
    d = double * (velocity.x * wallNormalX + velocity.y * wallNormalY);

  velocity.x -= d * wallNormalX;
  velocity.y -= d * wallNormalY;
}
