import {
    AnimationStatus,
    type IDelta,
    type IParticleNumericValueAnimation,
    type IParticleValueAnimation,
} from "@tsparticles/engine";
import type { GradientParticle } from "./Types.js";

const defaultVelocity = 0,
    identity = 1,
    defaultDelayTime = 0,
    double = 2,
    doublePI = Math.PI * double;

/**
 * @param delta -
 * @param value -
 */
function updateColorOpacity(delta: IDelta, value: IParticleNumericValueAnimation): void {
    if (!value.enable) {
        return;
    }

    const decay = value.decay ?? identity;

    switch (value.status) {
        case AnimationStatus.increasing:
            if (value.value >= value.max) {
                value.status = AnimationStatus.decreasing;
            } else {
                value.value += (value.velocity ?? defaultVelocity) * delta.factor;
            }

            break;
        case AnimationStatus.decreasing:
            if (value.value <= value.min) {
                value.status = AnimationStatus.increasing;
            } else {
                value.value -= (value.velocity ?? defaultVelocity) * delta.factor;
            }

            break;
    }

    if (value.velocity && decay !== identity) {
        value.velocity *= decay;
    }
}

/**
 * @param delta -
 * @param colorValue -
 * @param max -
 * @param decrease -
 */
function updateColorValue(
    delta: IDelta,
    colorValue: IParticleValueAnimation<number>,
    max: number,
    decrease: boolean,
): void {
    if (!colorValue || !colorValue.enable) {
        return;
    }

    if (!colorValue.time) {
        colorValue.time = 0;
    }

    if (
        (colorValue.delayTime ?? defaultDelayTime) > defaultDelayTime &&
        colorValue.time < (colorValue.delayTime ?? defaultDelayTime)
    ) {
        colorValue.time += delta.value;
    }

    if (
        (colorValue.delayTime ?? defaultDelayTime) > defaultDelayTime &&
        colorValue.time < (colorValue.delayTime ?? defaultDelayTime)
    ) {
        return;
    }

    const velocity = (colorValue.velocity ?? defaultVelocity) * delta.factor,
        decay = colorValue.decay ?? identity;

    if (!decrease || colorValue.status === AnimationStatus.increasing) {
        colorValue.value += velocity;

        if (decrease && colorValue.value > max) {
            colorValue.status = AnimationStatus.decreasing;
            colorValue.value -= colorValue.value % max;
        }
    } else {
        colorValue.value -= velocity;

        if (colorValue.value < defaultVelocity) {
            colorValue.status = AnimationStatus.increasing;
            colorValue.value += colorValue.value;
        }
    }

    if (colorValue.value > max) {
        colorValue.value %= max;
    }

    if (colorValue.velocity && decay !== identity) {
        colorValue.velocity *= decay;
    }
}

/**
 * @param delta -
 * @param angle -
 */
function updateAngle(delta: IDelta, angle: IParticleValueAnimation<number>): void {
    const speed = (angle.velocity ?? defaultVelocity) * delta.factor,
        max = doublePI,
        decay = angle.decay ?? identity;

    if (!angle.enable) {
        return;
    }

    switch (angle.status) {
        case AnimationStatus.increasing:
            angle.value += speed;

            if (angle.value > max) {
                angle.value -= max;
            }

            break;
        case AnimationStatus.decreasing:
        default:
            angle.value -= speed;

            if (angle.value < defaultVelocity) {
                angle.value += max;
            }

            break;
    }

    if (angle.velocity && decay !== identity) {
        angle.velocity *= decay;
    }
}

/**
 * @param particle -
 * @param delta -
 */
export function updateGradient(particle: GradientParticle, delta: IDelta): void {
    const { gradient } = particle;

    if (!gradient) {
        return;
    }

    updateAngle(delta, gradient.angle);

    const maxColorValues = {
        h: 360,
        s: 100,
        l: 100,
    };

    for (const color of gradient.colors) {
        if (particle.color?.h !== undefined) {
            updateColorValue(delta, color.value.h, maxColorValues.h, false);
        }

        if (particle.color?.s !== undefined) {
            updateColorValue(delta, color.value.s, maxColorValues.s, true);
        }

        if (particle.color?.l !== undefined) {
            updateColorValue(delta, color.value.l, maxColorValues.l, true);
        }

        if (color.opacity) {
            updateColorOpacity(delta, color.opacity);
        }
    }
}
