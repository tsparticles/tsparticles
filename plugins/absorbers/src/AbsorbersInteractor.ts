import type { AbsorberModeOptions, IAbsorberModeOptions } from "./types.js";
import {
  ExternalInteractorBase,
  type IInteractivityData,
  type IModes,
  type InteractivityParticle,
  type Modes,
} from "@tsparticles/plugin-interactivity";
import {
  type IDelta,
  type RecursivePartial,
  getDistance,
  isArray,
  isInArray,
  itemFromArray,
} from "@tsparticles/engine";
import { Absorber } from "./Options/Classes/Absorber.js";
import type { AbsorberContainer } from "./AbsorberContainer.js";
import type { AbsorberInstance } from "./AbsorberInstance.js";
import type { AbsorbersInstancesManager } from "./AbsorbersInstancesManager.js";

const absorbersMode = "absorbers";

export class AbsorbersInteractor extends ExternalInteractorBase<AbsorberContainer> {
  handleClickMode: (mode: string, interactivityData: IInteractivityData) => void;
  readonly maxDistance;

  private _dragging = false;
  private _draggingAbsorber: AbsorberInstance | undefined;
  private readonly _instancesManager;

  constructor(container: AbsorberContainer, instancesManager: AbsorbersInstancesManager) {
    super(container);

    this.maxDistance = 0;
    this._instancesManager = instancesManager;

    this._instancesManager.initContainer(container);

    this.handleClickMode = (mode, interactivityData): void => {
      const container = this.container,
        options = container.actualOptions,
        absorbers = options.interactivity.modes.absorbers;

      if (!absorbers || mode !== absorbersMode) {
        return;
      }

      const { clickPosition } = interactivityData.mouse;

      if (clickPosition) {
        const existingAbsorber = instancesManager
          .getArray(this.container)
          .some(t => getDistance(t.position, clickPosition) < t.size);

        if (existingAbsorber) {
          return;
        }
      }

      const absorbersModeOptions = itemFromArray(absorbers) ?? new Absorber();

      void this._instancesManager.addAbsorber(container, absorbersModeOptions, clickPosition);
    };
  }

  clear(): void {
    // no-op
  }

  init(): void {
    // no-op
  }

  interact(interactivityData: IInteractivityData, delta: IDelta): void {
    for (const particle of this.container.particles.filter(p => this.isEnabled(interactivityData, p))) {
      for (const absorber of this._instancesManager.getArray(this.container)) {
        if (absorber.options.draggable) {
          const mouse = interactivityData.mouse;

          if (mouse.clicking && mouse.downPosition) {
            const mouseDist = getDistance(absorber.position, mouse.downPosition);

            if (mouseDist <= absorber.size) {
              this._dragging = true;
              this._draggingAbsorber = absorber;
            }
          } else {
            this._dragging = false;
            this._draggingAbsorber = undefined;
          }

          if (this._dragging && this._draggingAbsorber == absorber && mouse.position) {
            absorber.position.x = mouse.position.x;
            absorber.position.y = mouse.position.y;
          }
        }

        absorber.attract(particle, delta);

        if (particle.destroyed) {
          break;
        }
      }
    }
  }

  isEnabled(interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      options = container.actualOptions,
      mouse = interactivityData.mouse,
      events = (particle?.interactivity ?? options.interactivity).events;

    if (!mouse.clickPosition || !events.onClick.enable) {
      return false;
    }

    return isInArray(absorbersMode, events.onClick.mode);
  }

  loadModeOptions(
    options: Modes & AbsorberModeOptions,
    ...sources: RecursivePartial<(IModes & IAbsorberModeOptions) | undefined>[]
  ): void {
    options.absorbers ??= [];

    for (const source of sources) {
      if (!source) {
        continue;
      }

      if (isArray(source.absorbers)) {
        for (const absorber of source.absorbers) {
          const tmp = new Absorber();

          tmp.load(absorber);

          options.absorbers.push(tmp);
        }
      } else {
        const tmp = new Absorber();

        tmp.load(source.absorbers);

        options.absorbers.push(tmp);
      }
    }
  }

  reset(): void {
    // no-op
  }
}
