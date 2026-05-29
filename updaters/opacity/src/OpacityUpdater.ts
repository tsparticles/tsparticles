import {
  type Container,
  type IDelta,
  type IParticleUpdater,
  type RecursivePartial,
  getRandom,
  getRangeValue,
  initParticleNumericAnimationValue,
  percentDenominator,
  updateAnimation,
} from "@tsparticles/engine";
import { type IOpacityParticlesOptions, type OpacityParticle, type OpacityParticlesOptions } from "./Types.js";
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
   * @param particle -
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
   * @param particle -
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
   * @param options -
   * @param sources -
   */
  loadOptions(
    options: OpacityParticlesOptions,
    ...sources: (RecursivePartial<IOpacityParticlesOptions> | undefined)[]
  ): void {
    options.opacity ??= new Opacity();

    for (const source of sources) {
      options.opacity.load(source?.opacity);
    }
  }

  /**
   * Resets the opacity of a particle
   * @param particle -
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
   * @param particle -
   * @param delta -
   */
  update(particle: OpacityParticle, delta: IDelta): void {
    if (!this.isEnabled(particle) || !particle.opacity || !particle.options.opacity) {
      return;
    }

    updateAnimation(particle, particle.opacity, true, particle.options.opacity.animation.destroy, delta);
  }
}
