import type { Container, Engine, IContainerPlugin, IPlugin, RecursivePartial } from "@tsparticles/engine";
import type { ITrailOptions, TrailOptions } from "./types.js";
import { Trail } from "./Options/Classes/Trail.js";

/**
 */
export class TrailPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "trail";

        this._engine = engine;
    }

    async getPlugin(container: Container): Promise<IContainerPlugin> {
        const { TrailInstance } = await import("./TrailInstance.js");

        return new TrailInstance(container, this._engine);
    }

    loadOptions(options: TrailOptions, source?: RecursivePartial<ITrailOptions>): void {
        if (!this.needsPlugin()) {
            return;
        }

        let trailOptions = options.trail;

        if (!trailOptions?.load) {
            options.trail = trailOptions = new Trail();
        }

        trailOptions.load(source?.trail);
    }

    needsPlugin(): boolean {
        return true;
    }
}
