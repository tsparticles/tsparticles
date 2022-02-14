import type { IOptionLoader, IParticlesRepulse } from "../../../Interfaces";
import type { RecursivePartial } from "../../../../Types";
import { ValueWithRandom } from "../../ValueWithRandom";

/**
 * @category Options
 */
export class ParticlesRepulse extends ValueWithRandom implements IParticlesRepulse, IOptionLoader<IParticlesRepulse> {
    enabled;
    distance;
    duration;
    factor;
    speed;

    constructor() {
        super();
        this.enabled = false;
        this.distance = 1;
        this.duration = 1;
        this.factor = 1;
        this.speed = 1;
    }

    load(data?: RecursivePartial<IParticlesRepulse>): void {
        super.load(data);

        if (!data) {
            return;
        }

        if (data.enabled !== undefined) {
            this.enabled = data.enabled;
        }

        if (data.distance !== undefined) {
            this.distance = data.distance;
        }

        if (data.duration !== undefined) {
            this.duration = data.duration;
        }

        if (data.factor !== undefined) {
            this.factor = data.factor;
        }

        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}
