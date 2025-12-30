import type { Container, Engine, IPlugin, RecursivePartial } from "@tsparticles/engine";
import type { ITrailOptions, TrailOptions } from "./types.js";
import { Trail } from "./Options/Classes/Trail.js";
import { TrailInstance } from "./TrailInstance.js";

/**
 */
export class TrailPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "trail";

        this._engine = engine;
    }

    getPlugin(container: Container): Promise<TrailInstance> {
        return Promise.resolve(new TrailInstance(container, this._engine));
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
