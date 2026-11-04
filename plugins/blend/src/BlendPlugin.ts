import type { BlendOptions, BlendParticlesOptions, IBlendOptions, IBlendParticlesOptions } from "./types.js";
import type { Container, IContainerPlugin, IPlugin, RecursivePartial } from "@tsparticles/engine";
import { Blend } from "./Options/Classes/Blend.js";

/**
 * Checks whether a particle option override enables blending.
 * @param particleOptions - the particle options to inspect
 * @returns whether blending is enabled
 */
function hasEnabledBlend(particleOptions: unknown): boolean {
  if (!particleOptions || typeof particleOptions !== "object" || !("blend" in particleOptions)) {
    return false;
  }

  const blend = particleOptions.blend;

  return !!blend && typeof blend === "object" && "enable" in blend && !!blend.enable;
}

/**
 */
export class BlendPlugin implements IPlugin {
  readonly id = "blend";

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { BlendPluginInstance } = await import("./BlendPluginInstance.js");

    return new BlendPluginInstance(container);
  }

  loadOptions(_container: Container, options: BlendOptions, source?: RecursivePartial<IBlendOptions>): void {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }

    let blendOptions = options.blend;

    if (!blendOptions?.load) {
      options.blend = blendOptions = new Blend();
    }

    blendOptions.load(source?.blend);
  }

  loadParticlesOptions(
    _container: Container,
    options: BlendParticlesOptions,
    source?: RecursivePartial<IBlendParticlesOptions>,
  ): void {
    options.blend ??= new Blend();

    options.blend.load(source?.blend);
  }

  needsPlugin(options?: RecursivePartial<IBlendOptions>): boolean {
    if (
      options?.blend?.enable ||
      options?.particles?.blend?.enable ||
      Object.values(options?.particles?.groups ?? {}).some(hasEnabledBlend)
    ) {
      return true;
    }

    const emitters = options?.["emitters"];
    let emitterList: unknown[] = [];

    if (Array.isArray(emitters)) {
      emitterList = emitters;
    } else if (emitters) {
      emitterList = [emitters];
    }

    return emitterList.some(emitter => {
      if (!emitter || typeof emitter !== "object" || !("particles" in emitter)) {
        return false;
      }

      const particles = emitter.particles;

      return Array.isArray(particles) ? particles.some(hasEnabledBlend) : hasEnabledBlend(particles);
    });
  }
}
