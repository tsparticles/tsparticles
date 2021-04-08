import type { IExternalInteractor } from "../../Core/Interfaces/IExternalInteractor";
import type { Container } from "../../Core/Container";
import { Utils } from "../../Utils";
import { ClickMode, HoverMode } from "../../Enums/Modes";
import type { IDelta } from "../../Core/Interfaces/IDelta";

/**
 * @category Interactions
 */
export class TrailMaker implements IExternalInteractor {
    private delay: number;

    constructor(private readonly container: Container) {
        this.delay = 0;
    }

    interact(delta: IDelta): void {
        if (!this.container.retina.reduceFactor) {
            return;
        }

        const container = this.container;
        const options = container.actualOptions;

        const trailOptions = options.interactivity.modes.trail;
        const optDelay = (trailOptions.delay * 1000) / this.container.retina.reduceFactor;

        if (this.delay < optDelay) {
            this.delay += delta.value;
        }

        if (this.delay >= optDelay) {
            container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);

            this.delay -= optDelay;
        }
    }

    isEnabled(): boolean {
        const container = this.container;
        const options = container.actualOptions;

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

    reset(): void {
        // nothing to do
    }
}
