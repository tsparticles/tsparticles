import {
  ExternalInteractorBase,
  type IInteractivityData,
  type IModes,
  type InteractivityParticle,
  type Modes,
} from "@tsparticles/plugin-interactivity";
import {
  type ICoordinates,
  type Particle,
  type ParticlesOptions,
  type RecursivePartial,
  deepExtend,
  isInArray,
  safeDocument,
} from "@tsparticles/engine";
import type { IParticleMode, InteractivityParticleContainer, ParticleMode } from "./Types.js";
import { InteractivityParticleOptions } from "./Options/Classes/InteractivityParticleOptions.js";

const particleMode = "particle";

/** Interactivity particle maker interactor */
export class InteractivityParticleMaker extends ExternalInteractorBase<InteractivityParticleContainer> {
  /** @inheritDoc */
  readonly maxDistance = 0;

  #clearTimeout?: number;
  #lastPosition?: ICoordinates;
  #particle?: Particle;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(container: InteractivityParticleContainer) {
    super(container);
  }

  /** @inheritDoc */
  clear(): void {
    // do nothing
  }

  /** @inheritDoc */
  init(): void {
    // do nothing
  }

  /** @inheritDoc */
  interact(interactivityData: IInteractivityData): void {
    const container = this.container,
      options = container.actualOptions;

    if (!container.retina.reduceFactor) {
      return;
    }

    const mousePos = interactivityData.mouse.position,
      interactivityParticleOptions = options.interactivity?.modes.particle;

    if (!interactivityParticleOptions) {
      return;
    }

    const mouseStopped =
        interactivityParticleOptions.pauseOnStop &&
        (interactivityData.mouse.position === this.#lastPosition ||
          (interactivityData.mouse.position?.x === this.#lastPosition?.x &&
            interactivityData.mouse.position?.y === this.#lastPosition?.y)),
      clearDelay = interactivityParticleOptions.stopDelay;

    if (mousePos) {
      this.#lastPosition = { ...mousePos };
    } else {
      this.#lastPosition = undefined;
    }

    if (!this.#lastPosition) {
      return;
    }

    if (mouseStopped) {
      if (this.#clearTimeout) {
        return;
      }

      this.#clearTimeout = setTimeout(() => {
        if (!this.#particle) {
          return;
        }

        if (interactivityParticleOptions.replaceCursor) {
          const element = interactivityData.element as HTMLElement | Window | Document | undefined;

          if (element) {
            if (element instanceof Window || element instanceof Document) {
              safeDocument().body.style.cursor = "";
            } else {
              element.style.cursor = "";
            }
          }
        }

        this.#particle.destroy(true);

        this.#particle = undefined;
      }, clearDelay);

      return;
    }

    if (this.#clearTimeout) {
      clearTimeout(this.#clearTimeout);

      this.#clearTimeout = undefined;
    }

    if (!this.#particle) {
      const particleOptions = deepExtend(interactivityParticleOptions.options, {
        move: {
          enable: false,
        },
      }) as RecursivePartial<ParticlesOptions>;

      this.#particle = container.particles.addParticle(this.#lastPosition, particleOptions);

      if (interactivityParticleOptions.replaceCursor) {
        const element = interactivityData.element as HTMLElement | Window | Document | undefined;

        if (element) {
          if (element instanceof Window || element instanceof Document) {
            safeDocument().body.style.cursor = "none";
          } else {
            element.style.cursor = "none";
          }
        }
      }
    }

    if (!this.#particle) {
      return;
    }

    this.#particle.position.x = this.#lastPosition.x;
    this.#particle.position.y = this.#lastPosition.y;
  }

  /** @inheritDoc */
  isEnabled(interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      options = container.actualOptions,
      mouse = interactivityData.mouse,
      events = (particle?.interactivity ?? options.interactivity)?.events;

    return (
      !!events &&
      ((mouse.clicking && mouse.inside && !!mouse.position && isInArray(particleMode, events.onClick.mode)) ||
        (mouse.inside && !!mouse.position && isInArray(particleMode, events.onHover.mode)))
    );
  }

  /** @inheritDoc */
  loadModeOptions(
    options: Modes & ParticleMode,
    ...sources: RecursivePartial<(IModes & IParticleMode) | undefined>[]
  ): void {
    options.particle ??= new InteractivityParticleOptions();

    for (const source of sources) {
      options.particle.load(source?.particle);
    }
  }

  /** @inheritDoc */
  reset(): void {
    // do nothing
  }
}
