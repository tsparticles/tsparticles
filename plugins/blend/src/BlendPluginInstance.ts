import type { BlendContainer, BlendParticle } from "./types.js";
import { type CanvasContextType, type IContainerPlugin, defaultCompositeValue } from "@tsparticles/engine";

export class BlendPluginInstance implements IContainerPlugin {
  private readonly _container;
  private _defaultCompositeValue?: GlobalCompositeOperation;

  constructor(container: BlendContainer) {
    this._container = container;
  }

  drawParticleCleanup(context: CanvasContextType, particle: BlendParticle): void {
    if (!particle.options.blend?.enable) {
      return;
    }

    context.globalCompositeOperation = particle.originalBlendMode ?? defaultCompositeValue;

    particle.originalBlendMode = undefined;
  }

  drawParticleSetup(context: CanvasContextType, particle: BlendParticle): void {
    if (!particle.options.blend?.enable) {
      return;
    }

    particle.originalBlendMode = context.globalCompositeOperation;

    context.globalCompositeOperation = particle.options.blend.mode;
  }

  drawSettingsCleanup(context: CanvasContextType): void {
    if (!this._defaultCompositeValue) {
      return;
    }

    context.globalCompositeOperation = this._defaultCompositeValue;
  }

  drawSettingsSetup(context: CanvasContextType): void {
    const previousComposite = context.globalCompositeOperation,
      blend = this._container.actualOptions.blend;

    this._defaultCompositeValue = previousComposite;

    context.globalCompositeOperation = blend?.enable ? blend.mode : previousComposite;
  }
}
