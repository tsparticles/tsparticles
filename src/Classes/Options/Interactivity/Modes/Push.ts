import {IPush} from "../../../../Interfaces/Options/Interactivity/Modes/IPush";
import {Messages} from "../../../Utils/Messages";

export class Push implements IPush {
    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     */
    public get particles_nb(): number {
        Messages.deprecated("interactivity.modes.push.particles_nb", "interactivity.modes.push.quantity");

        return this.quantity;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     * @param value
     */
    public set particles_nb(value: number) {
        Messages.deprecated("interactivity.modes.push.particles_nb", "interactivity.modes.push.quantity");

        this.quantity = value;
    }

    public quantity: number;

    constructor() {
        this.quantity = 4;
    }

    public load(data: IPush): void {
        this.quantity = data.quantity;
    }
}
