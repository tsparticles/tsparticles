import {
    AnimationStatus,
    type Container,
    DestroyType,
    type IDelta,
    type IParticleUpdater,
    type Particle,
    StartValueType,
    clamp,
    getRandom,
    getRangeMax,
    getRangeMin,
    getRangeValue,
    randomInRange,
} from "tsparticles-engine";

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
function updateOpacity(particle: Particle, delta: IDelta): void {
    const data = particle.opacity;

    if (!data) {
        return;
    }

    const minValue = data.min,
        maxValue = data.max,
        decay = data.decay ?? 1;

    if (!data.time) {
        data.time = 0;
    }

    if ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) {
        data.time += delta.value;
    }

    if (
        particle.destroyed ||
        !data.enable ||
        ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) ||
        ((data.maxLoops ?? 0) > 0 && (data.loops ?? 0) > (data.maxLoops ?? 0))
    ) {
        return;
    }

    switch (data.status) {
        case AnimationStatus.increasing:
            if (data.value >= maxValue) {
                data.status = AnimationStatus.decreasing;

                if (!data.loops) {
                    data.loops = 0;
                }

                data.loops++;
            } else {
                data.value += (data.velocity ?? 0) * delta.factor;
            }

            break;
        case AnimationStatus.decreasing:
            if (data.value <= minValue) {
                data.status = AnimationStatus.increasing;

                if (!data.loops) {
                    data.loops = 0;
                }

                data.loops++;
            } else {
                data.value -= (data.velocity ?? 0) * delta.factor;
            }

            break;
    }

    if (data.velocity && data.decay !== 1) {
        data.velocity *= decay;
    }

    checkDestroy(particle, data.value, minValue, maxValue);

    if (!particle.destroyed) {
        data.value = clamp(data.value, minValue, maxValue);
    }
}

/**
 * The opacity updater, it manages the opacity on each particle
 */
export class OpacityUpdater implements IParticleUpdater {
    /**
     * Constructor of opacity updater
     * @param container - The container to manage
     */
    constructor(private readonly container: Container) {}

    /**
     * Init a single particle opacity
     * @param particle -
     */
    init(particle: Particle): void {
        /* opacity */
        const opacityOptions = particle.options.opacity;

        particle.opacity = {
            delayTime: getRangeValue(opacityOptions.animation.delay) * 1000,
            enable: opacityOptions.animation.enable,
            max: getRangeMax(opacityOptions.value),
            min: getRangeMin(opacityOptions.value),
            value: getRangeValue(opacityOptions.value),
            loops: 0,
            maxLoops: getRangeValue(opacityOptions.animation.count),
            time: 0,
        };

        const opacityAnimation = opacityOptions.animation;

        if (opacityAnimation.enable) {
            particle.opacity.decay = 1 - getRangeValue(opacityAnimation.decay);
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
                        getRandom() >= 0.5 ? AnimationStatus.increasing : AnimationStatus.decreasing;

                    break;

                case StartValueType.max:
                default:
                    particle.opacity.value = particle.opacity.max;
                    particle.opacity.status = AnimationStatus.decreasing;

                    break;
            }

            particle.opacity.velocity =
                (getRangeValue(opacityAnimation.speed) / 100) * this.container.retina.reduceFactor;

            if (!opacityAnimation.sync) {
                particle.opacity.velocity *= getRandom();
            }
        }

        particle.opacity.initialValue = particle.opacity.value;
    }

    /**
     * Checks if opacity updater is enabled
     * @param particle -
     * @returns true if opacity updater is enabled, false otherwise
     */
    isEnabled(particle: Particle): boolean {
        return (
            !particle.destroyed &&
            !particle.spawning &&
            !!particle.opacity &&
            particle.opacity.enable &&
            ((particle.opacity.maxLoops ?? 0) <= 0 ||
                ((particle.opacity.maxLoops ?? 0) > 0 &&
                    (particle.opacity.loops ?? 0) < (particle.opacity.maxLoops ?? 0)))
        );
    }

    /**
     * Resets the opacity of a particle
     * @param particle -
     */
    reset(particle: Particle): void {
        if (particle.opacity) {
            particle.opacity.time = 0;
            particle.opacity.loops = 0;
        }
    }

    /**
     * Update function of the opacity updater
     * @param particle -
     * @param delta -
     */
    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateOpacity(particle, delta);
    }
}
