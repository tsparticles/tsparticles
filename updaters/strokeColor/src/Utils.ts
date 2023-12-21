import {
    AnimationStatus,
    type IColorAnimation,
    type IDelta,
    type IParticleValueAnimation,
    randomInRange,
} from "@tsparticles/engine";
import type { StrokeParticle } from "./Types.js";

const minLoops = 0,
    defaultTime = 0,
    defaultVelocity = 0,
    offsetFactor = 3.6,
    minValue = 0,
    colorMaxValues = {
        h: 360,
        s: 100,
        l: 100,
    },
    defaultDecay = 1;

/**
 * @param delta -
 * @param colorValue -
 * @param valueAnimation -
 * @param max -
 * @param decrease -
 */
function updateColorValue(
    delta: IDelta,
    colorValue: IParticleValueAnimation<number>,
    valueAnimation: IColorAnimation,
    max: number,
    decrease: boolean,
): void {
    if (
        !colorValue ||
        !valueAnimation.enable ||
        ((colorValue.maxLoops ?? minLoops) > minLoops &&
            (colorValue.loops ?? minLoops) > (colorValue.maxLoops ?? minLoops))
    ) {
        return;
    }

    if (!colorValue.time) {
        colorValue.time = defaultTime;
    }

    if (
        (colorValue.delayTime ?? defaultTime) > defaultTime &&
        colorValue.time < (colorValue.delayTime ?? defaultTime)
    ) {
        colorValue.time += delta.value;
    }

    if (
        (colorValue.delayTime ?? defaultTime) > defaultTime &&
        colorValue.time < (colorValue.delayTime ?? defaultTime)
    ) {
        return;
    }

    const offset = randomInRange(valueAnimation.offset),
        velocity = (colorValue.velocity ?? defaultVelocity) * delta.factor + offset * offsetFactor,
        decay = colorValue.decay ?? defaultDecay;

    if (!decrease || colorValue.status === AnimationStatus.increasing) {
        colorValue.value += velocity;

        if (colorValue.value > max) {
            if (!colorValue.loops) {
                colorValue.loops = minLoops;
            }

            colorValue.loops++;

            if (decrease) {
                colorValue.status = AnimationStatus.decreasing;
                colorValue.value -= colorValue.value % max;
            }
        }
    } else {
        colorValue.value -= velocity;

        if (colorValue.value < minValue) {
            if (!colorValue.loops) {
                colorValue.loops = minLoops;
            }
            colorValue.loops++;
            colorValue.status = AnimationStatus.increasing;
            colorValue.value += colorValue.value;
        }
    }

    if (colorValue.velocity && decay !== defaultDecay) {
        colorValue.velocity *= decay;
    }

    if (colorValue.value > max) {
        colorValue.value %= max;
    }
}

/**
 * @param particle -
 * @param delta -
 */
export function updateStrokeColor(particle: StrokeParticle, delta: IDelta): void {
    if (!particle.strokeColor || !particle.strokeAnimation) {
        return;
    }

    const { h, s, l } = particle.strokeColor,
        { h: hAnimation, s: sAnimation, l: lAnimation } = particle.strokeAnimation;

    if (h) {
        updateColorValue(delta, h, hAnimation, colorMaxValues.h, false);
    }

    if (s) {
        updateColorValue(delta, s, sAnimation, colorMaxValues.s, true);
    }

    if (l) {
        updateColorValue(delta, l, lAnimation, colorMaxValues.l, true);
    }
}
