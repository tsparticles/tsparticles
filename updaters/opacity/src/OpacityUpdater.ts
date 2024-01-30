import {
    type Container,
    type IDelta,
    type IParticleUpdater,
    type Particle,
    getRandom,
    getRangeValue,
    initParticleNumericAnimationValue,
    percentDenominator,
    updateAnimation,
} from "@tsparticles/engine";

/**
 * The opacity updater, it manages the opacity on each particle
 */
export class OpacityUpdater implements IParticleUpdater {
    private readonly container;

    /**
     * Constructor of opacity updater
     * @param container - The container to manage
     */
    constructor(container: Container) {
        this.container = container;
    }

    /**
     * Init a single particle opacity
     * @param particle -
     */
    async init(particle: Particle): Promise<void> {
        /* opacity */
        const opacityOptions = particle.options.opacity,
            pxRatio = 1;

        particle.opacity = initParticleNumericAnimationValue(opacityOptions, pxRatio);

        const opacityAnimation = opacityOptions.animation;

        if (opacityAnimation.enable) {
            particle.opacity.velocity =
                (getRangeValue(opacityAnimation.speed) / percentDenominator) * this.container.retina.reduceFactor;

            if (!opacityAnimation.sync) {
                particle.opacity.velocity *= getRandom();
            }
        }

        await Promise.resolve();
    }

    /**
     * Checks if opacity updater is enabled
     * @param particle -
     * @returns true if opacity updater is enabled, false otherwise
     */
    isEnabled(particle: Particle): boolean {
        const none = 0;

        return (
            !particle.destroyed &&
            !particle.spawning &&
            !!particle.opacity &&
            particle.opacity.enable &&
            ((particle.opacity.maxLoops ?? none) <= none ||
                ((particle.opacity.maxLoops ?? none) > none &&
                    (particle.opacity.loops ?? none) < (particle.opacity.maxLoops ?? none)))
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
    async update(particle: Particle, delta: IDelta): Promise<void> {
        if (!this.isEnabled(particle) || !particle.opacity) {
            return;
        }

        updateAnimation(particle, particle.opacity, true, particle.options.opacity.animation.destroy, delta);

        await Promise.resolve();
    }
}
