import type { ICoordinates, Particle } from "@tsparticles/engine";

const half = 0.5;

/**
 *
 * @param particle
 * @param mousePos
 */
export function parallax(particle: Particle, mousePos: ICoordinates): void {
    const container = particle.container,
        options = container.actualOptions,
        parallaxOptions = options.interactivity.events.onHover.parallax,
        parallaxForce = parallaxOptions.force;

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
}
