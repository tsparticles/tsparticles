import {
  type Container,
  type Particle,
  Vector,
  type Vector3d,
  clamp,
  defaultAngle,
  double,
  getDistance,
  getRangeValue,
  half,
  identity,
  inverseFactorNumerator,
  minCount,
  minRadius,
} from "@tsparticles/engine";
import { CollisionMode } from "./CollisionMode.js";
import { type CollisionParticle } from "./Types.js";

const wallMarginFactor = 0.15,
  /**
   * Share of the velocity a particle keeps once it counts as supported.
   *
   * Gravity adds its acceleration every frame, so a resting particle settles at
   * `acceleration * restRetention / (1 - restRetention)` instead of accelerating without bound, while
   * a particle in free fall, having no support, keeps accelerating until its own speed limit.
   */
  restRetention = 0.1,
  /**
   * Contacts a particle needs before it counts as supported and gets damped.
   *
   * One touch does not hold a particle up: a falling cloud keeps brushing itself every frame, and
   * damping there leaves the cloud hanging in mid air instead of letting it fall. A particle buried
   * in a pool is surrounded, so the surrounding contacts are what marks it as supported.
   *
   * The count cannot tell a falling cloud from a resting pool apart, both hold a similar number of
   * neighbors, so the value is the balance between the two failures: below it the fluid stops in
   * mid air, above it the pool forms but stays as agitated as an undamped one. Measured over 1500
   * particles, the pool reaches the bottom from here up, and every lower value leaves it suspended.
   */
  supportContacts = 5,
  wallSpringFactor = half,
  minNeighborDistance = 0.0001,
  /**
   * Number of density/pressure relaxation passes done per particle per frame. A single pass applies
   * the whole displacement at once, so a few passes re-evaluate the density from the updated
   * positions and converge instead.
   */
  solverIterations = 3,
  /**
   * Gauss-Seidel passes of the non-penetration projection. A single pass resolves the pairs of the
   * particle being solved, but moving a particle can push it into a neighbor already separated in the
   * same pass, so a few passes are needed to converge on dense clusters.
   */
  separationIterations = 3;

/**
 * Pushes a particle back inside the canvas bounds with a soft spring, so particles crossing the
 * boundary are smoothly redirected instead of sticking to it.
 * @param position - the position to correct
 * @param margin - the minimum allowed distance from the canvas borders
 * @param maxX - the maximum allowed horizontal position
 * @param maxY - the maximum allowed vertical position
 */
function applyWallSpring(position: Vector3d, margin: number, maxX: number, maxY: number): void {
  if (position.x < margin) {
    position.x += (margin - position.x) * wallSpringFactor;
  } else if (position.x > maxX) {
    position.x -= (position.x - maxX) * wallSpringFactor;
  }

  if (position.y < margin) {
    position.y += (margin - position.y) * wallSpringFactor;
  } else if (position.y > maxY) {
    position.y -= (position.y - maxY) * wallSpringFactor;
  }
}

/**
 * Keeps a particle inside the canvas bounds, used after the fluid displacement to prevent overlaps.
 * @param position - the position to clamp
 * @param margin - the minimum allowed distance from the canvas borders
 * @param maxX - the maximum allowed horizontal position
 * @param maxY - the maximum allowed vertical position
 */
function clampToWalls(position: Vector3d, margin: number, maxX: number, maxY: number): void {
  if (position.x < margin) {
    position.x = margin;
  } else if (position.x > maxX) {
    position.x = maxX;
  }

  if (position.y < margin) {
    position.y = margin;
  } else if (position.y > maxY) {
    position.y = maxY;
  }
}

/**
 * Fluid collision solver, a density based displacement solver (DDR) working on particle neighborhoods.
 *
 * It replaces the pair impulse resolution used by the other collision modes, since a fluid response
 * needs the local density of the neighborhood, not a single pair contact.
 *
 * The solver only moves positions and never velocities: the movement plugin and gravity keep owning
 * the velocity, the fluid adds a position response on top of it. Feeding the displacement back into
 * the velocity turns the work done against the non-penetration constraint into kinetic energy, and
 * with no damping in the loop the pool would gain energy every frame instead of settling.
 *
 * The solver is executed in a single pass over the particles, using the positions updated by the
 * already solved particles of the same frame, so a small order bias is expected.
 */
export class FluidSolver {
  readonly #dir = Vector.origin;

  /**
   * Checks if the given particle can be used as a fluid neighbor of the particle being solved, it's
   * kept as a bound function since the spatial grid calls the check callback without any receiver.
   */
  readonly #isNeighbor: (particle: Particle) => boolean;

  #maxNeighbors = minCount;
  readonly #neighbors: CollisionParticle[] = [];
  #owner: CollisionParticle | undefined;
  #ownerZ = defaultAngle;

