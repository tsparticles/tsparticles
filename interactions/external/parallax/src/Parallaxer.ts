import {
    ExternalInteractorBase,
    type IModes,
    type Modes,
    type Particle,
    type RecursivePartial,
    half,
    isInArray,
} from "@tsparticles/engine";
import type { IParallaxMode, ParallaxContainer, ParallaxMode } from "./Types.js";
import { Parallax } from "./Options/Classes/Parallax.js";

const parallaxMode = "parallax";

/**
 * Particle parallax manager
 */
export class Parallaxer extends ExternalInteractorBase<ParallaxContainer> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(container: ParallaxContainer) {
        super(container);
    }

    clear(): void {
        // no-op
    }

    init(): void {
        // no-op
    }

    interact(): void {
        for (const particle of this.container.particles.filter(p => this.isEnabled(p))) {
            this._parallaxInteract(particle);
        }
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? container.actualOptions.interactivity).events;

        return events.onHover.enable && !!mouse.position && isInArray(parallaxMode, events.onHover.mode);
    }

    loadModeOptions(
        options: Modes & ParallaxMode,
        ...sources: RecursivePartial<(IModes & IParallaxMode) | undefined>[]
    ): void {
        options.parallax ??= new Parallax();

        for (const source of sources) {
            options.parallax.load(source?.parallax);
        }
    }

    reset(): void {
        // no-op
    }

    private _parallaxInteract(particle: Particle): void {
        if (this.isEnabled(particle)) {
            return;
        }

        const container = this.container,
            options = container.actualOptions,
            parallaxOptions = options.interactivity.modes.parallax;

        if (!parallaxOptions) {
            return;
        }

        const parallaxForce = parallaxOptions.force,
            mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        /* smaller is the particle, longer is the offset distance */
        const canvasSize = container.canvas.size,
            canvasCenter = {
                x: canvasSize.width * half,
                y: canvasSize.height * half,
            },
            parallaxSmooth = parallaxOptions.smooth,
            factor = particle.getRadius() / parallaxForce,
            centerDistance = {
                x: (mousePos.x - canvasCenter.x) * factor,
                y: (mousePos.y - canvasCenter.y) * factor,
            },
            { offset } = particle;

        offset.x += (centerDistance.x - offset.x) / parallaxSmooth; // Easing equation
        offset.y += (centerDistance.y - offset.y) / parallaxSmooth; // Easing equation
    }
}
