import {
  type ICoordinates,
  type PluginManager,
  type RecursivePartial,
  doublePI,
  getRandom,
  isNumber,
} from "@tsparticles/engine";
import type { AbsorberContainer } from "./AbsorberContainer.js";
import type { AbsorberInstance } from "./AbsorberInstance.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";

const defaultIndex = 0,
  /**
   * The share of the absorbed mass the released particles are worth. It is deliberately less than
   * one: an absorber releases a little less mass than it was holding, and that drained slice is
   * what makes a split terminate. Releasing exactly the accumulated mass would keep the system in
   * equilibrium forever, since the absorbers do not consume the particles they absorb
   */
  splitMassRatio = 0.9;

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

  /**
   * Splits an absorber in particles and removes it
   *
   * The absorber is not replaced by a new one: it has been consumed by the split. The particles it
   * releases are worth slightly less mass than the absorber had accumulated, so every split drains
   * a slice of mass out of the system instead of manufacturing particles out of nothing, which is
   * what would turn a split into an endless particle factory
   * @param container - the absorber container
   * @param absorber - the absorber to split
   */
  splitAbsorber(container: AbsorberContainer, absorber: AbsorberInstance): void {
    if (!absorber.options.split.enable) {
      return;
    }

    const { size } = absorber,
      quantity = absorber.options.split.quantity,
      position = {
        x: absorber.position.x,
        y: absorber.position.y,
      };

    this.removeAbsorber(container, absorber);

    if (quantity <= defaultIndex) {
      return;
    }

    // the absorbed mass is shared between the released particles, minus the drained slice
    const particleSize = (size * splitMassRatio) / quantity;

    for (let i = defaultIndex; i < quantity; i++) {
      const angle = getRandom() * doublePI;

      // the particles are released on the rim the absorber was covering, which is the shape a
      // split is expected to have
      container.particles.addParticle(
        {
          x: position.x + Math.cos(angle) * size,
          y: position.y + Math.sin(angle) * size,
        },
        { size: { value: particleSize } },
      );
    }
  }
}
