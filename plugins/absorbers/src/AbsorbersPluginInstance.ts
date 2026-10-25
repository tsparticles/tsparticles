import type { AbsorberInstance, OrbitingParticle } from "./AbsorberInstance.js";
import {
  type IContainerPlugin,
  type ICoordinates,
  type IDelta,
  type Particle,
  RotateDirection,
  Vector,
  calcPositionOrRandomFromSize,
  clamp,
  executeOnSingleOrMultiple,
  half,
  identity,
  isArray,
  minRadius,
  minVelocity,
} from "@tsparticles/engine";
import type { AbsorberContainer } from "./AbsorberContainer.js";
import type { AbsorbersInstancesManager } from "./AbsorbersInstancesManager.js";

/**
 * The orbit field built out of every `orbits` absorber of the container, each one weighted by the
 * attraction it exerts, so a heavier or bigger absorber pulls the orbit more than the others
 */
interface IOrbitField {
  /**
   * The attraction weighted center of all the `orbits` absorbers
   */
  center: Vector;

  /**
   * The attraction weighted absorber size, the orbit collapses once it gets this small
   */
  size: number;
}

const maxDegreeAngle = 360;

/**
 */
export class AbsorbersPluginInstance implements IContainerPlugin {
  readonly #container;
  readonly #instancesManager;

  constructor(container: AbsorberContainer, instancesManager: AbsorbersInstancesManager) {
    this.#container = container;
    this.#instancesManager = instancesManager;

    this.#instancesManager.initContainer(container);
  }

  draw(context: OffscreenCanvasRenderingContext2D): void {
    for (const absorber of this.#instancesManager.getArray(this.#container)) {
      absorber.draw(context);
    }
  }

  async init(): Promise<void> {
    const absorbers = this.#container.actualOptions.absorbers,
      promises = executeOnSingleOrMultiple(absorbers, async (absorber): Promise<void> => {
        await this.#instancesManager.addAbsorber(this.#container, absorber);
      });

    if (isArray(promises)) {
      await Promise.all(promises);
    } else {
      await promises;
    }
  }

  particleUpdate(particle: Particle, delta: IDelta): void {
    const absorbers = this.#instancesManager.getArray(this.#container),
      orbiting = particle as OrbitingParticle;

    if (!absorbers.length) {
      return;
    }

    const position = orbiting.getPosition(),
      // the forces are composed once, as vectors, before the loop below so that a growing absorber
      // can't skew what its neighbours contribute during the very same frame
      force = Vector.origin,
      orbitDriven = absorbers.some(absorber => absorber.orbits);

    for (const absorber of absorbers) {
      force.addTo(absorber.getForce(position));
    }

    // the field is built out of the same forces, from the same frame snapshot
    const field = orbitDriven ? this.#getOrbitField(absorbers, position) : undefined;

    for (const absorber of absorbers) {
      absorber.attract(orbiting, delta);

      if (particle.destroyed) {
        return;
      }
    }

    // an absorbed particle is recycled to a random position instead of being left inside the
    // absorber, where it would keep feeding its mass and size, growing it up to the limit and
    // splitting it over and over. The flag is honoured here and not only in the orbit branch below,
    // because a non orbiting absorber sets it too: recycling only the orbiting particles left every
    // particle caught by a non orbiting absorber stuck inside it
    if (orbiting.needsNewPosition) {
      this.#recycleParticle(orbiting);

      return;
    }

    if (field) {
      this.#updateOrbit(orbiting, delta, field, force);
    } else {
      orbiting.velocity.addTo(force);
    }
  }

  resize(): void {
    for (const absorber of this.#instancesManager.getArray(this.#container)) {
      absorber.resize();
    }
  }

  stop(): void {
    this.#instancesManager.clear(this.#container);
  }

  update(delta: IDelta): void {
    const absorbers = this.#instancesManager.getArray(this.#container);

    for (const absorber of absorbers) {
      absorber.update(delta);
    }

    for (const absorber of absorbers) {
      if (!absorber.shouldSplit()) {
        continue;
      }

      this.#instancesManager.splitAbsorber(this.#container, absorber);

      break;
    }
  }

