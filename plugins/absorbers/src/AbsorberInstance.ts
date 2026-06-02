import {
  type Container,
  type ICoordinates,
  type IDelta,
  type IRgb,
  type Particle,
  type PluginManager,
  type RecursivePartial,
  RotateDirection,
  Vector,
  calcPositionOrRandomFromSize,
  calcPositionOrRandomFromSizeRanged,
  doublePI,
  getDistance,
  getDistances,
  getRandom,
  getRangeValue,
  getStyleFromRgb,
  half,
  identity,
  isPointInside,
  millisecondsToSeconds,
  minVelocity,
  originPoint,
  rangeColorToRgb,
  squareExp,
} from "@tsparticles/engine";
import { Absorber } from "./Options/Classes/Absorber.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";
import type { IAbsorberSizeLimit } from "./Options/Interfaces/IAbsorberSizeLimit.js";

const absorbFactor = 0.033,
  minOrbitLength = 0,
  minRadius = 0,
  minMass = 0,
  minAngle = 0,
  maxAngle = doublePI,
  maxDegreeAngle = 360,
  angleIncrementFactor = identity / maxDegreeAngle,
  defaultLifeDelay = 0,
  minLifeCount = 0,
  defaultSpawnDelay = 0,
  defaultLifeCount = -1;

/**
 * Particle extension type for Absorber orbit options
 */
export type OrbitingParticle = Particle & {
  /**
   * Vector representing the orbit of the particle around the absorber
   */
  absorberOrbit?: Vector;

  /**
   * Particle orbit direction around the absorber
   */
  absorberOrbitDirection?: RotateDirection;

  /**
   * Checks if the particle needs a new position after going inside the absorber
   */
  needsNewPosition?: boolean;
};

/**
 * The AbsorberInstance class manages a single absorber, handling particle attraction,
 * orbit, destruction, and lifecycle management
 */
export class AbsorberInstance {
  /**
   * The absorber color
   */
  color: IRgb;

  /**
   * The absorber size limit
   */
  limit: IAbsorberSizeLimit;

  /**
   * The absorber mass, this increases the attraction force
   */
  mass;

  /**
   * The absorber name, useful when retrieving it manually
   */
  readonly name?: string;

  /**
   * The absorber opacity
   */
  opacity;

  /**
   * Gets the absorber options
   * @internal
   */
  readonly options;

  /**
   * The absorber position
   */
  position: Vector;

  /**
   * The absorber size, great size doesn't mean great mass, it depends also on the density
   */
  size;

  readonly #container;
  #currentDuration;
  #currentSpawnDelay;
  #duration?: number;
  #firstSpawn;
  readonly #immortal;
  readonly #initialPosition?: Vector;
  #lifeCount;
  readonly #pluginManager;
  #spawnDelay?: number;

  /**
   * The absorber constructor, initializes the absorber based on the given options and position
   * @param pluginManager - the plugin manager
   * @param container - the Container engine using the absorber plugin, containing the particles that will interact with this Absorber
   * @param options - the Absorber source options
   * @param position - the Absorber optional position, if not given, it will be searched in options, and if not available also there, a random one will be used
   */
  constructor(
    pluginManager: PluginManager,
    container: Container,
    options: RecursivePartial<IAbsorber>,
    position?: ICoordinates,
  ) {
    this.#container = container;
    this.#pluginManager = pluginManager;

    this.#currentDuration = 0;
    this.#currentSpawnDelay = 0;

    this.#initialPosition = position ? Vector.create(position.x, position.y) : undefined;

    if (options instanceof Absorber) {
      this.options = options;
    } else {
      this.options = new Absorber();
      this.options.load(options);
    }

    this.name = this.options.name;
    this.opacity = this.options.opacity;
    this.size = getRangeValue(this.options.size.value) * container.retina.pixelRatio;
    this.mass = this.size * this.options.size.density * container.retina.reduceFactor;

    const limit = this.options.size.limit;

    this.limit = {
      radius: limit.radius * container.retina.pixelRatio * container.retina.reduceFactor,
      mass: limit.mass,
    };

    this.color = rangeColorToRgb(this.#pluginManager, this.options.color) ?? {
      b: 0,
      g: 0,
      r: 0,
    };

    this.position = this.#initialPosition?.copy() ?? this.#calcPosition();

    this.#firstSpawn = !this.options.life.wait;
    this.#lifeCount = this.options.life.count ?? defaultLifeCount;
    this.#immortal = this.#lifeCount <= minLifeCount;
    this.#spawnDelay = container.retina.reduceFactor
      ? (getRangeValue(this.options.life.delay ?? defaultLifeDelay) * millisecondsToSeconds) /
        container.retina.reduceFactor
      : Infinity;
  }

