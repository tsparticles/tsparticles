import type { Container, Engine, IPlugin, RecursivePartial } from "@tsparticles/engine";
import type { IMotionOptions, MotionOptions } from "./types.js";
import { Motion } from "./Options/Classes/Motion.js";
import { MotionInstance } from "./MotionInstance.js";

/**
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

        if (!motionOptions?.load) {
            options.motion = motionOptions = new Motion();
        }

        motionOptions.load(source?.motion);
    }

    needsPlugin(): boolean {
        return true;
    }
}

/**
 * @param engine - The engine instance
 * @param refresh -
 */
export async function loadMotionPlugin(engine: Engine, refresh = true): Promise<void> {
    await engine.addPlugin(new MotionPlugin(engine), refresh);
}
