import type { EmitterModeOptions, IEmitterModeOptions } from "./types.js";
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
  type SingleOrMultiple,
  arrayRandomIndex,
  executeOnSingleOrMultiple,
  isArray,
  isInArray,
  itemFromArray,
} from "@tsparticles/engine";
import { Emitter } from "./Options/Classes/Emitter.js";
import type { EmitterContainer } from "./EmitterContainer.js";
import type { EmitterInstance } from "./EmitterInstance.js";
import type { EmittersInstancesManager } from "./EmittersInstancesManager.js";
import type { IEmitter } from "./Options/Interfaces/IEmitter.js";
import { defaultRandomOptions } from "./constants.js";

const emittersMode = "emitters";

/**
 * The EmittersInteractor class handles the interaction between the user and the emitters,
 * processing click modes and updating emitter instances each frame.
 */
export class EmittersInteractor extends ExternalInteractorBase<EmitterContainer> {
  /**
   * Handles click mode for adding emitters on click
   */
  handleClickMode: (mode: string, interactivityData: IInteractivityData) => void;
  /**
   * The maximum distance for the interactor
   */
  readonly maxDistance;

  private readonly _instancesManager;

  constructor(instancesManager: EmittersInstancesManager, container: EmitterContainer) {
    super(container);

    this._instancesManager = instancesManager;
    this.maxDistance = 0;

    this.handleClickMode = (mode, interactivityData): void => {
      const container = this.container,
        options = container.actualOptions,
        modeEmitters = options.interactivity.modes.emitters;

      if (!modeEmitters || mode !== emittersMode) {
        return;
      }

      let emittersModeOptions: SingleOrMultiple<IEmitter> | undefined;

      if (isArray(modeEmitters.value)) {
        const minLength = 0,
          modeEmittersCount = modeEmitters.value.length;

        if (modeEmittersCount > minLength && modeEmitters.random.enable) {
          emittersModeOptions = [];

          const usedIndexes = new Set<number>();

          for (let i = 0; i < modeEmitters.random.count; i++) {
            const idx = arrayRandomIndex(modeEmitters.value);

            if (usedIndexes.has(idx) && usedIndexes.size < modeEmittersCount) {
              i--;
              continue;
            }

            usedIndexes.add(idx);

            const selectedOptions = itemFromArray(modeEmitters.value, idx);

            if (!selectedOptions) {
              continue;
            }

            emittersModeOptions.push(selectedOptions);
          }
        } else {
          emittersModeOptions = modeEmitters.value;
        }
      } else {
        emittersModeOptions = modeEmitters.value;
      }

      const emittersOptions = emittersModeOptions,
        ePosition = interactivityData.mouse.clickPosition;

      void executeOnSingleOrMultiple(emittersOptions, async emitter => {
        await this._instancesManager.addEmitter(this.container, emitter, ePosition);
      });
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
   * Processes the interaction for each frame, updating all emitter instances
   * @param _interactivityData - the interactivity data
   * @param delta - the delta time
   */
  interact(_interactivityData: IInteractivityData, delta: IDelta): void {
    for (const emitter of this._instancesManager.getArray(this.container)) {
      emitter.update(delta);
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

    if (!mouse.clickPosition || !events.onClick.enable) {
      return false;
    }

    return isInArray(emittersMode, events.onClick.mode);
  }

  /**
   * Loads the emitter mode options from sources
   * @param options - the target options to load into
   * @param sources - the source options to load from
   */
  loadModeOptions(
    options: Modes & EmitterModeOptions,
    ...sources: RecursivePartial<(IModes & IEmitterModeOptions) | undefined>[]
  ): void {
    options.emitters = {
      random: defaultRandomOptions,
      value: [],
    };

    for (const source of sources) {
      if (!source?.emitters) {
        continue;
      }

      if (isArray(source.emitters)) {
        for (const emitter of source.emitters) {
          const tmp = new Emitter();

          tmp.load(emitter);

          options.emitters.value.push(tmp);
        }
      } else if ("value" in source.emitters) {
        const emitterModeOptions = source.emitters;

        options.emitters.random.enable = emitterModeOptions.random?.enable ?? options.emitters.random.enable;
        options.emitters.random.count = emitterModeOptions.random?.count ?? options.emitters.random.count;

        if (isArray(emitterModeOptions.value)) {
          for (const emitter of emitterModeOptions.value) {
            const tmp = new Emitter();

            tmp.load(emitter);

            options.emitters.value.push(tmp);
          }
        } else {
          const tmp = new Emitter();

          tmp.load(emitterModeOptions.value);

          options.emitters.value.push(tmp);
        }
      } else {
        const tmp = new Emitter();

        tmp.load(source.emitters as RecursivePartial<IEmitter>);

        options.emitters.value.push(tmp);
      }
    }
  }

  /**
   * Removes an emitter from the instances manager
   * @param emitter - the emitter instance to remove
   */
  removeEmitter(emitter: EmitterInstance): void {
    const index = this._instancesManager.getArray(this.container).indexOf(emitter),
      minIndex = 0,
      deleteCount = 1;

    if (index >= minIndex) {
      this._instancesManager.getArray(this.container).splice(index, deleteCount);
    }
  }

  /**
   * Resets the interactor state
   */
  reset(): void {
    // no-op
  }
}
