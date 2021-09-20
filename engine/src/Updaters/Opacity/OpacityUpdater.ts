import type { Particle } from "../../Core/Particle";
import type { IDelta, IParticleUpdater } from "../../Core/Interfaces";
import { AnimationStatus, DestroyType, StartValueType } from "../../Enums";
import { clamp, getRangeMax, getRangeMin, getRangeValue, randomInRange } from "../../Utils";
import { Container } from "../../Core/Container";

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
    if (!particle.opacity) {
        return;
    }

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
    constructor(private readonly container: Container) {}

    init(particle: Particle): void {
        /* opacity */
        const opacityOptions = particle.options.opacity;

        particle.opacity = {
            enable: opacityOptions.animation.enable,
            max: getRangeMax(opacityOptions.value),
            min: getRangeMin(opacityOptions.value),
            value: getRangeValue(opacityOptions.value),
            loops: 0,
            maxLoops: opacityOptions.animation.count,
        };

        const opacityAnimation = opacityOptions.animation;

        if (opacityAnimation.enable) {
            particle.opacity.status = AnimationStatus.increasing;

            const opacityRange = opacityOptions.value;

            particle.opacity.min = getRangeMin(opacityRange);
            particle.opacity.max = getRangeMax(opacityRange);

            switch (opacityAnimation.startValue) {
                case StartValueType.min:
                    particle.opacity.value = particle.opacity.min;
                    particle.opacity.status = AnimationStatus.increasing;

                    break;

                case StartValueType.random:
                    particle.opacity.value = randomInRange(particle.opacity);
                    particle.opacity.status =
                        Math.random() >= 0.5 ? AnimationStatus.increasing : AnimationStatus.decreasing;

                    break;

                case StartValueType.max:
                default:
                    particle.opacity.value = particle.opacity.max;
                    particle.opacity.status = AnimationStatus.decreasing;

                    break;
            }

            particle.opacity.velocity = (opacityAnimation.speed / 100) * this.container.retina.reduceFactor;

            if (!opacityAnimation.sync) {
                particle.opacity.velocity *= Math.random();
            }
        }
    }

    isEnabled(particle: Particle): boolean {
        return (
            !particle.destroyed &&
            !particle.spawning &&
            !!particle.opacity &&
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
