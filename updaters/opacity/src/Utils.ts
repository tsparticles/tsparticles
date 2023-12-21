import { AnimationStatus, DestroyType, type IDelta, type Particle, clamp } from "@tsparticles/engine";

/**
 * @param particle -
 * @param value -
 * @param minValue -
 * @param maxValue -
 */
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

/**
 * @param particle -
 * @param delta -
 */
export function updateOpacity(particle: Particle, delta: IDelta): void {
    const data = particle.opacity,
        defaultMaxLoops = 0,
        defaultDecay = 1,
        defaultDelayTime = 0,
        defaultVelocity = 0,
        minLoops = 0;

    if (
        particle.destroyed ||
        !data?.enable ||
        ((data.maxLoops ?? defaultMaxLoops) > defaultMaxLoops &&
            (data.loops ?? defaultMaxLoops) > (data.maxLoops ?? defaultMaxLoops))
    ) {
        return;
    }

    const minValue = data.min,
        maxValue = data.max,
        decay = data.decay ?? defaultDecay;

    if (!data.time) {
        data.time = 0;
    }

    if ((data.delayTime ?? defaultDelayTime) > defaultDelayTime && data.time < (data.delayTime ?? defaultDelayTime)) {
        data.time += delta.value;
    }

    if ((data.delayTime ?? defaultDelayTime) > defaultDelayTime && data.time < (data.delayTime ?? defaultDelayTime)) {
        return;
    }

    switch (data.status) {
        case AnimationStatus.increasing:
            if (data.value >= maxValue) {
                data.status = AnimationStatus.decreasing;

                if (!data.loops) {
                    data.loops = minLoops;
                }

                data.loops++;
            } else {
                data.value += (data.velocity ?? defaultVelocity) * delta.factor;
            }

            break;
        case AnimationStatus.decreasing:
            if (data.value <= minValue) {
                data.status = AnimationStatus.increasing;

                if (!data.loops) {
                    data.loops = minLoops;
                }

                data.loops++;
            } else {
                data.value -= (data.velocity ?? defaultVelocity) * delta.factor;
            }

            break;
    }

    const identity = 1;

    if (data.velocity && data.decay !== identity) {
        data.velocity *= decay;
    }

    checkDestroy(particle, data.value, minValue, maxValue);

    if (!particle.destroyed) {
        data.value = clamp(data.value, minValue, maxValue);
    }
}
