import type { IRemove } from "../../../Interfaces/Interactivity/Modes/IRemove";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class Remove implements IRemove, IOptionLoader<IRemove> {
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

    public default;
    public groups: string[];
    public quantity;

    constructor() {
        this.default = true;
        this.groups = [];
        this.quantity = 2;
    }

    load(data?: RecursivePartial<IRemove>): void {
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

        const quantity = data.quantity ?? data.particles_nb;

        if (quantity !== undefined) {
            this.quantity = quantity;
        }
    }
}