  /**
   * Absorber attraction interaction, attract the particle to the absorber
   * @param particle - the particle to attract to the absorber
   * @param delta - the delta time of the frame, used for calculating the force between the particles and the absorber
   */
  attract(particle: OrbitingParticle, delta: IDelta): void {
    const container = this.#container,
      options = this.options,
      pos = particle.getPosition(),
      { dx, dy, distance } = getDistances(this.position, pos),
      v = Vector.create(dx, dy);

    v.length = (this.mass / Math.pow(distance, squareExp)) * container.retina.reduceFactor;

    if (distance < this.size + particle.getRadius()) {
      const sizeFactor = particle.getRadius() * absorbFactor * container.retina.pixelRatio * delta.factor;

      if (
        (this.size > particle.getRadius() && distance < this.size - particle.getRadius()) ||
        (particle.absorberOrbit !== undefined && particle.absorberOrbit.length < minOrbitLength)
      ) {
        if (options.destroy) {
          particle.destroy();
        } else {
          particle.needsNewPosition = true;

          this.#updateParticlePosition(particle, delta, v);
        }
      } else {
        if (options.destroy) {
          particle.size.value -= sizeFactor;
        }

        this.#updateParticlePosition(particle, delta, v);
      }

      if (this.limit.radius <= minRadius || this.size < this.limit.radius) {
        this.size += sizeFactor;
      }

      if (this.limit.mass <= minMass || this.mass < this.limit.mass) {
        this.mass += sizeFactor * this.options.size.density * container.retina.reduceFactor;
      }
    } else {
      this.#updateParticlePosition(particle, delta, v);
    }
  }

