import { ExternalInteractorBase, HoverMode, isInArray } from "tsparticles";
import type { Container } from "tsparticles";
import { drawLight } from "./Utils";

export class ExternalLighter extends ExternalInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    interact(): void {
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
