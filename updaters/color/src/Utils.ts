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
    if (
        !colorValue ||
        !valueAnimation.enable ||
        ((colorValue.maxLoops ?? 0) > 0 && (colorValue.loops ?? 0) > (colorValue.maxLoops ?? 0))
    ) {
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

    const offset = randomInRange(valueAnimation.offset),
        velocity = (colorValue.velocity ?? 0) * delta.factor + offset * 3.6,
        decay = colorValue.decay ?? 1;

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

        if (colorValue.value < 0) {
            if (!colorValue.loops) {
                colorValue.loops = 0;
            }

            colorValue.loops++;

            colorValue.status = AnimationStatus.increasing;
            colorValue.value += colorValue.value;
        }
    }

    if (colorValue.velocity && decay !== 1) {
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

    if (h) {
        updateColorValue(delta, h, hAnimation, 360, false);
    }

    if (s) {
        updateColorValue(delta, s, sAnimation, 100, true);
    }

    if (l) {
        updateColorValue(delta, l, lAnimation, 100, true);
    }
}
