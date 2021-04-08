import type { IRepulseBase } from "../../../Interfaces/Interactivity/Modes/IRepulseBase";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export abstract class RepulseBase implements IRepulseBase {
    distance;
    duration;
    speed;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.speed = 1;
    }

    load(data?: RecursivePartial<IRepulseBase>): void {
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
