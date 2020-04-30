import type { IConnect } from "../../../Interfaces/Interactivity/Modes/IConnect";
import { ConnectLineLinked } from "./ConnectLineLinked";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class Connect implements IConnect {
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    public get line_linked(): ConnectLineLinked {
        return this.lineLinked;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    public set line_linked(value: ConnectLineLinked) {
        this.lineLinked = value;
    }

    public distance: number;
    public lineLinked: ConnectLineLinked;
    public radius: number;

    constructor() {
        this.distance = 80;
        this.lineLinked = new ConnectLineLinked();
        this.radius = 60;
    }

    public load(data?: RecursivePartial<IConnect>): void {
        if (data !== undefined) {
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }

            this.lineLinked.load(data.lineLinked ?? data.line_linked);

            if (data.radius !== undefined) {
                this.radius = data.radius;
            }
        }
    }
}
