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

function updateSize(particle: Particle, delta: IDelta): void {
    const sizeOpt = particle.options.size;
    const sizeAnim = sizeOpt.animation;
    const sizeVelocity = (particle.size.velocity ?? 0) * delta.factor;
    const minValue = particle.size.min;
    const maxValue = particle.size.max;

    if (!(!particle.destroyed && sizeAnim.enable && (sizeAnim.count <= 0 || particle.loops.size < sizeAnim.count))) {
        return;
    }

    switch (particle.size.status) {
        case AnimationStatus.increasing:
            if (particle.size.value >= maxValue) {
                particle.size.status = AnimationStatus.decreasing;
                particle.loops.size++;
            } else {
                particle.size.value += sizeVelocity;
            }

            break;
        case AnimationStatus.decreasing:
            if (particle.size.value <= minValue) {
                particle.size.status = AnimationStatus.increasing;
                particle.loops.size++;
            } else {
                particle.size.value -= sizeVelocity;
            }
    }

    checkDestroy(particle, sizeAnim.destroy, particle.size.value, minValue, maxValue);

    if (!particle.destroyed) {
        particle.size.value = clamp(particle.size.value, minValue, maxValue);
    }
}

export class SizeUpdater implements IParticleUpdater {
    isEnabled(particle: Particle): boolean {
        const sizeOpt = particle.options.size;
        const sizeAnim = sizeOpt.animation;

        return (
            !particle.destroyed &&
            !particle.spawning &&
            sizeAnim.enable &&
            (sizeAnim.count <= 0 || particle.loops.size < sizeAnim.count)
        );
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateSize(particle, delta);
    }
}
