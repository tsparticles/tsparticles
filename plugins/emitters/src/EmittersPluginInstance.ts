import { type IContainerPlugin, type IDelta, isArray } from "@tsparticles/engine";
import type { EmitterContainer } from "./EmitterContainer.js";
import type { EmittersInstancesManager } from "./EmittersInstancesManager.js";

/**
 */
export class EmittersPluginInstance implements IContainerPlugin {
  private readonly _instancesManager;

  constructor(
    instancesManager: EmittersInstancesManager,
    private readonly container: EmitterContainer,
  ) {
    this._instancesManager = instancesManager;

    this._instancesManager.initContainer(container);
  }

  async init(): Promise<void> {
    const emittersOptions = this.container.actualOptions.emitters;

    if (isArray(emittersOptions)) {
      for (const emitterOptions of emittersOptions) {
        await this._instancesManager.addEmitter(this.container, emitterOptions);
      }
    } else {
      await this._instancesManager.addEmitter(this.container, emittersOptions);
    }
  }

  pause(): void {
    for (const emitter of this._instancesManager.getArray(this.container)) {
      emitter.pause();
    }
  }

  play(): void {
    for (const emitter of this._instancesManager.getArray(this.container)) {
      emitter.play();
    }
  }

  resize(): void {
    for (const emitter of this._instancesManager.getArray(this.container)) {
      emitter.resize();
    }
  }

  stop(): void {
    this._instancesManager.clear(this.container);
  }

  update(delta: IDelta): void {
    this._instancesManager.getArray(this.container).forEach(emitter => {
      emitter.update(delta);
    });
  }
}
