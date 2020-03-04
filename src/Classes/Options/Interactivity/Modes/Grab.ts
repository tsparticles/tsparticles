import {IGrab} from "../../../../Interfaces/Options/Interactivity/Modes/IGrab";
import {IGrabLineLinked} from "../../../../Interfaces/Options/Interactivity/Modes/IGrabLineLinked";
import {GrabLineLinked} from "./GrabLineLinked";

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
    public set line_linked(value) {
        this.lineLinked = value;
    }

    public distance: number;
    public lineLinked: GrabLineLinked;

    constructor() {
        this.distance = 100;
        this.lineLinked = new GrabLineLinked();
    }
}
