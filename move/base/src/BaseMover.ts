import {
  type Container,
  type IDelta,
  type IParticleMover,
  type Particle,
  decayOffset,
  getRangeMax,
  getRangeValue,
  millisecondsToSeconds,
} from "@tsparticles/engine";
import type { MoveEngine, MoveParticle } from "./Types.js";
import { applyDistance, getProximitySpeedFactor, initSpin, move, spin } from "./Utils.js";
import type { IMovePathGenerator } from "./IMovePathGenerator.js";

const diffFactor = 2,
  defaultSizeFactor = 1,
  defaultDeltaFactor = 1;

/**
 */
export class BaseMover implements IParticleMover {
  availablePathGenerators: Map<string, IMovePathGenerator>;
  pathGenerators: Map<string, IMovePathGenerator>;

  private readonly _container;
  private readonly _engine;

  constructor(engine: MoveEngine, container: Container) {
    this._engine = engine;
    this._container = container;

    this.availablePathGenerators = new Map();
    this.pathGenerators = new Map();
  }

  destroy(): void {
    this.availablePathGenerators = new Map();
    this.pathGenerators = new Map();
  }

  /**
   * @param particle -
   * @returns check if mover is enabled
   */
  isEnabled(particle: Particle): boolean {
    return !particle.destroyed && particle.options.move.enable;
  }

  /**
   * @param particle -
   */
  particleCreated(particle: MoveParticle): void {
    const options = particle.options,
      gravityOptions = options.move.gravity,
      pathOptions = options.move.path;

    particle.moveDecay = decayOffset - getRangeValue(options.move.decay);
    particle.pathDelay = getRangeValue(pathOptions.delay.value) * millisecondsToSeconds;

    if (pathOptions.generator) {
      let pathGenerator = this.pathGenerators.get(pathOptions.generator);

      if (!pathGenerator) {
        pathGenerator = this.availablePathGenerators.get(pathOptions.generator);

        if (pathGenerator) {
          this.pathGenerators.set(pathOptions.generator, pathGenerator);

          pathGenerator.init();
        }
      }

      particle.pathGenerator = pathGenerator;
    }

    particle.gravity = {
      enable: gravityOptions.enable,
      acceleration: getRangeValue(gravityOptions.acceleration),
      inverse: gravityOptions.inverse,
    };

    initSpin(particle);
  }

  particleDestroyed(particle: MoveParticle): void {
    const pathGenerator = particle.pathGenerator;

    pathGenerator?.reset(particle);
  }

  /**
   * @param particle -
   * @param delta -
   */
  particleUpdate(particle: MoveParticle, delta: IDelta): void {
    const particleOptions = particle.options,
      moveOptions = particleOptions.move;

    if (!moveOptions.enable) {
      return;
    }

    const container = particle.container,
      pxRatio = container.retina.pixelRatio;

    particle.retina.moveSpeed ??= getRangeValue(moveOptions.speed) * pxRatio;
    particle.retina.moveDrift ??= getRangeValue(particle.options.move.drift) * pxRatio;

    const slowFactor = getProximitySpeedFactor(particle),
      reduceFactor = container.retina.reduceFactor,
      baseSpeed = particle.retina.moveSpeed,
      moveDrift = particle.retina.moveDrift,
      maxSize = getRangeMax(particleOptions.size.value) * pxRatio,
      sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : defaultSizeFactor,
      deltaFactor = delta.factor || defaultDeltaFactor,
      moveSpeed = (baseSpeed * sizeFactor * slowFactor * deltaFactor) / diffFactor,
      maxSpeed = particle.retina.maxSpeed ?? container.retina.maxSpeed;

    if (moveOptions.spin.enable) {
      spin(particle, moveSpeed, reduceFactor);
    } else {
      move(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, reduceFactor, delta);
    }

    applyDistance(particle);
  }

  preInit(): Promise<void> {
    return this._init();
  }

  redrawInit(): Promise<void> {
    return this._init();
  }

  update(): void {
    for (const pathGenerator of this.pathGenerators.values()) {
      pathGenerator.update();
    }
  }

  private async _init(): Promise<void> {
    const availablePathGenerators = await this._engine.getPathGenerators?.(this._container, true);

    if (!availablePathGenerators) {
      return;
    }

    this.availablePathGenerators = availablePathGenerators;
    this.pathGenerators = new Map();

    for (const pathGenerator of this.pathGenerators.values()) {
      pathGenerator.init();
    }
  }
}
