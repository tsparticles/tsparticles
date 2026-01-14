import type { BounceContainer, BounceMode, IBounceMode } from "./Types.js";
import {
    ExternalInteractorBase,
    type IInteractivityData,
    type IModes,
    type Modes,
    type Particle,
    type RecursivePartial,
    isDivModeEnabled,
    isInArray,
    mouseMoveEvent,
} from "@tsparticles/engine";
import { divBounce, mouseBounce } from "./Utils.js";
import { Bounce } from "./Options/Classes/Bounce.js";

const bounceMode = "bounce";

export class Bouncer extends ExternalInteractorBase<BounceContainer> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(container: BounceContainer) {
        super(container);
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        const container = this.container,
            bounce = container.actualOptions.interactivity.modes.bounce;

        if (!bounce) {
            return;
        }

        container.retina.bounceModeDistance = bounce.distance * container.retina.pixelRatio;
    }

    interact(interactivityData: IInteractivityData): void {
        const container = this.container,
            options = container.actualOptions,
            events = options.interactivity.events,
            mouseMoveStatus = interactivityData.status === mouseMoveEvent,
            hoverEnabled = events.onHover.enable,
            hoverMode = events.onHover.mode,
            divs = events.onDiv;

        if (mouseMoveStatus && hoverEnabled && isInArray(bounceMode, hoverMode)) {
            mouseBounce(this.container, interactivityData, p => this.isEnabled(interactivityData, p));
        } else {
            divBounce(this.container, divs, bounceMode, p => this.isEnabled(interactivityData, p));
        }
    }

    isEnabled(interactivityData: IInteractivityData, particle?: Particle): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = interactivityData.mouse,
            events = (particle?.interactivity ?? options.interactivity).events,
            divs = events.onDiv;

        return (
            (!!mouse.position && events.onHover.enable && isInArray(bounceMode, events.onHover.mode)) ||
            isDivModeEnabled(bounceMode, divs)
        );
    }

    loadModeOptions(
        options: Modes & BounceMode,
        ...sources: RecursivePartial<(IModes & IBounceMode) | undefined>[]
    ): void {
        options.bounce ??= new Bounce();

        for (const source of sources) {
            options.bounce.load(source?.bounce);
        }
    }

    reset(): void {
        // do nothing
    }
}
