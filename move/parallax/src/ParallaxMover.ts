import { type IParticleMover, type Particle, isSsr } from "@tsparticles/engine";

/**
 */
export class ParallaxMover implements IParticleMover {
    /**
     */
    init(): void {
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
    move(particle: Particle): void {
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
                x: canvasSize.width / 2,
                y: canvasSize.height / 2,
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
    }
}
