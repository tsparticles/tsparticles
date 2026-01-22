import {
  ExternalInteractorBase,
  type IInteractivityData,
  type IModes,
  type InteractivityParticle,
  type Modes,
} from "@tsparticles/plugin-interactivity";
import {
  type ICoordinates,
  type IDelta,
  type RecursivePartial,
  isInArray,
  millisecondsToSeconds,
} from "@tsparticles/engine";
import type { ITrailMode, TrailContainer, TrailMode } from "./Types.js";
import { Trail } from "./Options/Classes/Trail.js";

const trailMode = "trail";

/**
 */
export class TrailMaker extends ExternalInteractorBase<TrailContainer> {
  private _delay: number;
  private _lastPosition?: ICoordinates;

  constructor(container: TrailContainer) {
    super(container);

    this._delay = 0;
  }

  clear(): void {
    // do nothing
  }

  init(): void {
    // do nothing
  }

  interact(interactivityData: IInteractivityData, delta: IDelta): void {
    const container = this.container;

    if (!container.retina.reduceFactor) {
      return;
    }

    const options = container.actualOptions,
      trailOptions = options.interactivity?.modes.trail;

    if (!trailOptions) {
      return;
    }

    const optDelay = (trailOptions.delay * millisecondsToSeconds) / this.container.retina.reduceFactor;

    if (this._delay < optDelay) {
      this._delay += delta.value;
    }

    if (this._delay < optDelay) {
      return;
    }

    const canEmit = !(
        trailOptions.pauseOnStop &&
        (interactivityData.mouse.position === this._lastPosition ||
          (interactivityData.mouse.position?.x === this._lastPosition?.x &&
            interactivityData.mouse.position?.y === this._lastPosition?.y))
      ),
      mousePos = interactivityData.mouse.position;

    if (mousePos) {
      this._lastPosition = { ...mousePos };
    } else {
      delete this._lastPosition;
    }

    if (canEmit) {
      container.particles.push(trailOptions.quantity, interactivityData.mouse.position, trailOptions.particles);
    }

    this._delay -= optDelay;
  }

  isEnabled(interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      options = container.actualOptions,
      mouse = interactivityData.mouse,
      events = (particle?.interactivity ?? options.interactivity)?.events;

    return (
      !!events &&
      ((mouse.clicking && mouse.inside && !!mouse.position && isInArray(trailMode, events.onClick.mode)) ||
        (mouse.inside && !!mouse.position && isInArray(trailMode, events.onHover.mode)))
    );
  }

  loadModeOptions(options: Modes & TrailMode, ...sources: RecursivePartial<(IModes & ITrailMode) | undefined>[]): void {
    options.trail ??= new Trail();

    for (const source of sources) {
      options.trail.load(source?.trail);
    }
  }

  reset(): void {
    // nothing to do
  }
}
