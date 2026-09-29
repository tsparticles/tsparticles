import {
  type Container,
  type ICoordinates,
  type IDelta,
  type IRgb,
  type Particle,
  type PluginManager,
  type RecursivePartial,
  type RotateDirection,
  Vector,
  calcPositionOrRandomFromSizeRanged,
  doublePI,
  getDistance,
  getRangeValue,
  getStyleFromRgb,
  isPointInside,
  millisecondsToSeconds,
  minRadius,
  originPoint,
  rangeColorToRgb,
  squareExp,
} from "@tsparticles/engine";
import { Absorber } from "./Options/Classes/Absorber.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";
import type { IAbsorberSizeLimit } from "./Options/Interfaces/IAbsorberSizeLimit.js";

const absorbFactor = 0.033,
  minOrbitLength = 0,
  minMass = 0,
  minAngle = 0,
  maxAngle = doublePI,
  defaultLifeDelay = 0,
  minLifeCount = 0,
  defaultSpawnDelay = 0,
  defaultLifeCount = -1,
  // upper bound of the single frame attraction, keeps the particle controllable when it gets very
  // close to the absorber and the inverse square law would otherwise explode
  maxAttractForce = 100;

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
   * Whether the absorbed particles orbit around the absorber instead of being pulled towards it
   */
  readonly orbits;

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
  readonly #initialMass;
  readonly #initialPosition?: Vector;
  readonly #initialSize;
  #lifeCount;
  readonly #pluginManager;
  #spawnDelay?: number;
  #splitting = false;

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
    this.orbits = this.options.orbits;
    this.size = getRangeValue(this.options.size.value) * container.retina.pixelRatio;
    this.mass = this.size * this.options.size.density * container.retina.reduceFactor;

    this.#initialSize = this.size;
    this.#initialMass = this.mass;

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
   * The contact part of the attraction, the absorber absorbs and grows when the particle reaches
   * it. The force itself is reported by {@link getForce} and composed by the caller, so this
   * absorber never writes the particle velocity nor its position and can never overwrite what
   * another absorber of the same frame contributed
   * @param particle - the particle reaching the absorber
   * @param delta - the delta time of the frame, used for calculating the growth of the absorber
   */
  attract(particle: OrbitingParticle, delta: IDelta): void {
    const container = this.#container,
      options = this.options,
      pos = particle.getPosition(),
      distance = getDistance(this.position, pos);

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
        }
      } else if (options.destroy) {
        particle.size.value -= sizeFactor;
      }

      if (this.limit.radius <= minRadius || this.size < this.limit.radius) {
        this.size += sizeFactor;
      }

      if (this.limit.mass <= minMass || this.mass < this.limit.mass) {
        this.mass += sizeFactor * this.options.size.density * container.retina.reduceFactor;
      }
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
    context.fillStyle = getStyleFromRgb(
      this.color,
      this.#container.hdr,
      this.opacity,
      this.#container.peakNits,
      this.#container.hdrMode,
    );
    context.fill();
  }

  /**
   * The attraction this absorber exerts on a point, the same value is used as the force applied to
   * the particle velocity and as the weight of this absorber inside the orbit field
   * @param point - the point to pull towards the absorber
   * @returns the attraction magnitude, capped so a point sitting on the absorber centre can't
   * produce an infinite force
   */
  getAttraction(point: ICoordinates): number {
    // the absorber is a body with a radius, not a point mass: clamping the effective distance to
    // its own size keeps the inverse square force finite when the particle reaches the centre
    const effectiveDistance = Math.max(getDistance(this.position, point), this.size, minRadius);

    return Math.min(
      (this.mass / effectiveDistance ** squareExp) * this.#container.retina.reduceFactor,
      maxAttractForce,
    );
  }

  /**
   * The force this absorber exerts on a point, as a vector pointing from the point towards the
   * absorber. Forces of this kind are meant to be summed as vectors: an absorber on the opposite
   * side of the particle cancels the previous one, instead of overwriting or adding up its
   * magnitude
   * @param point - the point pulled towards the absorber
   * @returns the force vector, with the capped magnitude of {@link getAttraction}
   */
  getForce(point: ICoordinates): Vector {
    const force = Vector.create(this.position.x - point.x, this.position.y - point.y);

    force.length = this.getAttraction(point);

    return force;
  }

  /**
   * Tells whether this absorber is already being split
   * @returns `true` while a split started on this absorber has not settled yet
   */
  isSplitting(): boolean {
    return this.#splitting;
  }

  /**
   * Marks the absorber as being split, so `shouldSplit` returns `false` until the split settles
   */
  markSplitting(): void {
    this.#splitting = true;
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
   * Checks if the absorber reached one of its configured size limits and should split
   * @returns true if the absorber should split
   */
  shouldSplit(): boolean {
    // a split is asynchronous and the caller doesn't await it: without this guard the same
    // absorber could be split again on the next frames, while the first split is still in
    // flight, spawning a whole set of particles every time
    if (this.#splitting || !this.options.split.enable) {
      return false;
    }

    const grown = this.size > this.#initialSize || this.mass > this.#initialMass,
      radiusLimitReached = this.limit.radius > minRadius && this.size >= this.limit.radius,
      massLimitReached = this.limit.mass > minMass && this.mass >= this.limit.mass;

    return grown && (radiusLimitReached || massLimitReached);
  }

  /**
   * Releases the splitting mark set by {@link markSplitting}
   */
  unmarkSplitting(): void {
    this.#splitting = false;
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
    if (!(
      (this.#lifeCount > minLifeCount || this.#immortal || !this.options.life.count) &&
      (this.#firstSpawn || this.#currentSpawnDelay >= (this.#spawnDelay ?? defaultSpawnDelay))
    )) {
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
}
