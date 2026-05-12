import {
  ExternalInteractorBase,
  type IInteractivityData,
  type IModes,
  type InteractivityParticle,
  type Modes,
} from "@tsparticles/plugin-interactivity";
import type { IParallaxMode, ParallaxContainer, ParallaxMode } from "./Types.js";
import { type Particle, type RecursivePartial, half, isInArray } from "@tsparticles/engine";
import { Parallax } from "./Options/Classes/Parallax.js";

const parallaxMode = "parallax";

/**
 * Particle parallax manager
 */
export class Parallaxer extends ExternalInteractorBase<ParallaxContainer> {
  /** @inheritDoc */
  readonly maxDistance = 0;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(container: ParallaxContainer) {
    super(container);
  }

  /** @inheritDoc */
  clear(): void {
    // no-op
  }

  /** @inheritDoc */
  init(): void {
    // no-op
  }

  /** @inheritDoc */
  interact(interactivityData: IInteractivityData): void {
    for (const particle of this.container.particles.filter(p => this.isEnabled(interactivityData, p))) {
      this._parallaxInteract(interactivityData, particle);
    }
  }

  /** @inheritDoc */
  isEnabled(interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      mouse = interactivityData.mouse,
      events = (particle?.interactivity ?? container.actualOptions.interactivity)?.events;

    return !!events?.onHover.enable && !!mouse.position && isInArray(parallaxMode, events.onHover.mode);
  }

  /** @inheritDoc */
  loadModeOptions(
    options: Modes & ParallaxMode,
    ...sources: RecursivePartial<(IModes & IParallaxMode) | undefined>[]
  ): void {
    options.parallax ??= new Parallax();

    for (const source of sources) {
      options.parallax.load(source?.parallax);
    }
  }

  /** @inheritDoc */
  reset(): void {
    // no-op
  }

  private _parallaxInteract(interactivityData: IInteractivityData, particle: Particle): void {
    if (!this.isEnabled(interactivityData, particle)) {
      return;
    }

    const container = this.container,
      options = container.actualOptions,
      parallaxOptions = options.interactivity?.modes.parallax;

    if (!parallaxOptions) {
      return;
    }

    const parallaxForce = parallaxOptions.force,
      mousePos = interactivityData.mouse.position;

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
