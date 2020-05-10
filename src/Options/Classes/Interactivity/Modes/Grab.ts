import type { IGrab } from "../../../Interfaces/Interactivity/Modes/IGrab";
import { GrabLineLinked } from "./GrabLineLinked";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class Grab implements IGrab {
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    public get line_linked(): GrabLineLinked {
        return this.lineLinked;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    public set line_linked(value: GrabLineLinked) {
        this.lineLinked = value;
    }

    public distance: number;
    public lineLinked: GrabLineLinked;

    constructor() {
        this.distance = 100;
        this.lineLinked = new GrabLineLinked();
    }

    public load(data?: RecursivePartial<IGrab>): void {
        if (data !== undefined) {
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }

            this.lineLinked.load(data.lineLinked ?? data.line_linked);
        }
    }
}
