import type { IOptionLoader, IPush } from "../../../Interfaces";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export class Push implements IPush, IOptionLoader<IPush> {
    default;
    groups: string[];
    quantity;

    constructor() {
        this.default = true;
        this.groups = [];
        this.quantity = 4;
    }

    load(data?: RecursivePartial<IPush>): void {
        if (!data) {
            return;
        }

        if (data.default !== undefined) {
            this.default = data.default;
        }

        if (data.groups !== undefined) {
            this.groups = data.groups.map((t) => t);
        }

        if (!this.groups.length) {
            this.default = true;
        }

        if (data.quantity !== undefined) {
            this.quantity = data.quantity;
        }
    }
}
