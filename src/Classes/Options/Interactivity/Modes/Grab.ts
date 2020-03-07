import {IGrab} from "../../../../Interfaces/Options/Interactivity/Modes/IGrab";
import {IGrabLineLinked} from "../../../../Interfaces/Options/Interactivity/Modes/IGrabLineLinked";
import {GrabLineLinked} from "./GrabLineLinked";
import {Messages} from "../../../Utils/Messages";

export class Grab implements IGrab {
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    public get line_linked(): IGrabLineLinked {
        Messages.deprecationMessage("interactivity.modes.grab.line_linked", "interactivity.modes.grab.lineLinked");

        return this.lineLinked;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    public set line_linked(value: IGrabLineLinked) {
        Messages.deprecationMessage("interactivity.modes.grab.line_linked", "interactivity.modes.grab.lineLinked");

        this.lineLinked = value;
    }

    public distance: number;
    public lineLinked: IGrabLineLinked;

    constructor() {
        this.distance = 100;
        this.lineLinked = new GrabLineLinked();
    }
}
