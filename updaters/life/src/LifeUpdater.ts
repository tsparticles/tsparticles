import {
  type Container,
  type IDelta,
  type IParticleUpdater,
  type Particle,
  type RecursivePartial,
  getRandom,
  getRangeValue,
  loadOptionProperty,
  millisecondsToSeconds,
} from "@tsparticles/engine";
import type { ILifeParticlesOptions, LifeParticle, LifeParticlesOptions } from "./Types.js";
import { Life } from "./Options/Classes/Life.js";
import { updateLife } from "./Utils.js";

const noTime = 0,
  identity = 1,
  infiniteValue = -1;

/** Life updater plugin */
export class LifeUpdater implements IParticleUpdater {
  /** The particles container */
  readonly #container;

  /**
   * LifeUpdater constructor
   * @param container - The container to handle
   */
  constructor(container: Container) {
    this.#container = container;
  }

  /**
   * Initializes particle life values
   * @param particle - The particle to process
   */
  init(particle: LifeParticle): void {
    const container = this.#container,
      particlesOptions = particle.options,
      lifeOptions = particlesOptions.life;

    if (!lifeOptions) {
      return;
    }

    const delayFactor = lifeOptions.delay.sync ? identity : getRandom(),
      durationFactor = lifeOptions.duration.sync ? identity : getRandom();

    particle.life = {
      delay: container.retina.reduceFactor
        ? ((getRangeValue(lifeOptions.delay.value) * delayFactor) / container.retina.reduceFactor) *
          millisecondsToSeconds
        : noTime,
      delayTime: noTime,
      duration: container.retina.reduceFactor
        ? ((getRangeValue(lifeOptions.duration.value) * durationFactor) / container.retina.reduceFactor) *
          millisecondsToSeconds
        : noTime,
      time: noTime,
      count: lifeOptions.count,
    };

    if (particle.life.duration <= noTime) {
      particle.life.duration = infiniteValue;
    }

    if (particle.life.count <= noTime) {
      particle.life.count = infiniteValue;
    }

    particle.spawning = particle.life.delay > noTime;
  }

  /**
   * Checks if life updater is enabled
   * @param particle - The particle to process
   * @returns The boolean value
   */
  isEnabled(particle: Particle): boolean {
    return !particle.destroyed;
  }

  /**
   * Loads the life options
   * @param options - The options to handle
   * @param sources - The sources
   */
  loadOptions(
    options: LifeParticlesOptions,
    ...sources: (RecursivePartial<ILifeParticlesOptions> | undefined)[]
  ): void {
    loadOptionProperty(options, "life", Life, ...sources);
  }

  /**
   * Updates the particle life state
   * @param particle - The particle to process
   * @param delta - The delta time
   */
  update(particle: LifeParticle, delta: IDelta): void {
    if (!this.isEnabled(particle) || !particle.life) {
      return;
    }

    updateLife(particle, delta, this.#container.canvas.size);
  }
}
