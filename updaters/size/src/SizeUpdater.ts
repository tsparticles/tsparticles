import {
  type Container,
  type IDelta,
  type IParticleUpdater,
  type Particle,
  getRandom,
  percentDenominator,
  updateAnimation,
} from "@tsparticles/engine";

const minLoops = 0;

/** Size updater plugin */
export class SizeUpdater implements IParticleUpdater {
  /** The particles container */
  private readonly _container;

  /**
   * SizeUpdater constructor
   * @param container
   */
  constructor(container: Container) {
    this._container = container;
  }

  /**
   * Initializes the particle size animation velocity
   * @param particle
   */
  init(particle: Particle): void {
    const container = this._container,
      sizeOptions = particle.options.size,
      sizeAnimation = sizeOptions.animation;

    if (sizeAnimation.enable) {
      particle.size.velocity =
        (particle.retina.sizeAnimationSpeed / percentDenominator) * container.retina.reduceFactor;

      if (!sizeAnimation.sync) {
        particle.size.velocity *= getRandom();
      }
    }
  }

  /**
   * Checks if size animation is enabled
   * @param particle
   */
  isEnabled(particle: Particle): boolean {
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
   * Resets the particle size state
   * @param particle
   */
  reset(particle: Particle): void {
    particle.size.time = 0;
    particle.size.loops = 0;
  }

  /**
   * Updates the particle size
   * @param particle
   * @param delta
   */
  update(particle: Particle, delta: IDelta): void {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateAnimation(particle, particle.size, true, particle.options.size.animation.destroy, delta);
  }
}
