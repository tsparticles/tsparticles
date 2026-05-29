import {
  type IContainerPlugin,
  type IDelta,
  type Particle,
  executeOnSingleOrMultiple,
  isArray,
} from "@tsparticles/engine";
import type { AbsorberContainer } from "./AbsorberContainer.js";
import type { AbsorbersInstancesManager } from "./AbsorbersInstancesManager.js";

/**
 */
export class AbsorbersPluginInstance implements IContainerPlugin {
  readonly #container;
  readonly #instancesManager;

  constructor(container: AbsorberContainer, instancesManager: AbsorbersInstancesManager) {
    this.#container = container;
    this.#instancesManager = instancesManager;

    this.#instancesManager.initContainer(container);
  }

  draw(context: OffscreenCanvasRenderingContext2D): void {
    for (const absorber of this.#instancesManager.getArray(this.#container)) {
      absorber.draw(context);
    }
  }

  async init(): Promise<void> {
    const absorbers = this.#container.actualOptions.absorbers,
      promises = executeOnSingleOrMultiple(absorbers, async (absorber): Promise<void> => {
        await this.#instancesManager.addAbsorber(this.#container, absorber);
      });

    if (isArray(promises)) {
      await Promise.all(promises);
    } else {
      await promises;
    }
  }

  particleUpdate(particle: Particle, delta: IDelta): void {
    for (const absorber of this.#instancesManager.getArray(this.#container)) {
      absorber.attract(particle, delta);

      if (particle.destroyed) {
        break;
      }
    }
  }

  resize(): void {
    for (const absorber of this.#instancesManager.getArray(this.#container)) {
      absorber.resize();
    }
  }

  stop(): void {
    this.#instancesManager.clear(this.#container);
  }
}
