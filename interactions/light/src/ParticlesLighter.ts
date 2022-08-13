import { HoverMode, ParticlesInteractorBase, isInArray, rangeColorToRgb } from "tsparticles-engine";
import type { LightContainer, LightParticle } from "./Types";
import { drawParticleShadow } from "./Utils";

export class ParticlesLighter extends ParticlesInteractorBase {
    private readonly _container;

    constructor(container: LightContainer) {
        super(container);

        this._container = container;
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        // do nothing
    }

    async interact(particle: LightParticle): Promise<void> {
        const container = this._container,
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

    reset(): void {
        // do nothing
    }
}
