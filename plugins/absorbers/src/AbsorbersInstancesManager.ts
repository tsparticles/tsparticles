import { type ICoordinates, type PluginManager, type RecursivePartial, isNumber } from "@tsparticles/engine";
import type { AbsorberContainer } from "./AbsorberContainer.js";
import type { AbsorberInstance } from "./AbsorberInstance.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";

const defaultIndex = 0;

export class AbsorbersInstancesManager {
  readonly #containerArrays;
  readonly #pluginManager;

  constructor(pluginManager: PluginManager) {
    this.#pluginManager = pluginManager;
    this.#containerArrays = new Map<AbsorberContainer, AbsorberInstance[]>();
  }

  async addAbsorber(
    container: AbsorberContainer,
    options: RecursivePartial<IAbsorber>,
    position?: ICoordinates,
  ): Promise<AbsorberInstance | undefined> {
    return this.addAbsorbers(container, [{ options, position }]).then(res => res[defaultIndex]);
  }

  async addAbsorbers(
    container: AbsorberContainer,
    absorbers: { options: RecursivePartial<IAbsorber>; position?: ICoordinates }[],
  ): Promise<AbsorberInstance[]> {
    const { AbsorberInstance } = await import("./AbsorberInstance.js"),
      res = [];

    for (const { options, position } of absorbers) {
      const absorber = new AbsorberInstance(this.#pluginManager, container, options, position),
        array = this.getArray(container);

      array.push(absorber);
      res.push(absorber);
    }

    return res;
  }

  clear(container: AbsorberContainer): void {
    this.initContainer(container);

    this.#containerArrays.set(container, []);
  }

  getArray(container: AbsorberContainer): AbsorberInstance[] {
    this.initContainer(container);

    let array = this.#containerArrays.get(container);

    if (!array) {
      array = [];

      this.#containerArrays.set(container, array);
    }

    return array;
  }

  initContainer(container: AbsorberContainer): void {
    if (this.#containerArrays.has(container)) {
      return;
    }

    this.#containerArrays.set(container, []);

    container.getAbsorber ??= (idxOrName?: number | string): AbsorberInstance | undefined => {
      const array = this.getArray(container);

      return idxOrName === undefined || isNumber(idxOrName)
        ? array[idxOrName ?? defaultIndex]
        : array.find(t => t.name === idxOrName);
    };

    container.addAbsorber ??= (
      options: RecursivePartial<IAbsorber>,
      position?: ICoordinates,
    ): Promise<AbsorberInstance | undefined> => {
      return this.addAbsorber(container, options, position);
    };

    container.addAbsorbers ??= (
      absorbers: { options: RecursivePartial<IAbsorber>; position?: ICoordinates }[],
    ): Promise<AbsorberInstance[]> => {
      return this.addAbsorbers(container, absorbers);
    };
  }

  removeAbsorber(container: AbsorberContainer, absorber: AbsorberInstance): void {
    const index = this.getArray(container).indexOf(absorber),
      deleteCount = 1;

    if (index >= defaultIndex) {
      this.getArray(container).splice(index, deleteCount);
    }
  }
}
