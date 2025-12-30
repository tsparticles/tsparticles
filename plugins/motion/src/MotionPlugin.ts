import type { Container, IPlugin, RecursivePartial } from "@tsparticles/engine";
import type { IMotionOptions, MotionOptions } from "./types.js";
import { Motion } from "./Options/Classes/Motion.js";
import { MotionInstance } from "./MotionInstance.js";

/**
 */
export class MotionPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "motion";
    }

    getPlugin(container: Container): Promise<MotionInstance> {
        return Promise.resolve(new MotionInstance(container));
    }

    loadOptions(options: MotionOptions, source?: RecursivePartial<IMotionOptions>): void {
        if (!this.needsPlugin()) {
            return;
        }

        let motionOptions = options.motion;

        if (!motionOptions?.load) {
            options.motion = motionOptions = new Motion();
        }

        motionOptions.load(source?.motion);
    }

    needsPlugin(): boolean {
        return true;
    }
}
