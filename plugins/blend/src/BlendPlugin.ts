import type { BlendOptions, BlendParticlesOptions, IBlendOptions, IBlendParticlesOptions } from "./types.js";
import type { Container, IContainerPlugin, IPlugin, RecursivePartial } from "@tsparticles/engine";
import { Blend } from "./Options/Classes/Blend.js";

/**
 */
export class BlendPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "blend";
    }

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
        return !!options?.blend?.enable || !!options?.particles?.blend?.enable;
    }
}
