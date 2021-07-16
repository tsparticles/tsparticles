import { isInArray } from "../../Utils";
import { HoverMode } from "../../Enums";
import type { Container } from "../../Core/Container";
import { Particle } from "../../Core/Particle";
import { ParticlesInteractorBase } from "../../Core/ParticlesInteractorBase";

export class Lighter extends ParticlesInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    interact(particle: Particle): void {
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

    isEnabled(): boolean {
        const container = this.container,
            mouse = container.interactivity.mouse,
            events = container.actualOptions.interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        return isInArray(HoverMode.light, events.onHover.mode);
    }

    reset(): void {
        // do nothing
    }
}
