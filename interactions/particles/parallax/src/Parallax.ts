import { isSsr, ParticlesInteractorBase } from "tsparticles-engine";
import type { Container, IDelta, Particle } from "tsparticles-engine";

export class Parallax extends ParticlesInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    public interact(particle: Particle, delta: IDelta): void {
        const container = this.container,
            options = container.options;

        if (isSsr() || !options.interactivity.events.onHover.parallax.enable) {
            return;
        }

        const parallaxForce = options.interactivity.events.onHover.parallax.force,
            mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        const canvasCenter = {
                x: container.canvas.size.width / 2,
                y: container.canvas.size.height / 2,
            },
            parallaxSmooth = options.interactivity.events.onHover.parallax.smooth,
            factor = particle.getRadius() / parallaxForce,
            tmp = {
                x: (mousePos.x - canvasCenter.x) * factor,
                y: (mousePos.y - canvasCenter.y) * factor,
            };

        particle.offset.x += (tmp.x - particle.offset.x) / parallaxSmooth; // Easing equation
        particle.offset.y += (tmp.y - particle.offset.y) / parallaxSmooth; // Easing equation
    }

    public isEnabled(particle: Particle): boolean {
        const options = this.container.options;

        return !isSsr() || options.interactivity.events.onHover.parallax.enable;
    }

    public reset(particle: Particle): void {
        // do nothing
    }
}
