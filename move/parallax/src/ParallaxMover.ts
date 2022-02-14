import type { IParticleMover, Particle } from "tsparticles-engine";
import { isSsr } from "tsparticles-engine";

export class ParallaxMover implements IParticleMover {
    init(): void {
        // nothing to init
    }

    isEnabled(particle: Particle): boolean {
        return (
            !isSsr() &&
            !particle.destroyed &&
            particle.container.actualOptions.interactivity.events.onHover.parallax.enable
        );
    }

    move(particle: Particle): void {
        const container = particle.container,
            options = container.actualOptions;

        if (isSsr() || !options.interactivity.events.onHover.parallax.enable) {
            return;
        }

        const parallaxForce = options.interactivity.events.onHover.parallax.force,
            mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        /* smaller is the particle, longer is the offset distance */
        const canvasCenter = {
                x: container.canvas.size.width / 2,
                y: container.canvas.size.height / 2,
            },
            parallaxSmooth = options.interactivity.events.onHover.parallax.smooth,
            factor = particle.getRadius() / parallaxForce,
            centerDistance = {
                x: (mousePos.x - canvasCenter.x) * factor,
                y: (mousePos.y - canvasCenter.y) * factor,
            };

        particle.offset.x += (centerDistance.x - particle.offset.x) / parallaxSmooth; // Easing equation
        particle.offset.y += (centerDistance.y - particle.offset.y) / parallaxSmooth; // Easing equation
    }
}