  constructor() {
    this.#isNeighbor = (particle: Particle): boolean => {
      const owner = this.#owner,
        neighbor = particle as CollisionParticle;

      if (
        !owner ||
        this.#neighbors.length >= this.#maxNeighbors ||
        neighbor === owner ||
        neighbor.destroyed ||
        neighbor.spawning ||
        !neighbor.options.collisions?.enable ||
        neighbor.options.collisions.mode !== CollisionMode.fluid
      ) {
        return false;
      }

      const ownerRadius = owner.getRadius();

      return (
        Math.abs(Math.round(this.#ownerZ) - Math.round(neighbor.getPosition().z)) <= ownerRadius + neighbor.getRadius()
      );
    };
  }

  /**
   * Prevents particles from overlapping, projecting every pair closer than the sum of their radii
   * back to exactly the contact distance.
   *
   * The density/pressure solve is a soft response: it only pushes while the local density exceeds
   * `restDensity`, and the resulting force is clamped by `maxForce`, so it can always leave a few
   * particles touching or slightly interpenetrating. This hard constraint closes that gap, making
   * visible overlaps impossible without raising `nearStiffness`/`maxForce` (doing that injects
   * enough energy to turn the pool into a chaotic, endlessly bouncing gas).
   * @param particle - the particle being solved
   * @param position - the position of the particle being solved
   */
  separateOverlaps(particle: CollisionParticle, position: Vector3d): void {
    const neighbors = this.#neighbors,
      particlePosition = particle.position;

    particlePosition.setTo(position);

    for (let iteration = 0; iteration < separationIterations; iteration++) {
      for (const neighbor of neighbors) {
        /* every pair is projected by both of its particles, so the last one processed owns the
           correction: filtering by id here would leave the pairs re-penetrated by the pressure solve
           of a later particle separated for good, with nothing to fix them again */
        this.#projectPair(particle, neighbor);
      }
    }
  }

  /**
   * Solves the fluid response of the given particle, moving it apart from its neighbors following
   * the local density, then handling the boundaries.
   * @param container - the container of the particle
   * @param particle - the particle to solve
   */
  solve(container: Container, particle: CollisionParticle): void {
    const collisionsOptions = particle.options.collisions;

    if (!collisionsOptions) {
      return;
    }

    const fluidOptions = collisionsOptions.fluid,
      pixelRatio = container.retina.pixelRatio,
      radius = getRangeValue(fluidOptions.radius) * pixelRatio,
      stiffness = getRangeValue(fluidOptions.stiffness),
      nearStiffness = getRangeValue(fluidOptions.nearStiffness),
      restDensity = getRangeValue(fluidOptions.restDensity),
      maxForce = getRangeValue(fluidOptions.maxForce),
      maxNeighbors = fluidOptions.maxNeighbors,
      particleRadius = particle.getRadius(),
      position = particle.position,
      canvasSize = container.canvas.size,
      hasBounds = canvasSize.width > minRadius && canvasSize.height > minRadius,
      margin = hasBounds ? particleRadius * wallMarginFactor : minRadius,
      maxX = canvasSize.width - margin,
      maxY = canvasSize.height - margin,
      neighbors = this.#neighbors;

    this.#owner = particle;
    this.#maxNeighbors = maxNeighbors;
    this.#ownerZ = particle.getPosition().z;

    this.#queryNeighbors(container, particle, radius, maxNeighbors);

    for (let iteration = 0; iteration < solverIterations; iteration++) {
      /* the geometry is read live from the rendering position, refreshed because the passes move it */
      const focalPosition = particle.getPosition();

      let density = 0,
        densityNear = 0;

      for (const neighbor of neighbors) {
        const dist = getDistance(focalPosition, neighbor.getPosition()),
          q = identity - dist / radius,
          q2 = q * q;

        density += q2;
        densityNear += q2 * q;
      }

      const pressure = (density - restDensity) * stiffness * half,
        pressureNear = densityNear * nearStiffness * half;

      if (hasBounds) {
        applyWallSpring(position, margin, maxX, maxY);
      }

      for (const neighbor of neighbors) {
        /* every particle sums the contribution of all of its neighbors and moves only itself, the
           standard SPH formulation: moving the neighbor too would let the particles solved later in
           the frame undo the pairs already resolved, leaving overlaps nothing can fix afterwards */
        const neighborPosition = neighbor.getPosition(),
          dx = neighborPosition.x - focalPosition.x,
          dy = neighborPosition.y - focalPosition.y,
          dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > radius) {
          continue;
        }

        const q = identity - dist / radius,
          force = clamp(pressure + pressureNear * q, -maxForce, maxForce),
          contactDistance = particleRadius + neighbor.getRadius(),
          /* the non-penetration floor is applied per pair and not averaged: a particle squeezed
             between two neighbors is pushed from both sides and only a full correction per pair can
             bring it back to the contact distance, an averaged one leaves it permanently overlapped */
          push = Math.max(q * force * half, contactDistance - dist);

        if (dist > minNeighborDistance) {
          const inverseDist = inverseFactorNumerator / dist;

          this.#dir.x = dx * inverseDist * push;
          this.#dir.y = dy * inverseDist * push;
        } else {
          /* coincident particles have no direction, an alternating axis avoids a fixed bias */
          this.#dir.x = (particle.id + neighbor.id) % double === minCount ? identity : -identity;
          this.#dir.y = defaultAngle;

          this.#dir.multTo(push);
        }

        position.x -= this.#dir.x;
        position.y -= this.#dir.y;
      }
    }

    /* the pressure solve moved the particle, so the neighborhood is queried again: a neighbor left
       outside the radius by the initial query could have been pulled into contact meanwhile, and the
       non-penetration projection would have no way to see it */
    this.#queryNeighbors(container, particle, radius, maxNeighbors);

    if (hasBounds) {
      clampToWalls(position, margin, maxX, maxY);
    }

    /* the non-penetration projection is the last thing to run, so neither the wall clamp nor the
       pressure solve can leave the particle interpenetrating with one of its neighbors */
    this.separateOverlaps(particle, position);

    this.#dampContacts(particle);

    if (hasBounds) {
      this.#cancelWallVelocity(particle, margin, maxX, maxY);
    }
  }

