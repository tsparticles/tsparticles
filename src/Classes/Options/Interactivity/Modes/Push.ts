import type {IPush} from "../../../../Interfaces/Options/Interactivity/Modes/IPush";
import type {RecursivePartial} from "../../../../Types/RecursivePartial";

export class Push implements IPush {
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
        this.quantity = 4;
    }

    public load(data?: RecursivePartial<IPush>): void {
        if (data !== undefined) {
            const quantity = data.quantity ?? data.particles_nb;

            if (quantity !== undefined) {
                this.quantity = quantity;
            }
        }
    }
}
