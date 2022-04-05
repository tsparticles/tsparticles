import { ClickMode } from "../../../Enums/Modes/ClickMode";
import type { Container } from "../../../Core/Container";
import { ExternalInteractorBase } from "../../../Core/Utils/ExternalInteractorBase";
import { HoverMode } from "../../../Enums/Modes/HoverMode";
import type { ICoordinates } from "../../../Core/Interfaces/ICoordinates";
import type { IDelta } from "../../../Core/Interfaces/IDelta";
import { isInArray } from "../../../Utils/Utils";

/**
 * @category Interactions
 */
export class TrailMaker extends ExternalInteractorBase {
    private delay: number;
    private lastPosition?: ICoordinates;

    constructor(container: Container) {
        super(container);

        this.delay = 0;
    }

    async interact(delta: IDelta): Promise<void> {
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
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse,
            events = options.interactivity.events;

        return (
            (mouse.clicking && mouse.inside && !!mouse.position && isInArray(ClickMode.trail, events.onClick.mode)) ||
            (mouse.inside && !!mouse.position && isInArray(HoverMode.trail, events.onHover.mode))
        );
    }

    reset(): void {
        // nothing to do
    }
}
