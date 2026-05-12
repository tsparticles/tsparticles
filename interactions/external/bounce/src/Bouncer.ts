import type { BounceContainer, BounceMode, IBounceMode } from "./Types.js";
import {
  ExternalInteractorBase,
  type IInteractivityData,
  type IModes,
  type InteractivityParticle,
  type Modes,
  isDivModeEnabled,
  mouseMoveEvent,
} from "@tsparticles/plugin-interactivity";
import { type RecursivePartial, isInArray } from "@tsparticles/engine";
import { divBounce, mouseBounce } from "./Utils.js";
import { Bounce } from "./Options/Classes/Bounce.js";

const bounceMode = "bounce";

/** Particle bounce manager */
export class Bouncer extends ExternalInteractorBase<BounceContainer> {
  private _maxDistance;

  constructor(container: BounceContainer) {
    super(container);

    this._maxDistance = 0;
  }

  /** @inheritDoc */
  get maxDistance(): number {
    return this._maxDistance;
  }

  /** @inheritDoc */
  clear(): void {
    // do nothing
  }

  /** @inheritDoc */
  init(): void {
    const container = this.container,
      bounce = container.actualOptions.interactivity?.modes.bounce;

    if (!bounce) {
      return;
    }

    this._maxDistance = bounce.distance;

    container.retina.bounceModeDistance = bounce.distance * container.retina.pixelRatio;
  }

  /** @inheritDoc */
  interact(interactivityData: IInteractivityData): void {
    const container = this.container,
      options = container.actualOptions,
      events = options.interactivity?.events,
      mouseMoveStatus = interactivityData.status === mouseMoveEvent;

    if (!events) {
      return;
    }

    const hoverEnabled = events.onHover.enable,
      hoverMode = events.onHover.mode,
      divs = events.onDiv;

    if (mouseMoveStatus && hoverEnabled && isInArray(bounceMode, hoverMode)) {
      mouseBounce(this.container, interactivityData, p => this.isEnabled(interactivityData, p));
    } else {
      divBounce(this.container, divs, bounceMode, p => this.isEnabled(interactivityData, p));
    }
  }

  /** @inheritDoc */
  isEnabled(interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      options = container.actualOptions,
      mouse = interactivityData.mouse,
      events = (particle?.interactivity ?? options.interactivity)?.events;

    if (!events) {
      return false;
    }

    const divs = events.onDiv;

    return (
      (!!mouse.position && events.onHover.enable && isInArray(bounceMode, events.onHover.mode)) ||
      isDivModeEnabled(bounceMode, divs)
    );
  }

  /** @inheritDoc */
  loadModeOptions(
    options: Modes & BounceMode,
    ...sources: RecursivePartial<(IModes & IBounceMode) | undefined>[]
  ): void {
    options.bounce ??= new Bounce();

    for (const source of sources) {
      options.bounce.load(source?.bounce);
    }
  }

  /** @inheritDoc */
  reset(): void {
    // do nothing
  }
}
