import type { LightContainer, LightParticle } from "./Types.js";
import { ParticlesInteractorBase, isInArray, rangeColorToRgb } from "@tsparticles/engine";
import { drawParticleShadow, lightMode } from "./Utils.js";

export class ParticlesLighter extends ParticlesInteractorBase<LightContainer> {
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

    interact(particle: LightParticle): void {
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
            drawParticleShadow(container, ctx, particle, mousePos);
        });
    }

    isEnabled(particle: LightParticle): boolean {
        const container = this.container,
            interactivity = particle.interactivity ?? container.actualOptions.interactivity,
            mouse = container.interactivity.mouse,
            events = interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        const res = isInArray(lightMode, events.onHover.mode);

        if (res && interactivity.modes.light) {
            const shadowOptions = interactivity.modes.light.shadow;

            particle.lightShadow = rangeColorToRgb(shadowOptions.color);
        }

        return res;
    }

    reset(): void {
        // do nothing
    }
}
