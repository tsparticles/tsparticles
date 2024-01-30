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
    async init(particle: Particle): Promise<void> {
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

        await Promise.resolve();
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

    async update(particle: Particle, delta: IDelta): Promise<void> {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateAnimation(particle, particle.size, true, particle.options.size.animation.destroy, delta);

        await Promise.resolve();
    }
}
