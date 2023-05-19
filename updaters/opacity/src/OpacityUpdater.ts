import {
    AnimationStatus,
    type Container,
    type IDelta,
    type IParticleUpdater,
    type Particle,
    StartValueType,
    getRandom,
    getRangeMax,
    getRangeMin,
    getRangeValue,
    randomInRange,
} from "tsparticles-engine";
import { updateOpacity } from "./Utils";

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
