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

const absorbersMode = "absorbers",
  absorberSplitMode = "absorber-split",
  defaultIndex = 0;

/**
 * Handles the interaction between particles and absorbers, including click-to-add and dragging
 */
export class AbsorbersInteractor extends ExternalInteractorBase<AbsorberContainer> {
  /**
   * Handles the click mode for adding absorbers
   */
  handleClickMode: (mode: string, interactivityData: IInteractivityData) => void;
  /**
   * The maximum distance for the interactor
   */
  readonly maxDistance;

  #dragging = false;
  #draggingAbsorber: AbsorberInstance | undefined;
  readonly #instancesManager;

  constructor(container: AbsorberContainer, instancesManager: AbsorbersInstancesManager) {
    super(container);

    this.maxDistance = 0;
    this.#instancesManager = instancesManager;

    this.#instancesManager.initContainer(container);

    this.handleClickMode = (mode, interactivityData): void => {
      const container = this.container,
        options = container.actualOptions,
        absorbers = options.interactivity.modes.absorbers,
        { clickPosition } = interactivityData.mouse;

      if (mode === absorberSplitMode) {
        if (!clickPosition) {
          return;
        }

        const candidates = instancesManager
            .getArray(container)
            .filter(t => getDistance(t.position, clickPosition) < t.size)
            .sort((a, b) => getDistance(a.position, clickPosition) - getDistance(b.position, clickPosition)),
          target = candidates[defaultIndex];

        if (target?.options.split.enable) {
          this.#instancesManager.splitAbsorber(container, target);
        }

        return;
      }

      if (mode !== absorbersMode || !absorbers) {
        return;
      }

      if (clickPosition) {
        const existingAbsorber = instancesManager
          .getArray(container)
          .some(t => getDistance(t.position, clickPosition) < t.size);

        if (existingAbsorber) {
          return;
        }
      }

      const absorbersModeOptions = itemFromArray(absorbers) ?? new Absorber();

      void this.#instancesManager.addAbsorber(container, absorbersModeOptions, clickPosition);
    };
  }

  /**
   * Clears the interactor state
   */
  clear(): void {
    // no-op
  }

  /**
   * Initializes the interactor
   */
  init(): void {
    // no-op
  }

  /**
   * Processes the interaction for each frame, dragging draggable absorbers. The attraction itself
   * is not applied here: `AbsorbersPluginInstance.particleUpdate` already applies it once per frame
   * for every particle, doing it again would double both the force and the absorbers growth.
   * @param interactivityData - the interactivity data
   * @param _delta - the delta time
   */
  interact(interactivityData: IInteractivityData, _delta: IDelta): void {
    const absorbers = this.#instancesManager.getArray(this.container),
      mouse = interactivityData.mouse;

    for (const absorber of absorbers) {
      if (!absorber.options.draggable) {
        continue;
      }

      if (mouse.clicking && mouse.downPosition) {
        if (!this.#dragging) {
          const mouseDist = getDistance(absorber.position, mouse.downPosition);

          if (mouseDist <= absorber.size) {
            this.#dragging = true;
            this.#draggingAbsorber = absorber;
          }
        }
      } else {
        this.#dragging = false;
        this.#draggingAbsorber = undefined;
      }

      if (this.#dragging && this.#draggingAbsorber === absorber && mouse.position) {
        absorber.position.x = mouse.position.x;
        absorber.position.y = mouse.position.y;
      }
    }
  }

  /**
   * Checks if the interactor is enabled for the given interactivity data
   * @param interactivityData - the interactivity data
   * @param particle - the optional particle
   * @returns true if the interactor is enabled
   */
  isEnabled(interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      options = container.actualOptions,
      mouse = interactivityData.mouse,
      events = (particle?.interactivity ?? options.interactivity).events;

    if (
      !particle &&
      mouse.clicking &&
      this.#instancesManager.getArray(container).some(absorber => absorber.options.draggable)
    ) {
      return true;
    }

    if (!mouse.clickPosition || !events.onClick.enable) {
      return false;
    }

    return isInArray(absorbersMode, events.onClick.mode) || isInArray(absorberSplitMode, events.onClick.mode);
  }

  /**
   * Loads the absorber mode options from sources
   * @param options - the target options to load into
   * @param sources - the source options to load from
   */
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

  /**
   * Resets the interactor state
   */
  reset(): void {
    // no-op
  }
}
