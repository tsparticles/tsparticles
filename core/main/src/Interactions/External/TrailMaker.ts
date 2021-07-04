import type { IExternalInteractor } from "../../Core/Interfaces/IExternalInteractor";
import type { Container } from "../../Core/Container";
import { isInArray } from "../../Utils";
import { ClickMode, HoverMode } from "../../Enums";
import type { IDelta } from "../../Core/Interfaces/IDelta";
import { ICoordinates } from "../../Core/Interfaces/ICoordinates";

/**
 * @category Interactions
 */
export class TrailMaker implements IExternalInteractor {
    private delay: number;
    private lastPosition?: ICoordinates;

    constructor(private readonly container: Container) {
        this.delay = 0;
    }

    interact(delta: IDelta): void {
        if (!this.container.retina.reduceFactor) {
            return;
        }

        const container = this.container,
            options = container.actualOptions,
            trailOptions = options.interactivity.modes.trail,
            optDelay = (trailOptions.delay * 1000) / this.container.retina.reduceFactor;

        if (this.delay < optDelay) {
            this.delay += delta.value;
        }

        if (this.delay < optDelay) {
            return;
        }

        let canEmit = true;

        if (trailOptions.pauseOnStop) {
            if (
                container.interactivity.mouse.position === this.lastPosition ||
                (container.interactivity.mouse.position?.x === this.lastPosition?.x &&
                    container.interactivity.mouse.position?.y === this.lastPosition?.y)
            ) {
                canEmit = false;
            }
        }

        if (container.interactivity.mouse.position) {
            this.lastPosition = {
                x: container.interactivity.mouse.position.x,
                y: container.interactivity.mouse.position.y,
            };
        } else {
            delete this.lastPosition;
        }

        if (canEmit) {
            container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);
        }

        this.delay -= optDelay;
    }

    isEnabled(): boolean {
        const container = this.container;
        const options = container.actualOptions;

        const mouse = container.interactivity.mouse;
        const events = options.interactivity.events;

        return (
            (mouse.clicking && mouse.inside && !!mouse.position && isInArray(ClickMode.trail, events.onClick.mode)) ||
            (mouse.inside && !!mouse.position && isInArray(HoverMode.trail, events.onHover.mode))
        );
    }

    reset(): void {
        // nothing to do
    }
}
