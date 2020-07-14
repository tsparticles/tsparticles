import type { IExternalInteractor } from "../../../Interfaces/IExternalInteractor";
import type { Container } from "../../../Container";
import { Utils } from "../../../../Utils";
import { ClickMode, HoverMode } from "../../../../Enums/Modes";
import type { IDelta } from "../../../Interfaces/IDelta";

export class TrailMaker implements IExternalInteractor {
    private delay: number;

    constructor(private readonly container: Container) {
        this.delay = 0;
    }

    public interact(delta: IDelta): void {
        const container = this.container;
        const options = container.options;

        const trailOptions = options.interactivity.modes.trail;
        const optDelay = trailOptions.delay * 1000;

        if (this.delay < optDelay) {
            this.delay += delta.value;
        }

        if (this.delay >= optDelay) {
            container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);

            this.delay -= optDelay;
        }
    }

    public isEnabled(): boolean {
        const container = this.container;
        const options = container.options;

        const mouse = container.interactivity.mouse;
        const events = options.interactivity.events;

        return (
            (mouse.clicking &&
                mouse.inside &&
                !!mouse.position &&
                Utils.isInArray(ClickMode.trail, events.onClick.mode)) ||
            (mouse.inside && !!mouse.position && Utils.isInArray(HoverMode.trail, events.onHover.mode))
        );
    }

    public reset(): void {
        // nothing to do
    }
}
