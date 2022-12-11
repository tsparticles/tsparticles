import type { Container, Engine, IPlugin, RecursivePartial } from "tsparticles-engine";
import type { IMotionOptions, MotionOptions } from "./types";
import { Motion } from "./Options/Classes/Motion";
import { MotionInstance } from "./MotionInstance";

/**
 * @category Motion Plugin
 */
class MotionPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "motion";

        this._engine = engine;
    }

    getPlugin(container: Container): MotionInstance {
        return new MotionInstance(container, this._engine);
    }

    loadOptions(options: MotionOptions, source?: RecursivePartial<IMotionOptions>): void {
        if (!this.needsPlugin()) {
            return;
        }

        let motionOptions = options.motion as Motion;

        if (motionOptions?.load === undefined) {
            options.motion = motionOptions = new Motion();
        }

        motionOptions.load(source?.motion);
    }

    needsPlugin(): boolean {
        return true;
    }
}

export async function loadMotionPlugin(engine: Engine): Promise<void> {
    const plugin = new MotionPlugin(engine);

    await engine.addPlugin(plugin);
}
