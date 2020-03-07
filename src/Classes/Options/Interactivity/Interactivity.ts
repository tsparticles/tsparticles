import {IInteractivity} from "../../../Interfaces/Options/Interactivity/IInteractivity";
import {InteractivityDetect} from "../../../Enums/InteractivityDetect";
import {Events} from "./Events/Events";
import {Modes} from "./Modes/Modes";

export class Interactivity implements IInteractivity {
    /**
     *
     * @deprecated this property is obsolete, please use the new detectsOn
     */
    public get detect_on(): InteractivityDetect {
        return this.detectsOn;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new detectsOn
     * @param value
     */
    public set detect_on(value: InteractivityDetect) {
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
}
