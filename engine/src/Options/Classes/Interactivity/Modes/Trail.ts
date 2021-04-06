import type { ITrail } from "../../../Interfaces/Interactivity/Modes/ITrail";
import type { IParticles } from "../../../Interfaces/Particles/IParticles";
import type { RecursivePartial } from "../../../../Types";
import { deepExtend } from "../../../../Utils";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class Trail implements ITrail, IOptionLoader<ITrail> {
    delay;
    particles?: RecursivePartial<IParticles>;
    quantity;
    pauseOnStop;

    constructor() {
        this.delay = 1;
        this.quantity = 1;
        this.pauseOnStop = false;
    }

    load(data?: RecursivePartial<ITrail>): void {
        if (data === undefined) {
            return;
        }

        if (data.delay !== undefined) {
            this.delay = data.delay;
        }

        if (data.quantity !== undefined) {
            this.quantity = data.quantity;
        }

        if (data.particles !== undefined) {
            this.particles = deepExtend({}, data.particles) as RecursivePartial<IParticles>;
        }

        if (data.pauseOnStop !== undefined) {
            this.pauseOnStop = data.pauseOnStop;
        }
    }
}
