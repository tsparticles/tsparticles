import { Utils } from "../../Utils";
import { HoverMode } from "../../Enums/Modes";
import type { Container } from "../../Core/Container";
import type { IExternalInteractor } from "../../Core/Interfaces/IExternalInteractor";

export class Lighter implements IExternalInteractor {
    constructor(private readonly container: Container) {}

    public interact(): void {
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
