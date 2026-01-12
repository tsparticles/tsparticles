import { type Container, type IContainerPlugin, type IPlugin, type RecursivePartial } from "@tsparticles/engine";
import type { IPoissonOptions, PoissonOptions } from "./types.js";
import { Poisson } from "./Options/Classes/Poisson.js";

/**
 */
export class PoissonDiscPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "poisson";
    }

    async getPlugin(container: Container): Promise<IContainerPlugin> {
        const { PoissonInstance } = await import("./PoissonInstance.js");

        return new PoissonInstance(container);
    }

    loadOptions(options: PoissonOptions, source?: RecursivePartial<IPoissonOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        let poissonOptions = options.poisson;

        if (poissonOptions?.load === undefined) {
            options.poisson = poissonOptions = new Poisson();
        }

        poissonOptions.load(source?.poisson);
    }

    needsPlugin(options?: RecursivePartial<IPoissonOptions>): boolean {
        return options?.poisson?.enable ?? false;
    }
}
