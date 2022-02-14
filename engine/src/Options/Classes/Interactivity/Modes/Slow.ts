import type { IOptionLoader, ISlow } from "../../../Interfaces";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export class Slow implements ISlow, IOptionLoader<ISlow> {
    factor;
    radius;

    constructor() {
        this.factor = 3;
        this.radius = 200;
    }

    load(data?: RecursivePartial<ISlow>): void {
        if (!data) {
            return;
        }

        if (data.factor !== undefined) {
            this.factor = data.factor;
        }

        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
