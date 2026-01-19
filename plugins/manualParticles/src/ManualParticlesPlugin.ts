import { type Container, type IContainerPlugin, type IPlugin, type RecursivePartial } from "@tsparticles/engine";
import type { IManualParticlesOptions, ManualParticlesContainer, ManualParticlesOptions } from "./types.js";
import { ManualParticle } from "./Options/Classes/ManualParticle.js";

/**
 */
export class ManualParticlesPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "manual-particles";
    }

    async getPlugin(container: ManualParticlesContainer): Promise<IContainerPlugin> {
        const { ManualParticlesPluginInstance } = await import("./ManualParticlesPluginInstance.js");

        return new ManualParticlesPluginInstance(container);
    }

    loadOptions(
        _container: Container,
        options: ManualParticlesOptions,
        source?: RecursivePartial<IManualParticlesOptions>,
    ): void {
        if (!this.needsPlugin(source)) {
            return;
        }

        options.manualParticles ??= [];

        if (source?.manualParticles) {
            options.manualParticles = source.manualParticles.map(t => {
                const tmp = new ManualParticle();

                tmp.load(t);

                return tmp;
            });
        }
    }

    needsPlugin(options?: RecursivePartial<IManualParticlesOptions>): boolean {
        return !!options?.manualParticles?.length;
    }
}
