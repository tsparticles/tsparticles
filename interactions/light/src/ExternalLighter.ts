import {
    ExternalInteractorBase,
    type IModes,
    type Modes,
    type RecursivePartial,
    isInArray,
    rangeColorToRgb,
} from "@tsparticles/engine";
import type { ILightMode, LightContainer, LightMode, LightParticle } from "./Types.js";
import { drawLight, lightMode } from "./Utils.js";
import { Light } from "./Options/Classes/Light.js";

export class ExternalLighter extends ExternalInteractorBase<LightContainer> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(container: LightContainer) {
        super(container);
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        // do nothing
    }

    interact(): void {
        const container = this.container,
            options = container.actualOptions,
            interactivity = container.interactivity;

        if (!options.interactivity.events.onHover.enable || interactivity.status !== "pointermove") {
            return;
        }

        const mousePos = interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        container.canvas.draw(ctx => {
            drawLight(container, ctx, mousePos);
        });
    }

    isEnabled(particle?: LightParticle): boolean {
        const container = this.container,
            mouse = container.interactivity.mouse,
            interactivity = particle?.interactivity ?? container.actualOptions.interactivity,
            events = interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        const res = isInArray(lightMode, events.onHover.mode);

        if (res && interactivity.modes.light) {
            const lightGradient = interactivity.modes.light.area.gradient;

            container.canvas.mouseLight = {
                start: rangeColorToRgb(lightGradient.start),
                stop: rangeColorToRgb(lightGradient.stop),
            };
        }

        return res;
    }

    loadModeOptions(
        options: Modes & LightMode,
        ...sources: RecursivePartial<(IModes & ILightMode) | undefined>[]
    ): void {
        if (!options.light) {
            options.light = new Light();
        }

        for (const source of sources) {
            options.light.load(source?.light);
        }
    }

    reset(): void {
        // do nothing
    }
}
