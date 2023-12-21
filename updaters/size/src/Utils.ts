import { AnimationStatus, DestroyType, type IDelta, type Particle, clamp } from "@tsparticles/engine";

const minLoops = 0,
    minDelay = 0,
    identity = 1,
    minVelocity = 0,
    minDecay = 1;

/**
 * @param particle -
 * @param value -
 * @param minValue -
 * @param maxValue -
 */
function checkDestroy(particle: Particle, value: number, minValue: number, maxValue: number): void {
    switch (particle.options.size.animation.destroy) {
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
export function updateSize(particle: Particle, delta: IDelta): void {
    const data = particle.size;

    if (
        particle.destroyed ||
        !data ||
        !data.enable ||
        ((data.maxLoops ?? minLoops) > minLoops && (data.loops ?? minLoops) > (data.maxLoops ?? minLoops))
    ) {
        return;
    }

    const sizeVelocity = (data.velocity ?? minVelocity) * delta.factor,
        minValue = data.min,
        maxValue = data.max,
        decay = data.decay ?? minDecay;

    if (!data.time) {
        data.time = 0;
    }

    if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
        data.time += delta.value;
    }

    if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
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
                data.value += sizeVelocity;
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
                data.value -= sizeVelocity;
            }
    }

    if (data.velocity && decay !== identity) {
        data.velocity *= decay;
    }

    checkDestroy(particle, data.value, minValue, maxValue);

    if (!particle.destroyed) {
        data.value = clamp(data.value, minValue, maxValue);
    }
}
