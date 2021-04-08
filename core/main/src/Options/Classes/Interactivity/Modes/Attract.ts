import type { IAttract } from "../../../Interfaces/Interactivity/Modes/IAttract";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class Attract implements IAttract, IOptionLoader<IAttract> {
    distance;
    duration;
    speed;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.speed = 1;
    }

    load(data?: RecursivePartial<IAttract>): void {
        if (data === undefined) {
            return;
        }

        if (data.distance !== undefined) {
            this.distance = data.distance;
        }

        if (data.duration !== undefined) {
            this.duration = data.duration;
        }

        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}
