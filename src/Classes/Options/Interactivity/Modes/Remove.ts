import type { IRemove } from "../../../../Interfaces/Options/Interactivity/Modes/IRemove";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class Remove implements IRemove {
    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     */
    public get particles_nb(): number {
        return this.quantity;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     * @param value
     */
    public set particles_nb(value: number) {
        this.quantity = value;
    }

    public quantity: number;

    constructor() {
        this.quantity = 2;
    }

    public load(data?: RecursivePartial<IRemove>): void {
        if (data !== undefined) {
            const quantity = data.quantity ?? data.particles_nb;

            if (quantity !== undefined) {
                this.quantity = quantity;
            }
        }
    }
}
