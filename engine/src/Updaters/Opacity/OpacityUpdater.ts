import type { Particle } from "../../Core/Particle";
import type { IDelta, IParticleUpdater } from "../../Core/Interfaces";
import { AnimationStatus, DestroyType } from "../../Enums";
import { clamp } from "../../Utils";

function checkDestroy(particle: Particle, value: number, minValue: number, maxValue: number): void {
    switch (particle.options.opacity.animation.destroy) {
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

function updateOpacity(particle: Particle, delta: IDelta): void {
    const minValue = particle.opacity.min;
    const maxValue = particle.opacity.max;

    if (
        !(
            !particle.destroyed &&
            particle.opacity.enable &&
            ((particle.opacity.maxLoops ?? 0) <= 0 || (particle.opacity.loops ?? 0) < (particle.opacity.maxLoops ?? 0))
        )
    ) {
        return;
    }

    switch (particle.opacity.status) {
        case AnimationStatus.increasing:
            if (particle.opacity.value >= maxValue) {
                particle.opacity.status = AnimationStatus.decreasing;

                if (!particle.opacity.loops) {
                    particle.opacity.loops = 0;
                }

                particle.opacity.loops++;
            } else {
                particle.opacity.value += (particle.opacity.velocity ?? 0) * delta.factor;
            }

            break;
        case AnimationStatus.decreasing:
            if (particle.opacity.value <= minValue) {
                particle.opacity.status = AnimationStatus.increasing;

                if (!particle.opacity.loops) {
                    particle.opacity.loops = 0;
                }

                particle.opacity.loops++;
            } else {
                particle.opacity.value -= (particle.opacity.velocity ?? 0) * delta.factor;
            }

            break;
    }

    checkDestroy(particle, particle.opacity.value, minValue, maxValue);

    if (!particle.destroyed) {
        particle.opacity.value = clamp(particle.opacity.value, minValue, maxValue);
    }
}

export class OpacityUpdater implements IParticleUpdater {
    init(particle: Particle): void {
        // nothing
    }

    isEnabled(particle: Particle): boolean {
        return (
            !particle.destroyed &&
            !particle.spawning &&
            particle.opacity.enable &&
            ((particle.opacity.maxLoops ?? 0) <= 0 || (particle.opacity.loops ?? 0) < (particle.opacity.maxLoops ?? 0))
        );
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateOpacity(particle, delta);
    }
}
