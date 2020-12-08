import { isInArray } from "../../Utils";
import { HoverMode } from "../../Enums";
import type { Container } from "../../Core/Container";
import { Particle } from "../../Core/Particle";
import { ParticlesBase } from "./ParticlesBase";

export class Lighter extends ParticlesBase {
    constructor(container: Container) {
        super(container, "lighter");
    }

    public interact(particle: Particle): void {
        const container = this.container;
        const options = container.options;

        if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
            const mousePos = this.container.interactivity.mouse.position;

            if (mousePos) {
                container.canvas.drawParticleShadow(particle, mousePos);
            }
        }
    }

    public isEnabled(): boolean {
        const container = this.container;
        const mouse = container.interactivity.mouse;
        const events = container.options.interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        const hoverMode = events.onHover.mode;

        return isInArray(HoverMode.light, hoverMode);
    }

    public reset(): void {
        // do nothing
    }
}
