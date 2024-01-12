import type { Container, Engine, IPlugin, RecursivePartial } from "@tsparticles/engine";
import type { IPoissonOptions, PoissonOptions } from "./types.js";
import { Poisson } from "./Options/Classes/Poisson.js";
import type { PoissonInstance } from "./PoissonInstance.js";

/**
 */
export class PoissonDiscPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "poisson";

        this._engine = engine;
    }

    async getPlugin(container: Container): Promise<PoissonInstance> {
        const { PoissonInstance } = await import("./PoissonInstance.js");

        return new PoissonInstance(container, this._engine);
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
