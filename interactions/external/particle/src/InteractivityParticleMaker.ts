import {
    ExternalInteractorBase,
    type ICoordinates,
    type IModes,
    type Modes,
    type Particle,
    type ParticlesOptions,
    type RecursivePartial,
    deepExtend,
    isInArray,
} from "@tsparticles/engine";
import type { IParticleMode, InteractivityParticleContainer, ParticleMode } from "./Types.js";
import { InteractivityParticle } from "./Options/Classes/InteractivityParticle.js";

const particleMode = "particle";

/**
 */
export class InteractivityParticleMaker extends ExternalInteractorBase<InteractivityParticleContainer> {
    private _clearTimeout?: number | NodeJS.Timeout;
    private _lastPosition?: ICoordinates;
    private _particle?: Particle;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(container: InteractivityParticleContainer) {
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
            { interactivity } = container,
            options = container.actualOptions;

        if (!container.retina.reduceFactor) {
            return;
        }

        const mousePos = interactivity.mouse.position,
            interactivityParticleOptions = options.interactivity.modes.particle;

        if (!interactivityParticleOptions) {
            return;
        }

        const mouseStopped =
                interactivityParticleOptions.pauseOnStop &&
                (interactivity.mouse.position === this._lastPosition ||
                    (interactivity.mouse.position?.x === this._lastPosition?.x &&
                        interactivity.mouse.position?.y === this._lastPosition?.y)),
            clearDelay = interactivityParticleOptions.stopDelay;

        if (mousePos) {
            this._lastPosition = { ...mousePos };
        } else {
            delete this._lastPosition;
        }

        if (!this._lastPosition) {
            return;
        }

        if (mouseStopped) {
            if (this._clearTimeout) {
                return;
            }

            this._clearTimeout = setTimeout(() => {
                if (!this._particle) {
                    return;
                }

                if (interactivityParticleOptions.replaceCursor) {
                    const element = interactivity.element as HTMLElement | Window | undefined;

                    if (element) {
                        if (element instanceof Window) {
                            document.body.style.cursor = "";
                        } else {
                            element.style.cursor = "";
                        }
                    }
                }

                this.container.particles.remove(this._particle, undefined, true);

                delete this._particle;
            }, clearDelay);

            return;
        }

        if (this._clearTimeout) {
            clearTimeout(this._clearTimeout);

            delete this._clearTimeout;
        }

        if (!this._particle) {
            const particleOptions = deepExtend(interactivityParticleOptions.options, {
                move: {
                    enable: false,
                },
            }) as RecursivePartial<ParticlesOptions>;

            this._particle = container.particles.addParticle(this._lastPosition, particleOptions);

            if (interactivityParticleOptions.replaceCursor) {
                const element = interactivity.element as HTMLElement | Window | undefined;

                if (element) {
                    if (element instanceof Window) {
                        document.body.style.cursor = "none";
                    } else {
                        element.style.cursor = "none";
                    }
                }
            }
        }

        if (!this._particle) {
            return;
        }

        this._particle.position.x = this._lastPosition.x;
        this._particle.position.y = this._lastPosition.y;
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? options.interactivity).events;

        return (
            (mouse.clicking && mouse.inside && !!mouse.position && isInArray(particleMode, events.onClick.mode)) ||
            (mouse.inside && !!mouse.position && isInArray(particleMode, events.onHover.mode))
        );
    }

    loadModeOptions(
        options: Modes & ParticleMode,
        ...sources: RecursivePartial<(IModes & IParticleMode) | undefined>[]
    ): void {
        options.particle ??= new InteractivityParticle();

        for (const source of sources) {
            options.particle.load(source?.particle);
        }
    }

    reset(): void {
        // do nothing
    }
}
