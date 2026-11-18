import {
  type Container,
  type IContainerPlugin,
  type IDelta,
  decayOffset,
  getItemMapFromInitializer,
  getRangeValue,
  half,
  identity,
  millisecondsToSeconds,
} from "@tsparticles/engine";
import type { MoveParticle, MovePluginManager, PathGeneratorInitializer } from "./Types.js";
import { applyDistance, getProximitySpeedFactor, initSpin, move, spin } from "./Utils.js";
import type { IMovePathGenerator } from "./IMovePathGenerator.js";

const defaultSizeFactor = 1;

export class MovePluginInstance implements IContainerPlugin {
  /** Available path generators from the engine */
  availablePathGenerators: Map<string, IMovePathGenerator>;
  /** Active path generators for this container */
  pathGenerators: Map<string, IMovePathGenerator>;

  /** The particles container */
  readonly #container;
  #generation = 0;
  /** The plugin manager */
  readonly #pluginManager;

  /**
   * Creates a new MovePluginInstance
   * @param pluginManager - the plugin manager
   * @param container - the particles container
   */
  constructor(pluginManager: MovePluginManager, container: Container) {
    this.#pluginManager = pluginManager;
    this.#container = container;

    this.availablePathGenerators = new Map();
    this.pathGenerators = new Map();
  }

  destroy(): void {
    this.stop();
  }

  /**
   * @param particle - The particle to process
   * @returns check if mover is enabled
   */
  isEnabled(particle: MoveParticle): boolean {
    return !particle.destroyed && particle.options.move.enable;
  }

  particleCreated(particle: MoveParticle): void {
    const options = particle.options,
      moveOptions = options.move,
      gravityOptions = moveOptions.gravity,
      pathOptions = moveOptions.path;

    particle.pathGenerator = undefined;
    particle.spin = undefined;
    particle.retina.spinAcceleration = undefined;

    particle.moveDecay = decayOffset - getRangeValue(moveOptions.decay, this.#container.engine.getRandomFn());
    particle.pathDelay =
      getRangeValue(pathOptions.delay.value, this.#container.engine.getRandomFn()) * millisecondsToSeconds;

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
      acceleration: getRangeValue(gravityOptions.acceleration, this.#container.engine.getRandomFn()),
      inverse: gravityOptions.inverse,
    };

    initSpin(this.#container, particle);
  }

  particleDestroyed(particle: MoveParticle): void {
    const pathGenerator = particle.pathGenerator;

    pathGenerator?.reset(particle);
  }

  particleUpdate(particle: MoveParticle, delta: IDelta): void {
    const particleOptions = particle.options,
      moveOptions = particleOptions.move;

    if (!moveOptions.enable) {
      return;
    }

    const container = this.#container,
      slowFactor = getProximitySpeedFactor(particle),
      reduceFactor = container.retina.reduceFactor,
      baseSpeed = particle.retina.moveSpeed,
      moveDrift = particle.retina.moveDrift,
      maxSize = particle.size.max,
      sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : defaultSizeFactor,
      moveSpeed = baseSpeed * sizeFactor * slowFactor * half,
      maxSpeed = particle.retina.maxSpeed;

    if (moveOptions.spin.enable) {
      spin(container, particle, moveSpeed * (delta.factor || identity), reduceFactor);
    } else {
      move(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, reduceFactor, delta);
    }

    applyDistance(particle);
  }

  preInit(): Promise<void> {
    return this.#init();
  }

  redrawInit(): Promise<void> {
    return this.#init();
  }

  stop(): void {
    this.#generation++;

    const generators = new Set([...this.availablePathGenerators.values(), ...this.pathGenerators.values()]);

    for (const generator of generators) {
      generator.destroy?.();
    }

    this.availablePathGenerators = new Map();
    this.pathGenerators = new Map();
  }

  /** Updates all active path generators */
  update(): void {
    for (const pathGenerator of this.pathGenerators.values()) {
      pathGenerator.update();
    }
  }

  async #init(): Promise<void> {
    const generation = this.#generation,
      pluginManager = this.#pluginManager;

    if (!pluginManager.initializers.pathGenerators) {
      return;
    }

    const availablePathGenerators = await getItemMapFromInitializer<IMovePathGenerator, PathGeneratorInitializer>(
      this.#container,
      pluginManager.initializers.pathGenerators,
    );

    if (generation !== this.#generation || this.#container.destroyed) {
      for (const generator of availablePathGenerators.values()) {
        generator.destroy?.();
      }

      return;
    }

    this.availablePathGenerators = availablePathGenerators;

    this.pathGenerators = new Map();

    for (const pathGenerator of this.pathGenerators.values()) {
      pathGenerator.init();
    }
  }
}
