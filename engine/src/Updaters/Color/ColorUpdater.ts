import { Particle } from "../../Core/Particle";
import type { IDelta, IParticleUpdater, IParticleValueAnimation } from "../../Core/Interfaces";
import { AnimationStatus } from "../../Enums";
import { randomInRange } from "../../Utils";
import type { IColorAnimation } from "../../Options/Interfaces/IColorAnimation";

function updateColorValue(
    delta: IDelta,
    value: IParticleValueAnimation<number>,
    valueAnimation: IColorAnimation,
    max: number,
    decrease: boolean
): void {
    const colorValue = value;

    if (!colorValue || !valueAnimation.enable) {
        return;
    }

    const offset = randomInRange(valueAnimation.offset);
    const velocity = (value.velocity ?? 0) * delta.factor + offset * 3.6;

    if (!decrease || colorValue.status === AnimationStatus.increasing) {
        colorValue.value += velocity;

        if (decrease && colorValue.value > max) {
            colorValue.status = AnimationStatus.decreasing;
            colorValue.value -= colorValue.value % max;
        }
    } else {
        colorValue.value -= velocity;

        if (colorValue.value < 0) {
            colorValue.status = AnimationStatus.increasing;
            colorValue.value += colorValue.value;
        }
    }

    if (colorValue.value > max) {
        colorValue.value %= max;
    }
}

function updateColor(particle: Particle, delta: IDelta): void {
    const animationOptions = particle.options.color.animation;

    if (particle.color?.h !== undefined) {
        updateColorValue(delta, particle.color.h, animationOptions.h, 360, false);
    }

    if (particle.color?.s !== undefined) {
        updateColorValue(delta, particle.color.s, animationOptions.s, 100, true);
    }

    if (particle.color?.l !== undefined) {
        updateColorValue(delta, particle.color.l, animationOptions.l, 100, true);
    }
}

export class ColorUpdater implements IParticleUpdater {
    isEnabled(particle: Particle): boolean {
        const animationOptions = particle.options.color.animation;

        return (
            !particle.destroyed &&
            !particle.spawning &&
            ((particle.color?.h.value !== undefined && animationOptions.h.enable) ||
                (particle.color?.s.value !== undefined && animationOptions.s.enable) ||
                (particle.color?.l.value !== undefined && animationOptions.l.enable))
        );
    }

    update(particle: Particle, delta: IDelta): void {
        updateColor(particle, delta);
    }
}
