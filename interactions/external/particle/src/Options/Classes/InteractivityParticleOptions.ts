import {
    type IOptionLoader,
    type IParticlesOptions,
    type RecursivePartial,
    deepExtend,
    isNull,
} from "@tsparticles/engine";
import type { IInteractivityParticleOptions } from "../Interfaces/IInteractivityParticleOptions.js";

/**
 */
export class InteractivityParticleOptions
    implements IInteractivityParticleOptions, IOptionLoader<IInteractivityParticleOptions>
{
    options?: RecursivePartial<IParticlesOptions>;
    pauseOnStop: boolean;
    replaceCursor: boolean;
    stopDelay: number;

    constructor() {
        this.replaceCursor = false;
        this.pauseOnStop = false;
        this.stopDelay = 0;
    }

    load(data?: RecursivePartial<IInteractivityParticleOptions>): void {
        if (isNull(data)) {
            return;
        }

        if (data.options !== undefined) {
            this.options = deepExtend({}, data.options) as RecursivePartial<IParticlesOptions>;
        }

        if (data.replaceCursor !== undefined) {
            this.replaceCursor = data.replaceCursor;
        }

        if (data.pauseOnStop !== undefined) {
            this.pauseOnStop = data.pauseOnStop;
        }

        if (data.stopDelay !== undefined) {
            this.stopDelay = data.stopDelay;
        }
    }
}
