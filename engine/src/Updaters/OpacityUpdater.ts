import { Particle } from "../Core/Particle";
import { IDelta, IParticleUpdater } from "../Core/Interfaces";
import { AnimationStatus, DestroyType } from "../Enums";
import { clamp } from "../Utils";

function checkDestroy(
    particle: Particle,
    destroy: DestroyType | keyof typeof DestroyType,
    value: number,
    minValue: number,
    maxValue: number
): void {
    switch (destroy) {
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
    const opacityOpt = particle.options.opacity;
    const opacityAnim = opacityOpt.animation;
    const minValue = particle.opacity.min;
    const maxValue = particle.opacity.max;

    if (
        !(
            !particle.destroyed &&
            opacityAnim.enable &&
            (opacityAnim.count <= 0 || particle.loops.opacity < opacityAnim.count)
        )
    ) {
        return;
    }

    switch (particle.opacity.status) {
        case AnimationStatus.increasing:
            if (particle.opacity.value >= maxValue) {
                particle.opacity.status = AnimationStatus.decreasing;
                particle.loops.opacity++;
            } else {
                particle.opacity.value += (particle.opacity.velocity ?? 0) * delta.factor;
            }

            break;
        case AnimationStatus.decreasing:
            if (particle.opacity.value <= minValue) {
                particle.opacity.status = AnimationStatus.increasing;
                particle.loops.opacity++;
            } else {
                particle.opacity.value -= (particle.opacity.velocity ?? 0) * delta.factor;
            }

            break;
    }

    checkDestroy(particle, opacityAnim.destroy, particle.opacity.value, minValue, maxValue);

    if (!particle.destroyed) {
        particle.opacity.value = clamp(particle.opacity.value, minValue, maxValue);
    }
}

export class OpacityUpdater implements IParticleUpdater {
    isEnabled(particle: Particle): boolean {
        const opacityAnim = particle.options.opacity.anim;

        return (
            !particle.destroyed &&
            !particle.spawning &&
            opacityAnim.enable &&
            (opacityAnim.count <= 0 || particle.loops.opacity < opacityAnim.count)
        );
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateOpacity(particle, delta);
    }
}
