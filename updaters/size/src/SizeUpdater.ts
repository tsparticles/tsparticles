import { type IDelta, type IParticleUpdater, type Particle, getRandom } from "@tsparticles/engine";
import { updateSize } from "./Utils";

export class SizeUpdater implements IParticleUpdater {
    init(particle: Particle): void {
        const container = particle.container,
            sizeOptions = particle.options.size,
            sizeAnimation = sizeOptions.animation;

        if (sizeAnimation.enable) {
            particle.size.velocity =
                ((particle.retina.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / 100) *
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
            ((particle.size.maxLoops ?? 0) <= 0 ||
                ((particle.size.maxLoops ?? 0) > 0 && (particle.size.loops ?? 0) < (particle.size.maxLoops ?? 0)))
        );
    }

    reset(particle: Particle): void {
        particle.size.loops = 0;
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateSize(particle, delta);
    }
}
