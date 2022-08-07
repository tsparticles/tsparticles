import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { IRemove } from "../Interfaces/IRemove";

/**
 * @category Options
 */
export class Remove implements IRemove, IOptionLoader<IRemove> {
    quantity;

    constructor() {
        this.quantity = 2;
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

    load(data?: RecursivePartial<IRemove>): void {
        if (!data) {
            return;
        }

        const quantity = data.quantity ?? data.particles_nb;

        if (quantity !== undefined) {
            this.quantity = quantity;
        }
    }
}
