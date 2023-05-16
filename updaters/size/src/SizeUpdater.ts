import {
    AnimationStatus,
    DestroyType,
    type IDelta,
    type IParticleUpdater,
    type Particle,
    clamp,
    getRandom,
} from "tsparticles-engine";

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
function updateSize(particle: Particle, delta: IDelta): void {
    const data = particle.size;

    if (!data) {
        return;
    }

    const sizeVelocity = (data.velocity ?? 0) * delta.factor,
        minValue = data.min,
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
                data.value += sizeVelocity;
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
                data.value -= sizeVelocity;
            }
    }

    if (data.velocity && decay !== 1) {
        data.velocity *= decay;
    }

    checkDestroy(particle, data.value, minValue, maxValue);

    if (!particle.destroyed) {
        data.value = clamp(data.value, minValue, maxValue);
    }
}

export class SizeUpdater implements IParticleUpdater {
    init(particle: Particle): void {
        const container = particle.container,
            sizeOptions = particle.options.size,
            sizeAnimation = sizeOptions.animation;

        if (sizeAnimation.enable) {
            particle.size.velocity =
                ((particle.retina.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / 100) *
                container.retina.reduceFactor;

            if (!sizeAnimation.sync) {
                particle.size.velocity *= getRandom();
            }
        }
    }

    isEnabled(particle: Particle): boolean {
        return (
            !particle.destroyed &&
            !particle.spawning &&
            particle.size.enable &&
            ((particle.size.maxLoops ?? 0) <= 0 ||
                ((particle.size.maxLoops ?? 0) > 0 && (particle.size.loops ?? 0) < (particle.size.maxLoops ?? 0)))
        );
    }

    reset(particle: Particle): void {
        particle.size.loops = 0;
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateSize(particle, delta);
    }
}
