import type { IDelta, IParticleUpdater, IParticleValueAnimation, Particle } from "tsparticles";
import { AnimationStatus } from "tsparticles";

function updateColorValue(delta: IDelta, value: IParticleValueAnimation<number>, max: number, decrease: boolean): void {
    const colorValue = value;

    if (!colorValue || !colorValue.enable) {
        return;
    }

    //const offset = NumberUtils.randomInRange(valueAnimation.offset);
    const velocity = (value.velocity ?? 0) * delta.factor; // + offset * 3.6;

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

function updateGradient(particle: Particle, delta: IDelta): void {
    if (!particle.gradient) {
        return;
    }

    for (const color of particle.gradient.colors) {
        ///*const animationOptions = particle.options.gradient.animation;

        if (particle.color?.h !== undefined) {
            updateColorValue(delta, color.value.h, /*animationOptions.h,*/ 360, false);
        }

        if (particle.color?.s !== undefined) {
            updateColorValue(delta, color.value.s, /*animationOptions.s,*/ 100, true);
        }

        if (particle.color?.l !== undefined) {
            updateColorValue(delta, color.value.l, /*animationOptions.l,*/ 100, true);
        }
    }
}

export class GradientUpdater implements IParticleUpdater {
    isEnabled(particle: Particle): boolean {
        return (
            !particle.destroyed &&
            !particle.spawning &&
            (particle.gradient?.colors.some(
                (c) => c.value.h.value !== undefined || c.value.s.value !== undefined || c.value.l.value !== undefined
            ) ??
                false)
        );
    }

    update(particle: Particle, delta: IDelta): void {
        updateGradient(particle, delta);
    }
}
