import type { IPush } from "../../../Interfaces/Interactivity/Modes/IPush";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

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
        if (data === undefined) {
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
