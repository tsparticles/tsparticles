import {
  type Container,
  type IDelta,
  type IParticleUpdater,
  type RecursivePartial,
  getRandom,
  getRangeValue,
  loadOptionProperty,
  percentDenominator,
} from "@tsparticles/engine";
import type { ISizeParticlesOptions, SizeParticle, SizeParticlesOptions } from "./Types.js";
import { initParticleNumericAnimationValue, updateAnimation } from "@tsparticles/animation-utils";
import { Size } from "./Options/Classes/Size.js";

const minLoops = 0;

/** Size updater plugin */
export class SizeUpdater implements IParticleUpdater {
  /** The particles container */
  readonly #container;

  /**
   * SizeUpdater constructor
   * @param container -
   */
  constructor(container: Container) {
    this.#container = container;
  }

  /**
   * Initializes the particle size animation velocity
   * @param particle -
   */
  init(particle: SizeParticle): void {
    const container = this.#container,
      sizeOptions = particle.options.size;

    if (!sizeOptions) {
      return;
    }

    const sizeAnimation = sizeOptions.animation;

    if (!sizeAnimation.enable) {
      return;
    }

    particle.size.velocity = (particle.retina.sizeAnimationSpeed / percentDenominator) * container.retina.reduceFactor;

    if (sizeAnimation.sync) {
      return;
    }

    particle.size.velocity *= getRandom();
  }

  /**
   * Checks if size animation is enabled
   * @param particle -
   * @returns true if size animation is enabled, false otherwise
   */
  isEnabled(particle: SizeParticle): boolean {
    return (
      !particle.destroyed &&
      !particle.spawning &&
      particle.size.enable &&
      ((particle.size.maxLoops ?? minLoops) <= minLoops ||
        ((particle.size.maxLoops ?? minLoops) > minLoops &&
          (particle.size.loops ?? minLoops) < (particle.size.maxLoops ?? minLoops)))
    );
  }

  /**
   * Loads the size options
   * @param options -
   * @param sources -
   */
  loadOptions(
    options: SizeParticlesOptions,
    ...sources: (RecursivePartial<ISizeParticlesOptions> | undefined)[]
  ): void {
    loadOptionProperty(options, "size", Size, ...sources);
  }

  /**
   * Pre-initializes the particle size
   * @param particle -
   */
  preInit(particle: SizeParticle): void {
    const pxRatio = this.#container.retina.pixelRatio,
      options = particle.options,
      sizeOptions = options.size;

    if (!sizeOptions) {
      return;
    }

    /* size */
    particle.size = initParticleNumericAnimationValue(sizeOptions, pxRatio);

    particle.retina.sizeAnimationSpeed = getRangeValue(sizeOptions.animation.speed) * pxRatio;
  }

  /**
   * Resets the particle size state
   * @param particle -
   */
  reset(particle: SizeParticle): void {
    particle.size.time = 0;
    particle.size.loops = 0;
  }

  /**
   * Updates the particle size
   * @param particle -
   * @param delta -
   */
  update(particle: SizeParticle, delta: IDelta): void {
    if (!this.isEnabled(particle) || !particle.options.size) {
      return;
    }

    updateAnimation(particle, particle.size, true, particle.options.size.animation.destroy, delta);
  }
}
