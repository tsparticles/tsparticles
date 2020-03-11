import {IGrab} from "../../../../Interfaces/Options/Interactivity/Modes/IGrab";
import {IGrabLineLinked} from "../../../../Interfaces/Options/Interactivity/Modes/IGrabLineLinked";
import {GrabLineLinked} from "./GrabLineLinked";
import {Messages} from "../../../Utils/Messages";
import {Utils} from "../../../Utils/Utils";

export class Grab implements IGrab {
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    public get line_linked(): IGrabLineLinked {
        Messages.deprecated("interactivity.modes.grab.line_linked", "interactivity.modes.grab.lineLinked");

        return this.lineLinked;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    public set line_linked(value: IGrabLineLinked) {
        Messages.deprecated("interactivity.modes.grab.line_linked", "interactivity.modes.grab.lineLinked");

        this.lineLinked = value;
    }

    public distance: number;
    public lineLinked: IGrabLineLinked;

    constructor() {
        this.distance = 100;
        this.lineLinked = new GrabLineLinked();
    }

    public load(data: IGrab): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.distance)) {
                this.distance = data.distance;
            }

            if (Utils.hasData(data.lineLinked)) {
                this.lineLinked.load(data.lineLinked);
            }

            if (Utils.hasData(data.line_linked)) {
                this.line_linked.load(data.line_linked);
            }
        }
    }
}
