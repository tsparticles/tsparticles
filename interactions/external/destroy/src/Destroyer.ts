import type { DestroyContainer, DestroyMode, IDestroyMode } from "./Types.js";
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
import { divDestroy, mouseDestroy } from "./Utils.js";
import { Destroy } from "./Options/Classes/Destroy.js";

const destroyMode = "destroy";

export class Destroyer extends ExternalInteractorBase<DestroyContainer> {
  private _maxDistance;

  constructor(container: DestroyContainer) {
    super(container);

    this._maxDistance = 0;
  }

  get maxDistance(): number {
    return this._maxDistance;
  }

  clear(): void {
    // do nothing
  }

  init(): void {
    const container = this.container,
      destroy = container.actualOptions.interactivity?.modes.destroy;

    if (!destroy) {
      return;
    }

    this._maxDistance = destroy.distance;

    container.retina.destroyModeDistance = destroy.distance * container.retina.pixelRatio;
  }

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

    if (mouseMoveStatus && hoverEnabled && isInArray(destroyMode, hoverMode)) {
      mouseDestroy(this.container, interactivityData);
    } else {
      divDestroy(this.container, divs, destroyMode);
    }
  }

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
      (!!mouse.position && events.onHover.enable && isInArray(destroyMode, events.onHover.mode)) ||
      isDivModeEnabled(destroyMode, divs)
    );
  }

  loadModeOptions(
    options: Modes & DestroyMode,
    ...sources: RecursivePartial<(IModes & IDestroyMode) | undefined>[]
  ): void {
    options.destroy ??= new Destroy();

    for (const source of sources) {
      options.destroy.load(source?.destroy);
    }
  }

  reset(): void {
    // do nothing
  }
}
