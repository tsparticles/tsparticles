import type { IInteractivity } from "../../../Interfaces/Options/Interactivity/IInteractivity";
import { InteractivityDetect } from "../../../Enums/InteractivityDetect";
import { Events } from "./Events/Events";
import { Modes } from "./Modes/Modes";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { HoverMode } from "../../../Enums/Modes/HoverMode";

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

    public load(data?: RecursivePartial<IInteractivity>): void {
        if (data !== undefined) {
            const detectsOn = data.detectsOn ?? data.detect_on;

            if (detectsOn !== undefined) {
                this.detectsOn = detectsOn;
            }

            this.events.load(data.events);
            this.modes.load(data.modes);

            if (data.modes?.slow?.active === true) {
                if (this.events.onHover.mode instanceof Array) {
                    if (this.events.onHover.mode.indexOf(HoverMode.slow) < 0) {
                        this.events.onHover.mode.push(HoverMode.slow);
                    }
                } else if (this.events.onHover.mode !== HoverMode.slow) {
                    this.events.onHover.mode = [ this.events.onHover.mode, HoverMode.slow ];
                }
            }
        }
    }
}
