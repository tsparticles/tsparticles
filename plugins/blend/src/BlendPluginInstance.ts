import type { BlendContainer, BlendParticle } from "./types.js";
import { type IContainerPlugin, defaultCompositeValue } from "@tsparticles/engine";

export class BlendPluginInstance implements IContainerPlugin {
  readonly #container;
  #defaultCompositeValue?: GlobalCompositeOperation;

  constructor(container: BlendContainer) {
    this.#container = container;
  }

  drawParticleCleanup(context: OffscreenCanvasRenderingContext2D, particle: BlendParticle): void {
    if (!particle.options.blend?.enable) {
      return;
    }

    context.globalCompositeOperation = particle.originalBlendMode ?? defaultCompositeValue;

    particle.originalBlendMode = undefined;
  }

  drawParticleSetup(context: OffscreenCanvasRenderingContext2D, particle: BlendParticle): void {
    if (!particle.options.blend?.enable) {
      return;
    }

    particle.originalBlendMode = context.globalCompositeOperation;

    context.globalCompositeOperation = particle.options.blend.mode;
  }

  drawSettingsCleanup(context: OffscreenCanvasRenderingContext2D): void {
    if (!this.#defaultCompositeValue) {
      return;
    }

    context.globalCompositeOperation = this.#defaultCompositeValue;
  }

  drawSettingsSetup(context: OffscreenCanvasRenderingContext2D): void {
    const previousComposite = context.globalCompositeOperation,
      blend = this.#container.actualOptions.blend;

    this.#defaultCompositeValue = previousComposite;

    context.globalCompositeOperation = blend?.enable ? blend.mode : previousComposite;
  }
}
