import { Utils } from "../../Utils";
import { HoverMode } from "../../Enums/Modes";
import type { Container } from "../../Core/Container";
import type { IParticlesInteractor } from "../../Core/Interfaces/IParticlesInteractor";
import { Particle } from "../../Core/Particle";

export class Lighter implements IParticlesInteractor {
    constructor(private readonly container: Container) {}

    public interact(particle: Particle): void {
        const container = this.container;
        const options = container.actualOptions;

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
        const events = container.actualOptions.interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        const hoverMode = events.onHover.mode;

        return Utils.isInArray(HoverMode.light, hoverMode);
    }

    public reset(): void {
        // do nothing
    }
}