  /**
   * Builds the orbit field of a particle, summing the attraction of every `orbits` absorber instead
   * of letting a single one of them take over the particle position. The center and the collapse
   * size are the attraction weighted average of the absorbers values, so the mass, the size and the
   * distance of each one decide how much it bends the orbit, and the field moves continuously as
   * the absorbers grow or get replaced. Absorbers that don't orbit don't take part in the geometry,
   * but they still push the particle through the force of the caller.
   * @param absorbers - all the absorbers of the container
   * @param position - the particle position the field is built for
   * @returns the orbit field of the particle
   */
  #getOrbitField(absorbers: AbsorberInstance[], position: ICoordinates): IOrbitField {
    const center = Vector.origin;

    let orbitAttraction = 0,
      weightedSize = 0;

    for (const absorber of absorbers) {
      if (!absorber.orbits) {
        continue;
      }

      const absorberPosition = absorber.position,
        attraction = absorber.getAttraction(position);

      orbitAttraction += attraction;
      center.x += absorberPosition.x * attraction;
      center.y += absorberPosition.y * attraction;
      weightedSize += absorber.size * attraction;
    }

    if (orbitAttraction <= minRadius) {
      return { center, size: minRadius };
    }

    center.x /= orbitAttraction;
    center.y /= orbitAttraction;

    return {
      center,
      size: weightedSize / orbitAttraction,
    };
  }

  /**
   * Recycles the particle to a random position inside the canvas, clearing the orbit geometry bound
   * to the previous position
   * @param particle - the particle to recycle
   */
  #recycleParticle(particle: OrbitingParticle): void {
    particle.position.setTo(calcPositionOrRandomFromSize({ size: this.#container.canvas.size }));
    particle.velocity.setTo(particle.initialVelocity);
    particle.absorberOrbit = undefined;
    particle.absorberOrbitDirection = undefined;
    particle.needsNewPosition = false;
  }

  /**
   * Moves the particle along the orbit field. The field is a parametric circle, so the velocity is
   * reset to let the move plugin know the position is driven from here, and the composed force of
   * all the absorbers is resolved against the orbit instead of being dropped: its radial component
   * changes the orbit radius, its tangential component changes how fast the particle turns, so
   * every absorber influences the orbit without any of them owning it
   * @param particle - the particle being updated
   * @param delta - the delta time of the frame
   * @param field - the orbit field of the particle
   * @param force - the composed force of all the absorbers on this particle
   */
  #updateOrbit(particle: OrbitingParticle, delta: IDelta, field: IOrbitField, force: Vector): void {
    const container = this.#container,
      { width, height } = container.canvas.size;

    particle.absorberOrbitDirection ??=
      particle.velocity.x >= minVelocity ? RotateDirection.clockwise : RotateDirection.counterClockwise;

    const clockwise = particle.absorberOrbitDirection === RotateDirection.clockwise,
      mirror = clockwise ? identity : -identity;

    if (particle.absorberOrbit === undefined) {
      // the orbit starts from the offset the particle already has, a random point of the circle
      // would teleport every particle the first time it gets captured
      const position = particle.getPosition(),
        offsetX = position.x - field.center.x,
        offsetY = position.y - field.center.y;

      particle.absorberOrbit = Vector.create(offsetX, mirror * offsetY);
    } else if (particle.absorberOrbit.length <= field.size) {
      // the orbit collapsed inside the absorbers, the particle is recycled inside the canvas
      // instead of being pushed outside of the visible area by a huge orbit radius
      this.#recycleParticle(particle);

      return;
    }

    const orbitRadius = particle.absorberOrbit.length,
      orbitAngle = particle.absorberOrbit.angle,
      cos = Math.cos(orbitAngle),
      sin = mirror * Math.sin(orbitAngle);

    particle.velocity.setTo(Vector.origin);

    const sizeFactor = particle.options.move.size ? particle.getRadius() / particle.size.max : identity,
      moveSpeed = particle.retina.moveSpeed * sizeFactor * (delta.factor || identity) * half,
      orbitX = field.center.x + orbitRadius * cos,
      orbitY = field.center.y + orbitRadius * sin;

    // the absorbers override the particle movement, so they have to keep it inside the visible area
    particle.position.setTo({ x: clamp(orbitX, minRadius, width), y: clamp(orbitY, minRadius, height) });

    // the force is resolved on the orbit axes: outward grows the radius, sideways speeds the turn.
    // absorbers pulling on opposite sides cancel out instead of adding up their magnitude
    const radial = force.x * cos + force.y * sin,
      tangential = force.x * -sin + force.y * cos;

    particle.absorberOrbit.length = Math.max(minRadius, orbitRadius + radial);
    particle.absorberOrbit.angle +=
      (moveSpeed + tangential * container.retina.reduceFactor) * (identity / maxDegreeAngle);
  }
}
