import { type IContainerPlugin, type IDelta, isArray } from "@tsparticles/engine";
import type { EmitterContainer } from "./EmitterContainer.js";
import type { EmittersInstancesManager } from "./EmittersInstancesManager.js";

/**
 */
export class EmittersPluginInstance implements IContainerPlugin {
  private readonly _container;
  private readonly _instancesManager;

  constructor(instancesManager: EmittersInstancesManager, container: EmitterContainer) {
    this._container = container;
    this._instancesManager = instancesManager;

    this._instancesManager.initContainer(this._container);
  }

  async init(): Promise<void> {
    const emittersOptions = this._container.actualOptions.emitters;

    if (isArray(emittersOptions)) {
      for (const emitterOptions of emittersOptions) {
        await this._instancesManager.addEmitter(this._container, emitterOptions);
      }
    } else {
      await this._instancesManager.addEmitter(this._container, emittersOptions);
    }
  }

  pause(): void {
    for (const emitter of this._instancesManager.getArray(this._container)) {
      emitter.pause();
    }
  }

  play(): void {
    for (const emitter of this._instancesManager.getArray(this._container)) {
      emitter.play();
    }
  }

  resize(): void {
    for (const emitter of this._instancesManager.getArray(this._container)) {
      emitter.resize();
    }
  }

  stop(): void {
    this._instancesManager.clear(this._container);
  }

  update(delta: IDelta): void {
    this._instancesManager.getArray(this._container).forEach(emitter => {
      emitter.update(delta);
    });
  }
}
