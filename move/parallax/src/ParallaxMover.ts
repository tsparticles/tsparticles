import { type IParticleMover, type Particle, isSsr } from "@tsparticles/engine";

const half = 0.5;

/**
 */
export class ParallaxMover implements IParticleMover {
    /**
     */
    async init(): Promise<void> {
        await Promise.resolve();
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
            options = container.actualOptions,
            parallaxOptions = options.interactivity.events.onHover.parallax;

        if (isSsr() || !parallaxOptions.enable) {
            return;
        }

        const parallaxForce = parallaxOptions.force,
            mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        /* smaller is the particle, longer is the offset distance */
        const canvasSize = container.canvas.size,
            canvasCenter = {
                x: canvasSize.width * half,
                y: canvasSize.height * half,
            },
            parallaxSmooth = parallaxOptions.smooth,
            factor = particle.getRadius() / parallaxForce,
            centerDistance = {
                x: (mousePos.x - canvasCenter.x) * factor,
                y: (mousePos.y - canvasCenter.y) * factor,
            },
            { offset } = particle;

        offset.x += (centerDistance.x - offset.x) / parallaxSmooth; // Easing equation
        offset.y += (centerDistance.y - offset.y) / parallaxSmooth; // Easing equation

        await Promise.resolve();
    }
}