  /**
   * The draw method, for drawing the absorber in the canvas
   * @param context - the canvas 2d context used for drawing
   */
  draw(context: OffscreenCanvasRenderingContext2D): void {
    context.translate(this.position.x, this.position.y);
    context.beginPath();
    context.arc(originPoint.x, originPoint.y, this.size, minAngle, maxAngle, false);
    context.closePath();
    context.fillStyle = getStyleFromRgb(this.color, this.#container.hdr, this.opacity);
    context.fill();
  }

  /**
   * The resize method, for fixing the Absorber position
   */
  resize(): void {
    const initialPosition = this.#initialPosition;

    this.position =
      initialPosition && isPointInside(initialPosition, this.#container.canvas.size, Vector.origin)
        ? initialPosition
        : this.#calcPosition();
  }

  /**
   * Updates the absorber state, including life management
   * @param delta - the delta time of the frame
   */
  update(delta: IDelta): void {
    if (this.#firstSpawn) {
      this.#firstSpawn = false;

      this.#currentSpawnDelay = this.#spawnDelay ?? defaultSpawnDelay;
    }

    if (this.#duration !== undefined) {
      this.#currentDuration += delta.value;

      if (this.#currentDuration >= this.#duration) {
        if (!this.#immortal) {
          this.#lifeCount--;
        }

        if (this.#lifeCount > minLifeCount || this.#immortal) {
          this.position = this.#calcPosition();

          this.#spawnDelay = this.#container.retina.reduceFactor
            ? (getRangeValue(this.options.life.delay ?? defaultLifeDelay) * millisecondsToSeconds) /
              this.#container.retina.reduceFactor
            : Infinity;
        }

        this.#currentDuration -= this.#duration;

        this.#duration = undefined;
      }
    }

    if (this.#spawnDelay !== undefined) {
      this.#currentSpawnDelay += delta.value;

      if (this.#currentSpawnDelay >= this.#spawnDelay) {
        this.#play();

        this.#currentSpawnDelay -= this.#spawnDelay;

        this.#spawnDelay = undefined;
      }
    }
  }

  /**
   * This method calculate the absorber position, using the provided options and position
   * @internal
   * @returns the calculated position for the absorber
   */
  #calcPosition(): Vector {
    const exactPosition = calcPositionOrRandomFromSizeRanged({
      size: this.#container.canvas.size,
      position: this.options.position,
    });

    return Vector.create(exactPosition.x, exactPosition.y);
  }

  /**
   * Play method that prepares the absorber to be drawn and updated
   */
  #play(): void {
    if (
      !(
        (this.#lifeCount > minLifeCount || this.#immortal || !this.options.life.count) &&
        (this.#firstSpawn || this.#currentSpawnDelay >= (this.#spawnDelay ?? defaultSpawnDelay))
      )
    ) {
      return;
    }

    if (this.#lifeCount > minLifeCount || this.#immortal) {
      this.#prepareToDie();
    }
  }

  /**
   * Prepares the absorber to die by calculating its life duration
   * @internal
   */
  #prepareToDie(): void {
    const duration = this.options.life.duration !== undefined ? getRangeValue(this.options.life.duration) : undefined,
      minDuration = 0;

    if ((this.#lifeCount > minLifeCount || this.#immortal) && duration !== undefined && duration > minDuration) {
      this.#duration = duration * millisecondsToSeconds;
    }
  }

  /**
   * Updates the particle position, if the particle needs a new position
   * @param particle - the particle to update
   * @param delta - the delta
   * @param v - the vector used for calculating the distance between the Absorber and the particle
   * @internal
   */
  #updateParticlePosition(particle: OrbitingParticle, delta: IDelta, v: Vector): void {
    if (particle.destroyed) {
      return;
    }

    const container = this.#container,
      canvasSize = container.canvas.size;

    if (particle.needsNewPosition) {
      const newPosition = calcPositionOrRandomFromSize({ size: canvasSize });

      particle.position.setTo(newPosition);
      particle.velocity.setTo(particle.initialVelocity);
      particle.absorberOrbit = undefined;
      particle.needsNewPosition = false;
    }

    if (this.options.orbits) {
      if (particle.absorberOrbit === undefined) {
        particle.absorberOrbit = Vector.origin;
        particle.absorberOrbit.length = getDistance(particle.getPosition(), this.position);
        particle.absorberOrbit.angle = getRandom() * maxAngle;
      }

      if (particle.absorberOrbit.length <= this.size && !this.options.destroy) {
        const minSize = Math.min(canvasSize.width, canvasSize.height),
          offset = 1,
          randomOffset = 0.1,
          randomFactor = 0.2;

        particle.absorberOrbit.length = minSize * (offset + (getRandom() * randomFactor - randomOffset));
      }

      particle.absorberOrbitDirection ??=
        particle.velocity.x >= minVelocity ? RotateDirection.clockwise : RotateDirection.counterClockwise;

      const orbitRadius = particle.absorberOrbit.length,
        orbitAngle = particle.absorberOrbit.angle,
        orbitDirection = particle.absorberOrbitDirection;

      particle.velocity.setTo(Vector.origin);

      const maxSize = particle.size.max,
        sizeFactor = particle.options.move.size ? particle.getRadius() / maxSize : identity,
        deltaFactor = delta.factor || identity,
        baseSpeed = particle.retina.moveSpeed,
        moveSpeed = baseSpeed * sizeFactor * deltaFactor * half;

      particle.position.x = this.position.x + orbitRadius * Math.cos(orbitAngle);
      particle.position.y =
        this.position.y +
        orbitRadius * (orbitDirection === RotateDirection.clockwise ? identity : -identity) * Math.sin(orbitAngle);

      particle.absorberOrbit.length = Math.max(minOrbitLength, particle.absorberOrbit.length - v.length);
      particle.absorberOrbit.angle += moveSpeed * angleIncrementFactor * container.retina.reduceFactor;
    } else {
      particle.velocity.addTo(v);
    }
  }
}
