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
  private readonly _container;
  private readonly _instancesManager;

  constructor(container: AbsorberContainer, instancesManager: AbsorbersInstancesManager) {
    this._container = container;
    this._instancesManager = instancesManager;

    this._instancesManager.initContainer(container);
  }

  draw(context: CanvasRenderingContext2D): void {
    for (const absorber of this._instancesManager.getArray(this._container)) {
      absorber.draw(context);
    }
  }

  async init(): Promise<void> {
    const absorbers = this._container.actualOptions.absorbers,
      promises = executeOnSingleOrMultiple(absorbers, async (absorber): Promise<void> => {
        await this._instancesManager.addAbsorber(this._container, absorber);
      });

    if (isArray(promises)) {
      await Promise.all(promises);
    } else {
      await promises;
    }
  }

  particleUpdate(particle: Particle, delta: IDelta): void {
    for (const absorber of this._instancesManager.getArray(this._container)) {
      absorber.attract(particle, delta);

      if (particle.destroyed) {
        break;
      }
    }
  }

  resize(): void {
    for (const absorber of this._instancesManager.getArray(this._container)) {
      absorber.resize();
    }
  }

  stop(): void {
    this._instancesManager.clear(this._container);
  }
}
