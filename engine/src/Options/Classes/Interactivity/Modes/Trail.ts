import type { IOptionLoader, ITrail } from "../../../Interfaces";
import type { IParticlesOptions } from "../../../Interfaces";
import type { RecursivePartial } from "../../../../Types";
import { deepExtend } from "../../../../Utils";

/**
 * @category Options
 */
export class Trail implements ITrail, IOptionLoader<ITrail> {
    delay;
    particles?: RecursivePartial<IParticlesOptions>;
    pauseOnStop;
    quantity;

    constructor() {
        this.delay = 1;
        this.pauseOnStop = false;
        this.quantity = 1;
    }

    load(data?: RecursivePartial<ITrail>): void {
        if (!data) {
            return;
        }

        if (data.delay !== undefined) {
            this.delay = data.delay;
        }

        if (data.quantity !== undefined) {
            this.quantity = data.quantity;
        }

        if (data.particles !== undefined) {
            this.particles = deepExtend({}, data.particles) as RecursivePartial<IParticlesOptions>;
        }

        if (data.pauseOnStop !== undefined) {
            this.pauseOnStop = data.pauseOnStop;
        }
    }
}
