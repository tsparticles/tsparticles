import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { IPush } from "../Interfaces/IPush";

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

    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     */
    get particles_nb(): number {
        return this.quantity;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     * @param value
     */
    set particles_nb(value: number) {
        this.quantity = value;
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

        const quantity = data.quantity ?? data.particles_nb;

        if (quantity !== undefined) {
            this.quantity = quantity;
        }
    }
}