  /**
   * Removes the velocity driving the particle into a canvas border, without any restitution, so the
   * fluid rests on the borders instead of bouncing off them.
   * @param particle - the particle being solved
   * @param margin - the minimum allowed distance from the canvas borders
   * @param maxX - the maximum allowed horizontal position
   * @param maxY - the maximum allowed vertical position
   */
  #cancelWallVelocity(particle: CollisionParticle, margin: number, maxX: number, maxY: number): void {
    const position = particle.position,
      velocity = particle.velocity;

    if (position.x <= margin) {
      velocity.x = defaultAngle;
    } else if (position.x >= maxX) {
      velocity.x = defaultAngle;
    }

    if (position.y <= margin) {
      velocity.y = defaultAngle;
    } else if (position.y >= maxY) {
      velocity.y = defaultAngle;
    }
  }

  /**
   * Bleeds off the velocity of a particle that rests against enough of its neighbors.
   *
   * The non-penetration projection only corrects positions: it pushes a particle back without ever
   * touching its velocity, so gravity keeps feeding it frame after frame. The particle stops traveling
   * yet its velocity grows without bound, and it keeps bouncing on the spot, which reads as a fluid
   * that never settles.
   *
   * The damping is isotropic on purpose. Removing the velocity along the contact normals instead sums
   * one push per neighbor, and where the contacts point in many directions those pushes no longer
   * cancel out: the cloud is launched across the canvas instead of coming to rest.
   * @param particle - the particle being solved
   */
  #dampContacts(particle: CollisionParticle): void {
    const neighbors = this.#neighbors,
      position = particle.position,
      velocity = particle.velocity;

    let touching = minCount;

    for (const neighbor of neighbors) {
      const neighborPosition = neighbor.getPosition(),
        dx = position.x - neighborPosition.x,
        dy = position.y - neighborPosition.y,
        distanceSq = dx * dx + dy * dy,
        contactDistance = particle.getRadius() + neighbor.getRadius();

      if (distanceSq >= contactDistance * contactDistance || distanceSq <= minNeighborDistance) {
        continue;
      }

      if (++touching < supportContacts) {
        continue;
      }

      velocity.x *= restRetention;
      velocity.y *= restRetention;

      return;
    }
  }

  /**
   * Moves a single particle out of the overlap with another one, back to exactly the contact
   * distance.
   *
   * Only the first particle is moved, mirroring the pressure solve: since every particle only moves
   * itself and cleans up its own overlaps right after, no pair can be left interpenetrating by a
   * particle solved later in the frame.
   * @param p1 - the particle to move
   * @param p2 - the particle to keep the distance from
   */
  #projectPair(p1: CollisionParticle, p2: CollisionParticle): void {
    const pos1 = p1.position,
      pos2 = p2.position,
      dx = pos1.x - pos2.x,
      dy = pos1.y - pos2.y,
      distanceSq = dx * dx + dy * dy,
      minDistance = p1.getRadius() + p2.getRadius();

    if (distanceSq >= minDistance * minDistance) {
      return;
    }

    if (distanceSq > minNeighborDistance) {
      const distance = Math.sqrt(distanceSq),
        inverseDistance = inverseFactorNumerator / distance,
        correction = minDistance - distance;

      pos1.x += dx * inverseDistance * correction;
      pos1.y += dy * inverseDistance * correction;
    } else {
      /* coincident particles have no direction, an alternating axis avoids a fixed bias */
      const direction = (p1.id + p2.id) % double === minCount ? identity : -identity;

      pos1.x += direction * minDistance;
    }
  }

  /**
   * Fills the neighbor list of the particle being solved, keeping only the ones that are close enough
   * to interact with it.
   * @param container - the container of the particle
   * @param particle - the particle to solve
   * @param radius - the neighborhood radius
   * @param maxNeighbors - the maximum number of neighbors to collect
   */
  #queryNeighbors(container: Container, particle: CollisionParticle, radius: number, maxNeighbors: number): void {
    if (radius <= minRadius || maxNeighbors <= minCount) {
      return;
    }

    this.#neighbors.length = 0;

    container.particles.grid.queryCircle(particle.getPosition(), radius, this.#isNeighbor, this.#neighbors);
  }
}
