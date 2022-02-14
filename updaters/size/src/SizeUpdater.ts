import { AnimationStatus, DestroyType, clamp } from "tsparticles-engine";
import type { IDelta, IParticleUpdater, Particle } from "tsparticles-engine";

function checkDestroy(particle: Particle, value: number, minValue: number, maxValue: number): void {
    switch (particle.options.size.animation.destroy) {
        case DestroyType.max:
            if (value >= maxValue) {
                particle.destroy();
            }
            break;
        case DestroyType.min:
            if (value <= minValue) {
                particle.destroy();
            }
            break;
    }
}

function updateSize(particle: Particle, delta: IDelta): void {
    const sizeVelocity = (particle.size.velocity ?? 0) * delta.factor;
    const minValue = particle.size.min;
    const maxValue = particle.size.max;

    if (
        !(
            !particle.destroyed &&
            particle.size.enable &&
            ((particle.size.loops ?? 0) <= 0 || (particle.size.loops ?? 0) < (particle.size.maxLoops ?? 0))
        )
    ) {
        return;
    }

    switch (particle.size.status) {
        case AnimationStatus.increasing:
            if (particle.size.value >= maxValue) {
                particle.size.status = AnimationStatus.decreasing;

                if (!particle.size.loops) {
                    particle.size.loops = 0;
                }

                particle.size.loops++;
            } else {
                particle.size.value += sizeVelocity;
            }

            break;
        case AnimationStatus.decreasing:
            if (particle.size.value <= minValue) {
                particle.size.status = AnimationStatus.increasing;

                if (!particle.size.loops) {
                    particle.size.loops = 0;
                }

                particle.size.loops++;
            } else {
                particle.size.value -= sizeVelocity;
            }
    }

    checkDestroy(particle, particle.size.value, minValue, maxValue);

    if (!particle.destroyed) {
        particle.size.value = clamp(particle.size.value, minValue, maxValue);
    }
}

export class SizeUpdater implements IParticleUpdater {
    init(): void {
        // nothing
    }

    isEnabled(particle: Particle): boolean {
        return (
            !particle.destroyed &&
            !particle.spawning &&
            particle.size.enable &&
            ((particle.size.loops ?? 0) <= 0 || (particle.size.loops ?? 0) < (particle.size.maxLoops ?? 0))
        );
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateSize(particle, delta);
    }
}
