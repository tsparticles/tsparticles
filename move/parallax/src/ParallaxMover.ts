import { type IParticleMover, type Particle, isSsr } from "@tsparticles/engine";

/**
 */
export class ParallaxMover implements IParticleMover {
    /**
     */
    async init(): Promise<void> {
        // nothing to init
    }

    /**
     * @param particle -
     * @returns check if mover is enabled
     */
    isEnabled(particle: Particle): boolean {
        return (
            !isSsr() &&
            !particle.destroyed &&
            particle.container.actualOptions.interactivity.events.onHover.parallax.enable
        );
    }

    /**
     * @param particle -
     */
    async move(particle: Particle): Promise<void> {
        const container = particle.container,
            mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        const options = container.actualOptions,
            parallaxOptions = options.interactivity.events.onHover.parallax;

        if (isSsr() || !parallaxOptions.enable) {
            return;
        }

        const { parallax } = await import("./Utils.js");

        parallax(particle, mousePos);
    }
}
