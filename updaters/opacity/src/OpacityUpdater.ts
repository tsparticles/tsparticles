import {
    type Container,
    type IDelta,
    type IParticleUpdater,
    type Particle,
    getRandom,
    getRangeValue,
    initParticleNumericAnimationValue,
} from "@tsparticles/engine";
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

        particle.opacity = initParticleNumericAnimationValue(opacityOptions, 1);

        const opacityAnimation = opacityOptions.animation;

        if (opacityAnimation.enable) {
            particle.opacity.velocity =
                (getRangeValue(opacityAnimation.speed) / 100) * this.container.retina.reduceFactor;

            if (!opacityAnimation.sync) {
                particle.opacity.velocity *= getRandom();
            }
        }
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
