import { HoverMode, ParticlesInteractorBase, isInArray, rangeColorToRgb } from "tsparticles-engine";
import type { LightContainer, LightParticle } from "./Types";
import type { Particle } from "tsparticles-engine";
import { drawParticleShadow } from "./Utils";

export class ParticlesLighter extends ParticlesInteractorBase {
    constructor(container: LightContainer) {
        super(container);
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        // do nothing
    }

    async interact(particle: Particle): Promise<void> {
        const container = this.container,
            options = container.actualOptions;

        if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
            const mousePos = this.container.interactivity.mouse.position;

            if (mousePos) {
                container.canvas.draw((ctx) => {
                    drawParticleShadow(container, ctx, particle, mousePos);
                });
            }
        }
    }

    isEnabled(particle: LightParticle): boolean {
        const container = this.container as LightContainer,
            interactivity = particle.interactivity ?? container.actualOptions.interactivity,
            mouse = container.interactivity.mouse,
            events = interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        const res = isInArray(HoverMode.light, events.onHover.mode);

        if (res) {
            const shadowOptions = interactivity.modes.light.shadow;

            particle.lightShadow = rangeColorToRgb(shadowOptions.color);
        }

        return res;
    }

    async particleInteract(): Promise<void> {
        // do nothing
    }

    reset(): void {
        // do nothing
    }
}
