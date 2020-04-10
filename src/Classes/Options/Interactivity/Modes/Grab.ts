import type {IGrab} from "../../../../Interfaces/Options/Interactivity/Modes/IGrab";
import type {IGrabLineLinked} from "../../../../Interfaces/Options/Interactivity/Modes/IGrabLineLinked";
import {GrabLineLinked} from "./GrabLineLinked";
import type {RecursivePartial} from "../../../../Types/RecursivePartial";

export class Grab implements IGrab {
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    public get line_linked(): IGrabLineLinked {
        return this.lineLinked;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    public set line_linked(value: IGrabLineLinked) {
        this.lineLinked = value;
    }

    public distance: number;
    public lineLinked: IGrabLineLinked;

    constructor() {
        this.distance = 100;
        this.lineLinked = new GrabLineLinked();
    }

    public load(data?: RecursivePartial<IGrab>): void {
        if (data !== undefined) {
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }

            const lineLinked = data.lineLinked ?? data.line_linked;

            if (lineLinked !== undefined) {
                this.lineLinked.load(lineLinked);
            }
        }
    }
}
