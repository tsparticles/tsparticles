import type { Container, Particle } from "tsparticles-engine";
import { ExternalInteractorBase, HoverMode, isInArray } from "tsparticles-engine";
import { drawLight } from "./Utils";

export class ExternalLighter extends ExternalInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    async interact(): Promise<void> {
        const container = this.container,
            options = container.actualOptions;

        if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
            const mousePos = container.interactivity.mouse.position;

            if (!mousePos) {
                return;
            }

            container.canvas.draw((ctx) => {
                drawLight(container, ctx, mousePos);
            });
        }
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? container.actualOptions.interactivity).events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        return isInArray(HoverMode.light, events.onHover.mode);
    }

    clear(): void {
        // do nothing
    }

    reset(): void {
        // do nothing
    }
}
