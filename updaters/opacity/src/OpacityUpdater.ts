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
import { type IOpacityParticlesOptions, type OpacityParticle, type OpacityParticlesOptions } from "./Types.js";
import { initParticleNumericAnimationValue, updateAnimation } from "@tsparticles/animation-utils";
import { Opacity } from "./Options/Classes/Opacity.js";

/**
 * The opacity updater, it manages the opacity on each particle
 */
export class OpacityUpdater implements IParticleUpdater {
  readonly #container;

  /**
   * Constructor of opacity updater
   * @param container - The container to manage
   */
  constructor(container: Container) {
    this.#container = container;
  }

  /**
   * Init a single particle opacity
   * @param particle - The particle to process
   */
  init(particle: OpacityParticle): void {
    /* opacity */
    const opacityOptions = particle.options.opacity,
      pxRatio = 1;

    if (!opacityOptions) {
      return;
    }

    particle.opacity = initParticleNumericAnimationValue(opacityOptions, pxRatio);

    const opacityAnimation = opacityOptions.animation;

    if (opacityAnimation.enable) {
      particle.opacity.velocity =
        (getRangeValue(opacityAnimation.speed) / percentDenominator) * this.#container.retina.reduceFactor;

      if (!opacityAnimation.sync) {
        particle.opacity.velocity *= getRandom();
      }
    }
  }

  /**
   * Checks if opacity updater is enabled
   * @param particle - The particle to process
   * @returns true if opacity updater is enabled, false otherwise
   */
  isEnabled(particle: OpacityParticle): boolean {
    const none = 0;

    return (
      !particle.destroyed &&
      !particle.spawning &&
      !!particle.opacity &&
      particle.opacity.enable &&
      ((particle.opacity.maxLoops ?? none) <= none ||
        ((particle.opacity.maxLoops ?? none) > none &&
          (particle.opacity.loops ?? none) < (particle.opacity.maxLoops ?? none)))
    );
  }

  /**
   * Loads the opacity options
   * @param options - The options to handle
   * @param sources - The sources
   */
  loadOptions(
    options: OpacityParticlesOptions,
    ...sources: (RecursivePartial<IOpacityParticlesOptions> | undefined)[]
  ): void {
    loadOptionProperty(options, "opacity", Opacity, ...sources);
  }

  /**
   * Resets the opacity of a particle
   * @param particle - The particle to process
   */
  reset(particle: OpacityParticle): void {
    if (!particle.opacity) {
      return;
    }

    particle.opacity.time = 0;
    particle.opacity.loops = 0;
  }

  /**
   * Update function of the opacity updater
   * @param particle - The particle to process
   * @param delta - The delta time
   */
  update(particle: OpacityParticle, delta: IDelta): void {
    if (!this.isEnabled(particle) || !particle.opacity || !particle.options.opacity) {
      return;
    }

    updateAnimation(particle, particle.opacity, true, particle.options.opacity.animation.destroy, delta);
  }
}
