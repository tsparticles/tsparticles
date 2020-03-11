import {IInteractivity} from "../../../Interfaces/Options/Interactivity/IInteractivity";
import {InteractivityDetect} from "../../../Enums/InteractivityDetect";
import {Events} from "./Events/Events";
import {Modes} from "./Modes/Modes";
import {Messages} from "../../Utils/Messages";
import {Utils} from "../../Utils/Utils";

export class Interactivity implements IInteractivity {
    /**
     *
     * @deprecated this property is obsolete, please use the new detectsOn
     */
    public get detect_on(): InteractivityDetect {
        Messages.deprecated("interactivity.detect_on", "interactivity.detectsOn");

        return this.detectsOn;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new detectsOn
     * @param value
     */
    public set detect_on(value: InteractivityDetect) {
        Messages.deprecated("interactivity.detect_on", "interactivity.detectsOn");

        this.detectsOn = value;
    }

    public detectsOn: InteractivityDetect;
    public events: Events;
    public modes: Modes;

    constructor() {
        this.detectsOn = InteractivityDetect.canvas;
        this.events = new Events();
        this.modes = new Modes();
    }

    public load(data: IInteractivity): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.detectsOn)) {
                this.detectsOn = data.detectsOn;
            }

            if (Utils.hasData(data.detect_on)) {
                this.detect_on = data.detect_on;
            }

            this.events.load(data.events);
            this.modes.load(data.modes);
        }
    }
}
