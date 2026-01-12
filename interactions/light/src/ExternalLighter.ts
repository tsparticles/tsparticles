import {
    type Engine,
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
    private readonly _engine;

    constructor(container: LightContainer, engine: Engine) {
        super(container);

        this._engine = engine;
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
            interactivity = container.interactionManager.interactivityData;

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
            mouse = container.interactionManager.interactivityData.mouse,
            interactivity = particle?.interactivity ?? container.actualOptions.interactivity,
            events = interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        const res = isInArray(lightMode, events.onHover.mode);

        if (res && interactivity.modes.light) {
            const lightGradient = interactivity.modes.light.area.gradient;

            container.canvas.mouseLight = {
                start: rangeColorToRgb(this._engine, lightGradient.start),
                stop: rangeColorToRgb(this._engine, lightGradient.stop),
            };
        }

        return res;
    }

    loadModeOptions(
        options: Modes & LightMode,
        ...sources: RecursivePartial<(IModes & ILightMode) | undefined>[]
    ): void {
        options.light ??= new Light();

        for (const source of sources) {
            options.light.load(source?.light);
        }
    }

    reset(): void {
        // do nothing
    }
}
