import {
    AnimationStatus,
    type IColorAnimation,
    type IDelta,
    type IParticleValueAnimation,
    type Particle,
    randomInRange,
} from "@tsparticles/engine";

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
    const defaultMaxLoops = 0,
        defaultDelayTime = 0,
        defaultVelocity = 0,
        defaultDecay = 1,
        velocityFactor = 3.6;

    if (
        !colorValue ||
        !valueAnimation.enable ||
        ((colorValue.maxLoops ?? defaultMaxLoops) > defaultMaxLoops &&
            (colorValue.loops ?? defaultMaxLoops) > (colorValue.maxLoops ?? defaultMaxLoops))
    ) {
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

    const offset = randomInRange(valueAnimation.offset),
        velocity = (colorValue.velocity ?? defaultVelocity) * delta.factor + offset * velocityFactor,
        decay = colorValue.decay ?? defaultDecay;

    if (!decrease || colorValue.status === AnimationStatus.increasing) {
        colorValue.value += velocity;

        if (colorValue.value > max) {
            if (!colorValue.loops) {
                colorValue.loops = 0;
            }

            colorValue.loops++;

            if (decrease) {
                colorValue.status = AnimationStatus.decreasing;
                colorValue.value -= colorValue.value % max;
            }
        }
    } else {
        colorValue.value -= velocity;

        const minValue = 0;

        if (colorValue.value < minValue) {
            if (!colorValue.loops) {
                colorValue.loops = 0;
            }

            colorValue.loops++;

            colorValue.status = AnimationStatus.increasing;
            colorValue.value += colorValue.value;
        }
    }

    const identity = 1;

    if (colorValue.velocity && decay !== identity) {
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
export function updateColor(particle: Particle, delta: IDelta): void {
    const { h: hAnimation, s: sAnimation, l: lAnimation } = particle.options.color.animation,
        { color } = particle;

    if (!color) {
        return;
    }

    const { h, s, l } = color;

    const maxValues = {
        h: 360,
        s: 100,
        l: 100,
    };

    if (h) {
        updateColorValue(delta, h, hAnimation, maxValues.h, false);
    }

    if (s) {
        updateColorValue(delta, s, sAnimation, maxValues.s, true);
    }

    if (l) {
        updateColorValue(delta, l, lAnimation, maxValues.l, true);
    }
}
