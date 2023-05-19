import {
    AnimationStatus,
    type IDelta,
    type IParticleNumericValueAnimation,
    type IParticleValueAnimation,
} from "tsparticles-engine";
import type { GradientParticle } from "./Types";

/**
 * @param delta -
 * @param value -
 */
function updateColorOpacity(delta: IDelta, value: IParticleNumericValueAnimation): void {
    if (!value.enable) {
        return;
    }

    const decay = value.decay ?? 1;

    switch (value.status) {
        case AnimationStatus.increasing:
            if (value.value >= value.max) {
                value.status = AnimationStatus.decreasing;
            } else {
                value.value += (value.velocity ?? 0) * delta.factor;
            }

            break;
        case AnimationStatus.decreasing:
            if (value.value <= value.min) {
                value.status = AnimationStatus.increasing;
            } else {
                value.value -= (value.velocity ?? 0) * delta.factor;
            }

            break;
    }

    if (value.velocity && decay !== 1) {
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
    decrease: boolean
): void {
    if (!colorValue || !colorValue.enable) {
        return;
    }

    if (!colorValue.time) {
        colorValue.time = 0;
    }

    if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
        colorValue.time += delta.value;
    }

    if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
        return;
    }

    //const offset = NumberUtils.randomInRange(valueAnimation.offset);
    const velocity = (colorValue.velocity ?? 0) * delta.factor,
        decay = colorValue.decay ?? 1; // + offset * 3.6;

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

    if (colorValue.velocity && decay !== 1) {
        colorValue.velocity *= decay;
    }
}

/**
 * @param delta -
 * @param angle -
 */
function updateAngle(delta: IDelta, angle: IParticleValueAnimation<number>): void {
    const speed = (angle.velocity ?? 0) * delta.factor,
        max = 2 * Math.PI,
        decay = angle.decay ?? 1;

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

            if (angle.value < 0) {
                angle.value += max;
            }

            break;
    }

    if (angle.velocity && decay !== 1) {
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

    for (const color of gradient.colors) {
        if (particle.color?.h !== undefined) {
            updateColorValue(delta, color.value.h, 360, false);
        }

        if (particle.color?.s !== undefined) {
            updateColorValue(delta, color.value.s, 100, true);
        }

        if (particle.color?.l !== undefined) {
            updateColorValue(delta, color.value.l, 100, true);
        }

        if (color.opacity) {
            updateColorOpacity(delta, color.opacity);
        }
    }
}
