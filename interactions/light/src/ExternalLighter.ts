import { ExternalInteractorBase, HoverMode, isInArray } from "tsparticles-engine";
import type { Container } from "tsparticles-engine";
import { drawLight } from "./utils";

export class ExternalLighter extends ExternalInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    public interact(): void {
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

    public isEnabled(): boolean {
        const container = this.container,
            mouse = container.interactivity.mouse,
            events = container.actualOptions.interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        return isInArray(HoverMode.light, events.onHover.mode);
    }

    public reset(): void {
        // do nothing
    }
}
