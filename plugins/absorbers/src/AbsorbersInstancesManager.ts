import { type ICoordinates, type PluginManager, type RecursivePartial, isNumber } from "@tsparticles/engine";
import type { AbsorberContainer } from "./AbsorberContainer.js";
import type { AbsorberInstance } from "./AbsorberInstance.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";

const defaultIndex = 0;

export class AbsorbersInstancesManager {
  private readonly _containerArrays;
  private readonly _pluginManager;

  constructor(pluginManager: PluginManager) {
    this._containerArrays = new Map<symbol, AbsorberInstance[]>();
    this._pluginManager = pluginManager;
  }

  async addAbsorber(
    container: AbsorberContainer,
    options: RecursivePartial<IAbsorber>,
    position?: ICoordinates,
  ): Promise<AbsorberInstance> {
    const { AbsorberInstance } = await import("./AbsorberInstance.js"),
      absorber = new AbsorberInstance(this._pluginManager, container, options, position),
      array = this.getArray(container);

    array.push(absorber);

    return absorber;
  }

  clear(container: AbsorberContainer): void {
    this.initContainer(container);

    this._containerArrays.set(container.id, []);
  }

  getArray(container: AbsorberContainer): AbsorberInstance[] {
    this.initContainer(container);

    let array = this._containerArrays.get(container.id);

    if (!array) {
      array = [];

      this._containerArrays.set(container.id, array);
    }

    return array;
  }

  initContainer(container: AbsorberContainer): void {
    if (this._containerArrays.has(container.id)) {
      return;
    }

    this._containerArrays.set(container.id, []);

    container.getAbsorber ??= (idxOrName?: number | string): AbsorberInstance | undefined => {
      const array = this.getArray(container);

      return idxOrName === undefined || isNumber(idxOrName)
        ? array[idxOrName ?? defaultIndex]
        : array.find(t => t.name === idxOrName);
    };

    container.addAbsorber ??= (
      options: RecursivePartial<IAbsorber>,
      position?: ICoordinates,
    ): Promise<AbsorberInstance> => {
      return this.addAbsorber(container, options, position);
    };
  }

  removeAbsorber(container: AbsorberContainer, absorber: AbsorberInstance): void {
    const index = this.getArray(container).indexOf(absorber),
      deleteCount = 1;

    if (index >= defaultIndex) {
      this.getArray(container).splice(index, deleteCount);
    }
  }

  removeContainer(container: AbsorberContainer): void {
    this._containerArrays.delete(container.id);
  }
}
