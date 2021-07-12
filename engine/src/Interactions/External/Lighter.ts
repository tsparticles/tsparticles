import { isInArray } from "../../Utils";
import { HoverMode } from "../../Enums";
import type { Container } from "../../Core/Container";
import { ExternalInteractorBase } from "../../Core/ExternalInteractorBase";

export class Lighter extends ExternalInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    interact(): void {
        const container = this.container;
        const options = container.actualOptions;

        if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
            const mousePos = container.interactivity.mouse.position;

            if (!mousePos) {
                return;
            }

            container.canvas.drawLight(mousePos);
        }
    }

    isEnabled(): boolean {
        const container = this.container;
        const mouse = container.interactivity.mouse;
        const events = container.actualOptions.interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        const hoverMode = events.onHover.mode;

        return isInArray(HoverMode.light, hoverMode);
    }

    reset(): void {
        // do nothing
    }
}
