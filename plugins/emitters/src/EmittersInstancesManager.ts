import { type ICoordinates, type RecursivePartial, isNumber } from "@tsparticles/engine";
import { Emitter } from "./Options/Classes/Emitter.js";
import type { EmitterContainer } from "./EmitterContainer.js";
import type { EmitterInstance } from "./EmitterInstance.js";
import type { EmittersPluginManager } from "./EmittersEngine.js";
import type { IEmitter } from "./Options/Interfaces/IEmitter.js";

const defaultIndex = 0;

export class EmittersInstancesManager {
  readonly #containerArrays;
  readonly #pluginManager;

  constructor(pluginManager: EmittersPluginManager) {
    this.#containerArrays = new Map<EmitterContainer, EmitterInstance[]>();
    this.#pluginManager = pluginManager;
  }

  async addEmitter(
    container: EmitterContainer,
    options: RecursivePartial<IEmitter>,
    position?: ICoordinates,
  ): Promise<EmitterInstance | undefined> {
    return this.addEmitters(container, [{ options, position }]).then(t => t[defaultIndex]);
  }

  async addEmitters(
    container: EmitterContainer,
    emitters: { options: RecursivePartial<IEmitter>; position?: ICoordinates }[],
  ): Promise<EmitterInstance[]> {
    const { EmitterInstance } = await import("./EmitterInstance.js"),
      res = [];

    for (const { options, position } of emitters) {
      const emitterOptions = new Emitter();

      emitterOptions.load(options);

      const emitter = new EmitterInstance(
        this.#pluginManager,
        container,
        (emitter: EmitterInstance) => {
          this.removeEmitter(container, emitter);
        },
        emitterOptions,
        position,
      );

      await emitter.init();

      this.getArray(container).push(emitter);

      res.push(emitter);
    }

    return res;
  }

  clear(container: EmitterContainer): void {
    this.initContainer(container);

    this.#containerArrays.set(container, []);
  }

  getArray(container: EmitterContainer): EmitterInstance[] {
    this.initContainer(container);

    let array = this.#containerArrays.get(container);

    if (!array) {
      array = [];

      this.#containerArrays.set(container, array);
    }

    return array;
  }

  initContainer(container: EmitterContainer): void {
    if (this.#containerArrays.has(container)) {
      return;
    }

    this.#containerArrays.set(container, []);

    container.getEmitter = (idxOrName?: number | string): EmitterInstance | undefined => {
      const array = this.getArray(container);

      return idxOrName === undefined || isNumber(idxOrName)
        ? array[idxOrName ?? defaultIndex]
        : array.find(t => t.name === idxOrName);
    };

    container.addEmitter = async (
      options: RecursivePartial<IEmitter>,
      position?: ICoordinates,
    ): Promise<EmitterInstance | undefined> => this.addEmitter(container, options, position);

    container.addEmitters = async (
      emitters: { options: RecursivePartial<IEmitter>; position?: ICoordinates }[],
    ): Promise<EmitterInstance[]> => this.addEmitters(container, emitters);

    container.removeEmitter = (idxOrName?: number | string): void => {
      const emitter = container.getEmitter?.(idxOrName);

      if (emitter) {
        this.removeEmitter(container, emitter);
      }
    };

    container.playEmitter = (idxOrName?: number | string): void => {
      const emitter = container.getEmitter?.(idxOrName);

      if (emitter) {
        emitter.externalPlay();
      }
    };

    container.pauseEmitter = (idxOrName?: number | string): void => {
      const emitter = container.getEmitter?.(idxOrName);

      if (emitter) {
        emitter.externalPause();
      }
    };
  }

  removeEmitter(container: EmitterContainer, emitter: EmitterInstance): void {
    const index = this.getArray(container).indexOf(emitter),
      minIndex = 0,
      deleteCount = 1;

    if (index >= minIndex) {
      this.getArray(container).splice(index, deleteCount);
    }
  }
}
