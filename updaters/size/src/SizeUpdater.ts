import {
  type IDelta,
  type IParticleUpdater,
  type Particle,
  getRandom,
  percentDenominator,
  updateAnimation,
} from "@tsparticles/engine";

const minLoops = 0;

export class SizeUpdater implements IParticleUpdater {
  init(particle: Particle): void {
    const container = particle.container,
      sizeOptions = particle.options.size,
      sizeAnimation = sizeOptions.animation;

    if (sizeAnimation.enable) {
      particle.size.velocity =
        ((particle.retina.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / percentDenominator) *
        container.retina.reduceFactor;

      if (!sizeAnimation.sync) {
        particle.size.velocity *= getRandom();
      }
    }
  }

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

  reset(particle: Particle): void {
    particle.size.loops = minLoops;
  }

  update(particle: Particle, delta: IDelta): void {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateAnimation(particle, particle.size, true, particle.options.size.animation.destroy, delta);
  }
}
