import { ExternalInteractorBase, HoverMode, isInArray, rangeColorToRgb } from "tsparticles-engine";
import type { ILightMode, LightMode } from "./Types";
import type { IModes, Modes, RecursivePartial } from "tsparticles-engine";
import type { LightContainer, LightParticle } from "./Types";
import { Light } from "./Options/Classes/Light";
import { drawLight } from "./Utils";

export class ExternalLighter extends ExternalInteractorBase<LightContainer> {
    constructor(container: LightContainer) {
        super(container);
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        // do nothing
    }

    async interact(): Promise<void> {
        const container = this.container,
            options = container.actualOptions;

        if (options.interactivity.events.onHover.enable && container.interactivity.status === "pointermove") {
            const mousePos = container.interactivity.mouse.position;

            if (!mousePos) {
                return;
            }

            container.canvas.draw((ctx) => {
                drawLight(container, ctx, mousePos);
            });
        }
    }

    isEnabled(particle?: LightParticle): boolean {
        const container = this.container,
            mouse = container.interactivity.mouse,
            interactivity = particle?.interactivity ?? container.actualOptions.interactivity,
            events = interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        const res = isInArray(HoverMode.light, events.onHover.mode);

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
