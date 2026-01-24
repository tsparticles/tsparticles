import type { BlendContainer, BlendParticle } from "./types.js";
import { type IContainerPlugin } from "@tsparticles/engine";

export class BlendPluginInstance implements IContainerPlugin {
  private readonly _container;
  private _defaultCompositeValue?: GlobalCompositeOperation;

  constructor(container: BlendContainer) {
    this._container = container;
  }

  drawParticleCleanup(context: CanvasRenderingContext2D, particle: BlendParticle): void {
    context.globalCompositeOperation = particle.originalBlendMode ?? "source-over";

    particle.originalBlendMode = undefined;
  }

  drawParticleSetup(context: CanvasRenderingContext2D, particle: BlendParticle): void {
    if (!particle.options.blend?.enable) {
      return;
    }

    particle.originalBlendMode = context.globalCompositeOperation;

    context.globalCompositeOperation = particle.options.blend.mode;
  }

  drawSettingsCleanup(context: CanvasRenderingContext2D): void {
    if (!this._defaultCompositeValue) {
      return;
    }

    context.globalCompositeOperation = this._defaultCompositeValue;
  }

  drawSettingsSetup(context: CanvasRenderingContext2D): void {
    const previousComposite = context.globalCompositeOperation,
      blend = this._container.actualOptions.blend;

    this._defaultCompositeValue = previousComposite;

    context.globalCompositeOperation = blend?.enable ? blend.mode : previousComposite;
  }
}
