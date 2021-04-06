import type { IAttract } from "../../../Interfaces/Interactivity/Modes/IAttract";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class Attract implements IAttract, IOptionLoader<IAttract> {
    public distance;
    public duration;
    public factor;
    public speed;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.factor = 1;
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

        if (data.factor !== undefined) {
            this.factor = data.factor;
        }

        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}
