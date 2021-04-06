import type { IEmitterLife } from "../Interfaces/IEmitterLife";
import type { RecursivePartial } from "tsparticles-engine/Types";
import type { IOptionLoader } from "tsparticles-engine/Options/Interfaces/IOptionLoader";

/**
 * @category Emitters Plugin
 */
export class EmitterLife implements IEmitterLife, IOptionLoader<IEmitterLife> {
    count?: number;
    delay?: number;
    duration?: number;

    load(data?: RecursivePartial<IEmitterLife>): void {
        if (data === undefined) {
            return;
        }

        if (data.count !== undefined) {
            this.count = data.count;
        }

        if (data.delay !== undefined) {
            this.delay = data.delay;
        }

        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
    }
}
