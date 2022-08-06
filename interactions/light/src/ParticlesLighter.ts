import { HoverMode, Modes, ParticlesInteractorBase, isInArray, rangeColorToRgb } from "tsparticles-engine";
import type { IInteractivity, Interactivity, RecursivePartial } from "tsparticles-engine";
import type { ILightInteractivity, LightContainer, LightInteractivity, LightParticle } from "./Types";
import { Light } from "./Options/Classes/Light";
import { drawParticleShadow } from "./Utils";

export class ParticlesLighter extends ParticlesInteractorBase {
    readonly #container;

    constructor(container: LightContainer) {
        super(container);

        this.#container = container;
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        // do nothing
    }

    async interact(particle: LightParticle): Promise<void> {
        const container = this.#container,
            options = container.actualOptions;

        if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
            const mousePos = this.container.interactivity.mouse.position;

            if (mousePos) {
                container.canvas.draw((ctx) => {
                    drawParticleShadow(container, ctx, particle, mousePos);
                });
            }
        }
    }

    isEnabled(particle: LightParticle): boolean {
        const container = this.container as LightContainer,
            interactivity = particle.interactivity ?? container.actualOptions.interactivity,
            mouse = container.interactivity.mouse,
            events = interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        const res = isInArray(HoverMode.light, events.onHover.mode);

        if (res && interactivity.modes.light) {
            const shadowOptions = interactivity.modes.light.shadow;

            particle.lightShadow = rangeColorToRgb(shadowOptions.color);
        }

        return res;
    }

    loadInteractivityOptions(
        options: Interactivity & LightInteractivity,
        ...sources: RecursivePartial<(IInteractivity & ILightInteractivity) | undefined>[]
    ): void {
        for (const source of sources) {
            if (!source?.modes?.light) {
                continue;
            }

            if (!options.modes) {
                options.modes = new Modes();
            }

            if (!options.modes.light) {
                options.modes.light = new Light();
            }

            options.modes.light.load(source.modes.light);
        }
    }

    reset(): void {
        // do nothing
    }
}
